// @flow

import './_notes.scss';

import React from 'react';
import Note from '../../containers/Note.jsx';
import Editable from '../Editable.jsx';

import type { INote } from '../../types';

type Props = {
  notes: INote[],
  onDeleteNote: Function,
  onEditNote: Function,
  onMoveNote: Function,
  onValueClick: Function,
};

export default class Notes extends React.Component<*, Props, *> {
  render() {
    const notes = this.props.notes.map(note =>
      (<Note id={note.id} key={note.id} onMoveNote={this.props.onMoveNote}>
        <Editable
          editing={note.editing}
          id={note.id}
          value={note.text}
          onDelete={this.props.onDeleteNote}
          onEdit={this.props.onEditNote}
          onValueClick={this.props.onValueClick}
        />
      </Note>),
    );

    return (
      <ul className="notes-list">
        {notes}
      </ul>
    );
  }
}
