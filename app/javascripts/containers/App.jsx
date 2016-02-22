'use strict';

var React = require('react');

var laneActions = require('../actions/lanes');
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
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
