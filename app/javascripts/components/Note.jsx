var React = require('react');

var Note = React.createClass({
  handleDelete: function() {
    this.props.onDelete();
  },

  handleEdit: function() {
    this.setState({
      editing: true
    });
  },

  handleFinishEdit: function(e) {
    if( (e.type === 'keypress') && (e.key !== 'Enter') ) {
      return;
    }

    var value = e.target.value;

    if(this.props.onEdit && value.trim().length) {
      this.props.onEdit(value);
    }


    this.setState({
      editing: false
    });
  },

  getInitialState: function() {
    return {
      text: '',
      editing: false
    };
  },

  renderEdit: function() {
    return (
      <li className="note">
        <input
          type="text"
          ref={function(input) {
            if(input) {
              input.selectionEnd = this.props.text.length;
            }
          }.bind(this)}
          autoFocus
          className="note--edit"
          defaultValue={this.props.text}
          onBlur={this.handleFinishEdit}
          onKeyPress={this.handleFinishEdit}
        />
      </li>
    );
  },

  renderNote: function() {
    return (
      <li className="note">
        <input
          onClick={this.handleEdit}
          defaultValue={this.props.text}
          readOnly
        />
        <span className="note__remove" onClick={this.handleDelete}>
          &times;
        </span>
      </li>
    );
  },

  render: function() {
    if(this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }
});

module.exports = Note;
