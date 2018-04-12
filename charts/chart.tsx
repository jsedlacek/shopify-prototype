import React from 'react';
import './chart.scss';
import ChartLegend from './chart-legend';

interface Size {
  width: number;
  height: number;
}

interface BaseChartItem {
  label: string;
  value: number;
  color?: string;
}

interface Props<ChartItem extends BaseChartItem> {
  size: Size;
  xScale: any;
  yScale: any;
  renderValue?: (value: number) => React.ReactNode;
  renderLabel?: (label: string) => React.ReactNode;
  renderChart: (
    options: { innerSize: Size; selectedItem?: ChartItem }
  ) => React.ReactNode;
  getItemByPosition: (x: number) => ChartItem | undefined;
}

interface State<ChartItem> {
  selectedItem?: ChartItem;
}

class Chart<ChartItem extends BaseChartItem> extends React.Component<
  Props<ChartItem>,
  State<ChartItem>
> {
  state: State<ChartItem> = {
    selectedItem: undefined
  };

  selectItem(item: ChartItem | undefined) {
    this.setState({ selectedItem: item });
  }

  render() {
    const { size } = this.props;
    const { selectedItem } = this.state;

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

    this.props.xScale.range([0, innerSize.width]);
    this.props.yScale.range([innerSize.height, 0]);

    return (
      <>
        <TimeLegend
          item={selectedItem}
          renderValue={this.props.renderValue}
          renderLabel={this.props.renderLabel}
        />
        <svg
          width={size.width}
          height={size.height}
          className="chart"
          onMouseMove={e => {
            const bounds = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - bounds.left - padding.left;
            const item = this.props.getItemByPosition(x);
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
            {this.props.renderChart({ innerSize, selectedItem })}
          </g>
        </svg>
      </>
    );
  }
}

export default Chart;

function TimeLegend<ChartItem extends BaseChartItem>(props: {
  item?: ChartItem;
  renderValue?: (item: number) => React.ReactNode;
  renderLabel?: (label: string) => React.ReactNode;
}) {
  if (!props.item) {
    return <ChartLegend visible={false} label="&nbsp;" value="&nbsp;" />;
  }
  const renderValue = props.renderValue || (value => <b>{value}</b>);
  const renderLabel = props.renderLabel || (label => label);
  return (
    <ChartLegend
      visible={true}
      label={renderLabel(props.item.label)}
      value={renderValue(props.item.value)}
      color={props.item.color}
    />
  );
}
