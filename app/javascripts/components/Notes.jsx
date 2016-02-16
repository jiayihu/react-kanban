var React = require('react');
var Note = require('./Note.jsx');

var Notes = React.createClass({
  render: function() {
    var notes = this.props.notes.map(function(note) {
      return (
        <Note
          key={note.id}
          text={note.text}
          onDelete={this.props.onDelete.bind(null, note.id)}
          onEdit={this.props.onEdit.bind(null, note.id)}
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
