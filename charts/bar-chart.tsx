import { axisBottom, axisLeft, bisect, max, scaleBand, scaleLinear } from 'd3';
import React from 'react';
import Axis from './axis';
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
  size: Size;
  items: ChartItem[];
  formatValue?: (value: number) => string;
  renderValue?: (value: number) => React.ReactNode;
  renderLabel?: (label: string) => React.ReactNode;
}

interface State {}

class BarChart extends React.Component<Props, State> {
  render() {
    const { size, items } = this.props;

    const xScale = scaleBand()
      .padding(0.3)
      .paddingOuter(0)
      .domain(items.map((bar, index) => bar.label));

    const yScale = scaleLinear().domain([0, max(items.map(bar => bar.value))!]);

    return (
      <Chart
        size={size}
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
          const xAxis = axisBottom(xScale)
            .tickSize(0)
            .tickPadding(10)
            .ticks(Math.floor(innerSize.width / 80));

          const yAxis = axisLeft<number>(yScale)
            .tickSize(innerSize.width)
            .tickPadding(6)
            .ticks(2);

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

          return (
            <>
              <g transform={`translate(0, ${innerSize.height})`}>
                <Axis axis={xAxis} />
              </g>

              <g transform={`translate(${innerSize.width}, 0)`}>
                <Axis axis={yAxis} />
              </g>

              <g className="bars">{bars}</g>
            </>
          );
        }}
      />
    );
  }
}

export default BarChart;
