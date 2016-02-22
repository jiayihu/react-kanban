var React = require('react');
var Notes = require('./Notes.jsx');

module.exports = React.createClass({
  handleClick: function() {
    this.props.onCreateNote();
  },

  render: function() {
    return (
      <div className="lane">
        <h2 className="lane__name">{this.props.name}</h2>
        <Notes
          notes={this.props.notes}
          onDeleteNote={this.props.onDeleteNote}
          onEditNote={this.props.onEditNote}
        />
      <button className="add-note" onClick={this.handleClick} >+ note</button>
      </div>
    );
  }
});
