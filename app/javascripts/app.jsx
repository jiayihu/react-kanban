'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var model = require('./model');

var Notes = require('./components/Notes.jsx');

var App = React.createClass({
  handleDelete: function(id) {
    this.setState({
      notes: model.removeNote(id)
    });
  },
  handleEdit: function(id, value) {
    this.setState({
      notes: model.updateNote(id, value)
    });
  },
  getInitialState: function() {
    return {
      notes: model.getNotes()
    };
  },
  handleButtonClick: function() {
    this.setState({
      notes: model.addNote({
        task: 'New task!'
      })
    });
  },
  render: function() {
    return (
      <div className="react-kanban">
        <div className="header">
          <h1>React.js Kanban</h1>
        </div>
        <Notes
          notes={this.state.notes}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
        <button
          className="mdl-button mdl-js-button mdl-button--colored mdl-button--raised mdl-js-ripple-effect"
          onClick={this.handleButtonClick}>
          Add note
        </button>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.querySelector('.app')
);
