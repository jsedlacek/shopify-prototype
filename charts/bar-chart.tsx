import { axisBottom, axisLeft, bisect, max, scaleBand, scaleLinear } from 'd3';
import React from 'react';
import Axis from './axis';
import './chart.scss';

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
}

interface State {
  selectedBar?: ChartItem;
}

class BarChart extends React.Component<Props, State> {
  state: State = {
    selectedBar: undefined
  };

  selectBar(bar: ChartItem | undefined) {
    this.setState({ selectedBar: bar });
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

    const xScale = scaleBand()
      .padding(0.3)
      .paddingOuter(0)
      .domain(items.map((bar, index) => bar.label))
      .range([0, innerSize.width]);

    const breakpoints = items.map((bar, index) => xScale(bar.key)!);

    const xAxis = axisBottom(xScale)
      .tickSize(0)
      .tickPadding(10);

    const yScale = scaleLinear()
      .domain([0, max(items.map(bar => bar.value))!])
      .range([innerSize.height, 0]);

    const yAxis = axisLeft(yScale)
      .ticks(3)
      .tickSize(innerSize.width)
      .tickPadding(6);

    const bars = items.map(bar => (
      <rect
        key={bar.value}
        y={yScale(bar.value)}
        height={innerSize.height - yScale(bar.value)}
        x={xScale(bar.key)}
        width={xScale.bandwidth()}
        opacity={
          this.state.selectedBar && this.state.selectedBar !== bar ? 0.5 : 1
        }
        fill={bar.color}
      />
    ));

    return (
      <svg
        width={size.width}
        height={size.height}
        className="chart"
        onMouseMove={e => {
          const bounds = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - bounds.left - padding.left;
          const index = Math.max(bisect(breakpoints, x) - 1, 0);
          this.selectBar(this.props.items[index]);
        }}
        onMouseLeave={() => {
          this.selectBar(undefined);
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

          <g className="bars">{bars}</g>
        </g>
      </svg>
    );
  }
}

export default BarChart;
