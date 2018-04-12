import {
  area,
  axisBottom,
  axisLeft,
  extent,
  line,
  scaleLinear,
  scaleTime
} from 'd3';
import { minBy } from 'lodash';
import moment from 'moment';
import React from 'react';
import Axis from './axis';
import './chart';
import ChartLegend from './chart-legend';

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
  formatValue?: (value: number) => string;
  renderValue?: (value: number) => React.ReactNode;
}

interface State {
  selectedItem?: ChartItem;
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
    const [minDate, maxDate] = extent(dates);

    if (!minDate || !maxDate) {
      throw new Error('Missing values');
    }

    const [minValue, maxValue] =
      this.props.domain || extent(items.map(item => item.value));

    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, innerSize.width]);

    const xAxis = axisBottom(xScale)
      .tickSize(0)
      .tickPadding(10)
      .ticks(Math.floor(innerSize.width / 80));

    const yScale = scaleLinear()
      .domain([minValue || 0, maxValue || 0])
      .range([innerSize.height, 0]);

    const yAxis = axisLeft<number>(yScale)
      .tickSize(innerSize.width)
      .tickPadding(6)
      .ticks(2);

    if (this.props.formatValue) {
      yAxis.tickFormat(this.props.formatValue);
    }

    const lineFn = line<ChartItem>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    const areaFn = area<ChartItem>()
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
      <>
        <TimeLegend
          item={this.state.selectedItem}
          renderValue={this.props.renderValue}
        />
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

            <path className="line" d={lineFn(items) || undefined} />

            {this.props.area ? (
              <path className="area" d={areaFn(items) || undefined} />
            ) : null}

            {circle}
          </g>
        </svg>
      </>
    );
  }
}

export default TimeChart;

function TimeLegend(props: {
  item?: ChartItem;
  renderValue?: (item: number) => React.ReactNode;
}) {
  if (!props.item) {
    return <ChartLegend visible={false} label="&nbsp;" value="&nbsp;" />;
  }
  const renderValue = props.renderValue || (value => <b>{value}</b>);
  return (
    <ChartLegend
      visible={true}
      label={`${props.item.label}`}
      value={renderValue(props.item.value)}
    />
  );
}
