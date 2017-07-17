// @flow

import React from 'react';

type Props = {
  editing?: boolean,
  id: string,
  onDelete?: Function,
  onEdit: Function,
  onValueClick: Function,
  value: string,
};

export default class Editable extends React.Component<*, Props, *> {
  static selectToEnd(input: HTMLInputElement) {
    if (input) input.focus();
  }

  constructor() {
    super();
    (this: any).handleDelete = this.handleDelete.bind(this);
    (this: any).handleValueClick = this.handleValueClick.bind(this);
    (this: any).handleFinishEdit = this.handleFinishEdit.bind(this);
  }

  handleDelete() {
    if (this.props.onDelete) this.props.onDelete(this.props.id);
  }

  handleValueClick() {
    this.props.onValueClick(this.props.id);
  }

  handleFinishEdit(e: Event) {
    if (e.type === 'keypress' && e.key !== 'Enter') {
      return;
    }

    const value = (e: any).target.value;

    if (this.props.onEdit && value.trim().length) {
      this.props.onEdit(this.props.id, value);
    }
  }

  renderEdit() {
    return (
      <input
        type="text"
        className="editing"
        ref={Editable.selectToEnd}
        defaultValue={this.props.value}
        onBlur={this.handleFinishEdit}
        onKeyPress={this.handleFinishEdit}
      />
    );
  }

  renderDelete() {
    return (
      <span className="delete" onClick={this.handleDelete}>
        &times;
      </span>
    );
  }

  renderValue() {
    return (
      <span>
        <input
          type="text"
          onClick={this.handleValueClick}
          defaultValue={this.props.value}
          readOnly
        />
        {this.props.onDelete ? this.renderDelete() : null}
      </span>
    );
  }

  render() {
    if (this.props.editing) {
      return this.renderEdit();
    }

    return this.renderValue();
  }
}
