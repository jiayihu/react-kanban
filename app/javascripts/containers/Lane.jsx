var Lane = require('../components/Lane.jsx');
var lanesActions = require('../actions/lanes');
var notesActions = require('../actions/notes');
var connect = require('react-redux').connect;
var DropTarget = require('react-dnd').DropTarget;
var ItemTypes = require('../constants/itemTypes');

var laneTarget = {
  hover: function(targetProps, monitor) {
    var targetId = targetProps.lane.id;
    var sourceProps = monitor.getItem();
    var sourceId = sourceProps.id;

    if(!targetProps.lane.notes.length) {
      console.log(targetId, sourceId);
      targetProps.attachToLane(targetId, sourceId);
    }
  }
};

var collectDropTarget = function(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

var mapStateToProps = function(state) {
  return {
    allNotes: state.notes
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    onCreateNote: function(laneId) {
      var newNote = notesActions.createNote('New note');
      dispatch(newNote);
      dispatch( lanesActions.attachToLane(laneId, newNote.payload.id) );
    },

    //Used both to detach a note from a lane and delete all the notes when a
    //lane is removed
    onDeleteNote: function(laneId, noteId) {
      dispatch( notesActions.deleteNote(noteId) );

      if(laneId) {
        dispatch( lanesActions.detachFromLane(laneId, noteId) );
      }
    },

    onEditNote: function(noteId, value) {
      var updatedNote = {
        id: noteId
      };

      if(value) {
        updatedNote.text = value;
        updatedNote.editing = false;
      } else {
        updatedNote.editing = true;
      }

      dispatch( notesActions.updateNote(updatedNote) );
    },

    onMoveNote: function(sourceId, targetId) {
      dispatch( lanesActions.move(sourceId, targetId) );
    },

    attachToLane: function(laneId, noteId) {
      dispatch( lanesActions.attachToLane(laneId, noteId) );
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(
  DropTarget(ItemTypes.NOTE, laneTarget, collectDropTarget)(Lane)
);
