// @flow

import React from 'react';

type Props = {
  children?: React$Node<*>,
  connectDragSource: Function,
  connectDropTarget: Function,
  isDragging: boolean,
};

export default class Note extends React.Component<*, Props, *> {
  render() {
    const connectDragSource = this.props.connectDragSource;
    const connectDropTarget = this.props.connectDropTarget;
    const isDragging = this.props.isDragging;

    return connectDragSource(
      connectDropTarget(
        <li style={{ opacity: isDragging ? 0 : 1 }} className="note">
          {this.props.children}
        </li>
      )
    );
  }
}
