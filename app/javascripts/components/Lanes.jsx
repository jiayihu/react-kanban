var React = require('react');
var Lane = require('../containers/Lane.jsx');

module.exports = React.createClass({
  render: function() {
    var lanes = this.props.lanes.map(function(lane) {
      return (
        <Lane
          key={lane.id}
          lane={lane}
          onEditLane={this.props.onEditLane}
          onDeleteLane={this.props.onDeleteLane}
          onMoveLane={this.props.onMoveLane}
        />
      );
    }.bind(this));
    return (
      <div className="lanes">
        {lanes}
      </div>
    );
  }
});
