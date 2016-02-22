var React = require('react');
var Lane = require('./Lane.jsx');

module.exports = React.createClass({
  render: function() {
    var lanes = this.props.lanes.map(function(lane) {
      return (
        <Lane
          key={lane.id}
          lane={lane}
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
