'use strict';

var React = require('react');

var actions = require('../actions/notes');
var connect = require('react-redux').connect;
var Notes = require('../components/Notes.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className="react-kanban">
        <div className="header">
          <h1>React.js Kanban</h1>
        </div>
        <Notes
          notes={this.props.notes}
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit}
        />
        <button
          onClick={this.props.onCreate}>
          Add note
        </button>
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return {
    notes: state
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    onCreate: function() {
      dispatch( actions.createNote('New task') );
    },

    onDelete: function(id) {
      dispatch( actions.deleteNote(id) );
    },

    onEdit: function(id, value) {
      dispatch( actions.updateNote({
        id: id,
        text: value
      }) );
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
