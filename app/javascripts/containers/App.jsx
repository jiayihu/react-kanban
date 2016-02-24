'use strict';

var React = require('react');

var lanesActions = require('../actions/lanes');
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
          onEditLane={this.props.onEditLane}
          onDeleteLane={this.props.onDeleteLane}
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
      dispatch( lanesActions.createLane('Active') );
    },

    onEditLane: function(laneId, name) {
      var updatedLane = {
        id: laneId
      };

      if(name) {
        updatedLane.name = name;
        updatedLane.editing = false;
      } else {
        updatedLane.editing = true;
      }

      dispatch( lanesActions.updateLane(updatedLane) );
    },

    onDeleteLane: function(laneId) {
      dispatch( lanesActions.deleteLane(laneId) );
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
