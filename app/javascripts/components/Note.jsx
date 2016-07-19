import React, { PropTypes } from 'react';

export default class Note extends React.Component {
  render() {
    const connectDragSource = this.props.connectDragSource;
    const connectDropTarget = this.props.connectDropTarget;
    const isDragging = this.props.isDragging;

    return connectDragSource(
      connectDropTarget(
        <li style={{ opacity: isDragging ? 0 : 1 }} className="note" >
          {this.props.children}
        </li>
      )
    );
  }
}

Note.propTypes = {
  children: PropTypes.node,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};
