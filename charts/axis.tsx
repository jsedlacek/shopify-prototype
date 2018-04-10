import React from 'react';
import * as d3Axis from 'd3-axis';
import * as d3Scale from 'd3-scale';
import { select as d3Select } from 'd3-selection';

type Orientation = 'top' | 'left' | 'bottom' | 'right';

interface Props {
  axis: d3Axis.Axis<any>;
}

export default class Axis extends React.Component<Props> {
  element: SVGGElement | null = null;

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    if (this.element) {
      d3Select(this.element).call(this.props.axis);
    }
  }

  render() {
    return (
      <g
        className={`axis`}
        ref={element => {
          this.element = element;
        }}
      />
    );
  }
}
