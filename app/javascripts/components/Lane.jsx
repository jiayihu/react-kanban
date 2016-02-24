var React = require('react');
var Notes = require('./Notes.jsx'); //eslint-disable-line no-unused-vars
var Editable = require('./Editable.jsx'); //eslint-disable-line no-unused-vars
var lanesActions = require('../actions/lanes');
var notesActions = require('../actions/notes');
var connect = require('react-redux').connect;

var Lane = React.createClass({
  render: function() {
    var lane = this.props.lane;
    var allNotes = this.props.allNotes;
    var laneNotes = lane.notes.map(function(id) {
      return allNotes.find(function(note) {
        return note.id === id;
      });
    });

    //Remove 'undefined' notes, which are included if for some reason a note is
    //not found by its id. For example when the note is deleted by not detached
    //from the lane
    laneNotes = laneNotes.filter(function(note) {
      return note;
    });

    return (
      <div className="lane">
        <h2 className="lane__name">
          <Editable
            editing={lane.editing}
            value={lane.name}
            onEdit={this.props.onEditLane.bind(null, lane.id)}
            onValueClick={this.props.onEditLane.bind(null, lane.id)}
          />
        <button
          className="lane__delete"
          onClick={this.props.onDeleteLane.bind(null, lane.id)}
        >-</button>
        </h2>
        <Notes
          notes={laneNotes}
          onDeleteNote={this.props.onDeleteNote.bind(null, lane.id)}
          onEditNote={this.props.onEditNote}
          onValueClick={this.props.onEditNote}
        />
      <button
        className="add-note"
        onClick={this.props.onCreateNote.bind(null, lane.id)} >
        + note
      </button>
      </div>
    );
  }
});

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

    onDeleteNote: function(laneId, noteId) {
      dispatch( notesActions.deleteNote(noteId) );
      dispatch( lanesActions.detachFromLane(laneId, noteId) );
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
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Lane);
