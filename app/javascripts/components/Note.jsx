var React = require('react');

module.exports = React.createClass({
  render: function() {
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      connectDropTarget(
        <li
          style={{
            opacity: isDragging? 0 : 1
          }}
          className="note" >
          {this.props.children}
        </li>)
    );
  }
});
