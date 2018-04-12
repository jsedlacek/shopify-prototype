import { bisect, max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';
import Chart from './chart';

interface Size {
  width: number;
  height: number;
}

interface ChartItem {
  key: string;
  label: string;
  value: number;
  color: string;
}

interface Props {
  height?: number;
  items: ChartItem[];
  formatValue?: (value: number) => string;
  renderValue?: (value: number) => React.ReactNode;
  renderLabel?: (label: string) => React.ReactNode;
}

interface State {}

class BarChart extends React.Component<Props, State> {
  render() {
    const { height, items } = this.props;

    const xScale = scaleBand()
      .padding(0.3)
      .paddingOuter(0)
      .domain(items.map((bar, index) => bar.label));

    const yScale = scaleLinear().domain([0, max(items.map(bar => bar.value))!]);

    return (
      <Chart
        height={height}
        xScale={xScale}
        yScale={yScale}
        getItemByPosition={x => {
          const breakpoints = items.map((bar, index) => xScale(bar.key)!);
          const index = Math.max(bisect(breakpoints, x) - 1, 0);
          return this.props.items[index];
        }}
        renderValue={this.props.renderValue}
        renderLabel={this.props.renderLabel}
        renderChart={({
          innerSize,
          selectedItem
        }: {
          innerSize: Size;
          selectedItem?: ChartItem;
        }) => {
          const bars = items.map(bar => (
            <rect
              key={bar.value}
              y={yScale(bar.value)}
              height={innerSize.height - yScale(bar.value)}
              x={xScale(bar.key)}
              width={xScale.bandwidth()}
              opacity={selectedItem && selectedItem !== bar ? 0.5 : 1}
              fill={bar.color}
            />
          ));

          return <g className="bars">{bars}</g>;
        }}
      />
    );
  }
}

export default BarChart;
