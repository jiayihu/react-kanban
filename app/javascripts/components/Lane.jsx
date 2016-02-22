var React = require('react');
var Notes = require('./Notes.jsx');
var lanesActions = require('../actions/lanes');
var notesActions = require('../actions/notes');
var connect = require('react-redux').connect;

var Lane = React.createClass({
  handleClick: function() {
    this.props.onCreateNote(this.props.lane.id);
  },

  render: function() {
    var lane = this.props.lane;
    var allNotes = this.props.allNotes;
    var laneNotes = lane.notes.map(function(id) {
      return allNotes.find(function(note) {
        return note.id === id;
      });
    });
    console.log('laneNotes: %o', laneNotes);

    return (
      <div className="lane">
        <h2 className="lane__name">{lane.name}</h2>
        <Notes
          notes={laneNotes}
          onDeleteNote={this.props.onDeleteNote}
          onEditNote={this.props.onEditNote}
        />
      <button className="add-note" onClick={this.handleClick} >+ note</button>
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
      // @FIXME Reduce to one dispatch 
      dispatch(newNote);
      dispatch( lanesActions.attachToLane(laneId, newNote.payload.id) );
    },

    onDeleteNote: function(id) {
      dispatch( notesActions.deleteNote(id) );
    },

    onEditNote: function(id, value) {
      var updatedNote = {
        id: id,
        text: value
      };

      dispatch( notesActions.updateNote(updatedNote) );
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Lane);
