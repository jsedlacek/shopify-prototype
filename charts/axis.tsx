import { Axis } from 'd3-axis';
import { select } from 'd3-selection';
import React from 'react';

interface Props {
  axis: Axis<any>;
}

export default class AxisComponent extends React.Component<Props> {
  element: SVGGElement | null = null;

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    if (this.element) {
      select(this.element).call(this.props.axis);
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
