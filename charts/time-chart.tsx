import React, { MouseEvent } from 'react';
import './chart';
import Axis from './axis';
import * as d3 from 'd3';
import { isNumber, minBy } from 'lodash';
import moment from 'moment';

interface Size {
  width: number;
  height: number;
}

interface ChartItem {
  date: Date;
  label: string;
  value: number;
}

interface Props {
  size: Size;
  items: ChartItem[];
  area: boolean;
  domain?: [number, number];
}

interface State {
  selectedItem?: ChartItem;
}

function formatScore(score: number) {
  if (!isNumber(score)) {
    return '';
  }
  score = Math.round(score);
  if (score > 0) {
    return '+' + score;
  }
  return '' + score;
}

class TimeChart extends React.Component<Props, State> {
  state: State = {
    selectedItem: undefined
  };

  selectItem(item: ChartItem | undefined) {
    this.setState({ selectedItem: item });
  }

  render() {
    const { size, items } = this.props;

    const padding = {
      top: 10,
      right: 30,
      bottom: 23,
      left: 40
    };

    const innerSize = {
      width: size.width - padding.left - padding.right,
      height: size.height - padding.top - padding.bottom
    };

    const dates = items.map(item => item.date);
    const [minDate, maxDate] = d3.extent(dates);

    if (!minDate || !maxDate) {
      throw new Error('Missing values');
    }

    const values = items.map(item => item.value);

    const [minValue, maxValue] =
      this.props.domain || d3.extent(items.map(item => item.value));

    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, innerSize.width]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickPadding(10)
      .ticks(Math.floor(innerSize.width / 80));

    const yScale = d3
      .scaleLinear()
      .domain([minValue || 0, maxValue || 0])
      .range([innerSize.height, 0]);

    const yAxis = d3
      .axisLeft<number>(yScale)
      .tickSize(innerSize.width)
      .tickPadding(6)
      .ticks(2);

    const line = d3
      .line<ChartItem>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    const area = d3
      .area<ChartItem>()
      .x(d => xScale(d.date))
      .y0(innerSize.height)
      .y1(d => yScale(d.value));

    let circle;

    if (this.state.selectedItem) {
      const x = xScale(this.state.selectedItem.date);
      const y = yScale(this.state.selectedItem.value);
      circle = <circle className="selected" r="4" cx={x} cy={y} />;
    }

    return (
      <svg
        width={size.width}
        height={size.height}
        className="chart"
        onMouseMove={e => {
          const bounds = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - bounds.left - padding.left;
          const mouseDate = xScale.invert(x);
          const dates = this.props.items.map(item => item.date);
          const closestDate = minBy(dates, date =>
            Math.abs(moment(mouseDate).diff(date))
          );
          const item = this.props.items.find(item =>
            moment(item.date).isSame(closestDate)
          );
          this.selectItem(item);
        }}
        onMouseLeave={() => {
          this.selectItem(undefined);
        }}
      >
        <g
          transform={`translate(${padding.left}, ${padding.top})`}
          className="inner"
        >
          <g transform={`translate(0, ${innerSize.height})`}>
            <Axis axis={xAxis} />
          </g>

          <g transform={`translate(${innerSize.width}, 0)`}>
            <Axis axis={yAxis} />
          </g>

          <path className="line" d={line(items) || undefined} />

          {this.props.area ? (
            <path className="area" d={area(items) || undefined} />
          ) : null}

          {circle}
        </g>
      </svg>
    );
  }
}

export default TimeChart;