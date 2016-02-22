var React = require('react');
var Lane = require('./Lane.jsx');

module.exports = React.createClass({
  render: function() {
    var lanes = this.props.lanes.map(function(lane) {
      return (
        <Lane
          key={lane.id}
          name={lane.name}
          notes={lane.notes}
          onCreateNote={this.props.onCreateNote}
          onDeleteNote={this.props.onDeleteNote}
          onEditNote={this.props.onEditNote}
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
