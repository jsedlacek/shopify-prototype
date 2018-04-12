import {
  area,
  axisBottom,
  axisLeft,
  extent,
  line,
  scaleLinear,
  scaleTime,
  max
} from 'd3';
import { minBy } from 'lodash';
import moment from 'moment';
import React from 'react';
import Chart from './chart';
import Axis from './axis';

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

interface State {}

class TimeChart extends React.Component<Props, State> {
  render() {
    const { size, items } = this.props;

    const dates = items.map(item => item.date);
    const [minDate, maxDate] = extent(dates);

    if (!minDate || !maxDate) {
      throw new Error('Missing values');
    }

    const [minValue, maxValue] = this.props.domain || [
      0,
      max(items.map(item => item.value))
    ];

    if (minValue === undefined || maxValue === undefined) {
      throw new Error('Missing values');
    }

    const xScale = scaleTime().domain([minDate, maxDate]);
    const yScale = scaleLinear().domain([minValue, maxValue]);

    return (
      <Chart
        size={size}
        xScale={xScale}
        yScale={yScale}
        getItemByPosition={x => {
          const mouseDate = xScale.invert(x);
          const dates = this.props.items.map(item => item.date);
          const closestDate = minBy(dates, date =>
            Math.abs(moment(mouseDate).diff(date))
          );
          const item = this.props.items.find(item =>
            moment(item.date).isSame(closestDate)
          );
          return item;
        }}
        renderValue={this.props.renderValue}
        renderChart={({
          innerSize,
          selectedItem
        }: {
          innerSize: Size;
          selectedItem?: ChartItem;
        }) => {
          const xAxis = axisBottom(xScale)
            .tickSize(0)
            .tickPadding(10)
            .ticks(Math.floor(innerSize.width / 80));

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

          if (selectedItem) {
            const x = xScale(selectedItem.date);
            const y = yScale(selectedItem.value);
            circle = <circle className="selected" r="4" cx={x} cy={y} />;
          }

          return (
            <>
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
            </>
          );
        }}
      />
    );
  }
}

export default TimeChart;
