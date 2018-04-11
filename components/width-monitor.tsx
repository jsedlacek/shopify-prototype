import React from 'react';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';

interface Props {
  render: (width: number) => React.ReactNode;
}

interface State {
  width?: number;
}

export default class WidthMonitor extends React.Component<Props, State> {
  state: State = {
    width: undefined
  };

  element: HTMLDivElement | null = null;

  sensor: ResizeSensor | undefined;

  componentDidMount() {
    if (this.element) {
      this.sensor = new ResizeSensor(this.element, () => this.updateWidth());
    }
    this.updateWidth();
  }

  componentWillUnmount() {
    if (this.sensor) {
      this.sensor.detach(() => {});
    }
  }

  updateWidth() {
    if (this.element) {
      this.setState({
        width: this.element.getBoundingClientRect().width
      });
    }
  }

  renderChildren() {
    if (this.state.width !== undefined) {
      return this.props.render(this.state.width);
    }
  }

  render() {
    return (
      <div ref={element => (this.element = element)}>
        {this.renderChildren()}
      </div>
    );
  }
}
