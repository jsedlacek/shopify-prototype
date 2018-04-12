import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { area, line } from 'd3-shape';
import minBy from 'lodash/minBy';
import moment from 'moment';
import React from 'react';
import Chart from './chart';

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
  height?: number;
  items: ChartItem[];
  area: boolean;
  domain?: [number, number];
  formatValue?: (value: number) => string;
  renderValue?: (value: number) => React.ReactNode;
}

interface State {}

class TimeChart extends React.Component<Props, State> {
  render() {
    const { items } = this.props;

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
        formatValue={this.props.formatValue}
        renderValue={this.props.renderValue}
        renderChart={({
          innerSize,
          selectedItem
        }: {
          innerSize: Size;
          selectedItem?: ChartItem;
        }) => {
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
