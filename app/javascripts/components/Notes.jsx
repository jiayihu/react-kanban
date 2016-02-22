var React = require('react');
var Note = require('./Note.jsx');

var Notes = React.createClass({
  render: function() {
    var notes = this.props.notes.map(function(note) {
      return (
        <Note
          key={note.id}
          onDeleteNote={this.props.onDeleteNote.bind(null, note.id)}
          onEditNote={this.props.onEditNote}
          text={note.text}
        />
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
