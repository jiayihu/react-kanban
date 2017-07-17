// @flow

import Note from '../components/Note.jsx';
import { DragSource, DropTarget } from 'react-dnd';
import * as itemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    const item = {
      id: props.id,
    };

    return item;
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMoveNote(sourceId, targetId);
    }
  },
};

const collectDragSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const collectDropTarget = connect => ({
  connectDropTarget: connect.dropTarget(),
});

export default DragSource(itemTypes.NOTE, noteSource, collectDragSource)(
  DropTarget(itemTypes.NOTE, noteTarget, collectDropTarget)(Note)
);
