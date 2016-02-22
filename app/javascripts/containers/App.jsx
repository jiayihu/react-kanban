'use strict';

var React = require('react');

var laneActions = require('../actions/lanes');
var notesActions = require('../actions/notes');
var connect = require('react-redux').connect;
var Lanes = require('../components/Lanes.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className="react-kanban">
        <h1 className="app-title">React.js Kanban</h1>
        <button
          className="add-lane"
          onClick={this.props.onCreateLane}>
          +
        </button>
        <Lanes
          lanes={this.props.lanes}
          onCreateNote={this.props.onCreateNote}
          onDeleteNote={this.props.onDeleteNote}
          onEditNote={this.props.onEditNote}
        />
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return {
    lanes: state.lanes
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    onCreateLane: function() {
      dispatch( laneActions.createLane('Active') );
    },

    onCreateNote: function() {
      dispatch( notesActions.createNote('New note') );
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
