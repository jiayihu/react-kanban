var React = require('react');
var Note = require('./Note.jsx'); //eslint-disable-line no-unused-vars
var Editable = require('./Editable.jsx'); //eslint-disable-line no-unused-vars

var Notes = React.createClass({
  render: function() {
    var notes = this.props.notes.map(function(note) {
      return (
        <Note
          id={note.id}
          key={note.id}
          onMoveNote={this.props.onMoveNote}
        >
          <Editable
            editing={note.editing}
            value={note.text}
            onDelete={this.props.onDeleteNote.bind(null, note.id)}
            onEdit={this.props.onEditNote.bind(null, note.id)}
            onValueClick={this.props.onValueClick.bind(null, note.id)}
          />
        </Note>
      );
    }.bind(this));

    return (
      <ul className="notes-list">
        {notes}
      </ul>
    );
  }
});

module.exports = Notes;
