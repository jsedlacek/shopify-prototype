import React from 'react';
import './chart-legend.scss';
import { BaseChartItem } from './chart';

export default function ChartLegend<ChartItem extends BaseChartItem>(props: {
  item?: ChartItem;
  renderValue?: (item: number) => React.ReactNode;
  renderLabel?: (label: string) => React.ReactNode;
}) {
  const renderValue = props.renderValue || (value => <b>{value}</b>);
  const renderLabel = props.renderLabel || (label => label);

  let label: React.ReactNode = '&nbsp;';
  let value: React.ReactNode = '&nbsp;';
  let color: string | undefined = undefined;

  if (props.item) {
    label = renderLabel(props.item.label);
    value = renderValue(props.item.value);
    color = props.item.color;
  }
  return (
    <div
      className={`ChartLegend ${props.item ? '' : 'ChartLegend--invisible'}`}
    >
      <span className="ChartLegend-point" style={{ backgroundColor: color }} />
      <div className="ChartLegend-label">{label}</div>

      <div className="ChartLegend-value">{value}</div>
    </div>
  );
}
