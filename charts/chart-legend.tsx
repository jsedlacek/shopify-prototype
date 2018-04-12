import React from 'react';
import './chart-legend.scss';

interface Props {
  visible: boolean;
  label: React.ReactNode;
  value: React.ReactNode;
  color?: string;
}

export default function ChartLegend(props: Props) {
  return (
    <div
      className={`ChartLegend ${props.visible ? '' : 'ChartLegend--invisible'}`}
    >
      <span
        className="ChartLegend-point"
        style={{ backgroundColor: props.color }}
      />
      <div className="ChartLegend-label">{props.label}</div>

      <div className="ChartLegend-value">{props.value}</div>
    </div>
  );
}
