var React = require('react');

var Editable = React.createClass({
  handleDelete: function() {
    this.props.onDelete();
  },

  handleValueClick: function() {
    this.props.onValueClick();
  },

  handleFinishEdit: function(e) {
    if( (e.type === 'keypress') && (e.key !== 'Enter') ) {
      return;
    }

    var value = e.target.value;

    if(this.props.onEdit && value.trim().length) {
      this.props.onEdit(value);
    }
  },

  renderEdit: function() {
    return (
        <input
          type="text"
          autoFocus
          className="editing"
          ref={function(input) {
            if(input) {
              input.selectionEnd = this.props.value.length;
            }
          }.bind(this)}
          defaultValue={this.props.value}
          onBlur={this.handleFinishEdit}
          onKeyPress={this.handleFinishEdit}
        />
    );
  },

  renderDelete: function() {
    return (
      <span className="delete" onClick={this.handleDelete}>
        &times;
      </span>
    );
  },

  renderValue: function() {
    return (
        <span>
          <input
            type="text"
            onClick={this.handleValueClick}
            defaultValue={this.props.value}
            readOnly
          />
        {this.props.onDelete? this.renderDelete() : null}
        </span>
    );
  },

  render: function() {
    if(this.props.editing) {
      return this.renderEdit();
    }

    return this.renderValue();
  }
});

module.exports = Editable;
