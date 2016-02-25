var React = require('react');
var Notes = require('./Notes.jsx'); //eslint-disable-line no-unused-vars
var Editable = require('./Editable.jsx'); //eslint-disable-line no-unused-vars

module.exports = React.createClass({
  handleDeleteLane: function(laneId, noteIds) {
    this.props.onDeleteLane(laneId);
    noteIds.forEach(function(noteId) {
      this.props.onDeleteNote(null, noteId);
    }.bind(this));
  },

  render: function() {
    var lane = this.props.lane;
    var allNotes = this.props.allNotes;
    var laneNotes = lane.notes
      .map(function(id) {
        return allNotes.find(function(note) {
          return note.id === id;
        });
      })
      .filter(function(note) {
        return note; //filter out undefined notes
      });
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
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
          onClick={this.handleDeleteLane.bind(null, lane.id, lane.notes)}
        >-</button>
        </h2>
        <Notes
          notes={laneNotes}
          onDeleteNote={this.props.onDeleteNote.bind(null, lane.id)}
          onEditNote={this.props.onEditNote}
          onValueClick={this.props.onEditNote}
          onMoveNote={this.props.onMoveNote}
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
