var React = require('react');

var Note = React.createClass({
  render: function() {
    return (
      <li className="note" > {this.props.children} </li>
    );
  }
});

module.exports = Note;
