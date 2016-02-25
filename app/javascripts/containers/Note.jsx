var Note = require('../components/Note.jsx');
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;
var ItemTypes = require('../constants/itemTypes');

var noteSource = {
  beginDrag: function(props) {
    var item = {
      id: props.id
    };

    return item;
  },
  isDragging: function(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

var noteTarget = {
  hover: function(targetProps, monitor) {
    var targetId = targetProps.id;
    var sourceProps = monitor.getItem();
    var sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMoveNote(sourceId, targetId);
    }
  }
};

var collectDragSource = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var collectDropTarget = function(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

module.exports = DragSource(ItemTypes.NOTE, noteSource, collectDragSource)(
  DropTarget(ItemTypes.NOTE, noteTarget, collectDropTarget)(Note)
);
