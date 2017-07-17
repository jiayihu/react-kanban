// @flow

import React from 'react';
import Notes from './Notes/Notes.jsx';
import Editable from './Editable.jsx';

import type { INote, ILane } from '../types';

type Props = {
  allNotes: INote[],
  connectDragPreview: Function,
  connectDragSource: Function,
  connectDropTarget: Function,
  lane: ILane,
  onCreateNote: Function,
  onDeleteLane: Function,
  onDeleteNote: Function,
  onEditLane: Function,
  onEditNote: Function,
  onMoveNote: Function,
};

export default class Lane extends React.Component<*, Props, *> {
  constructor() {
    super();
    (this: any).handleCreateNote = this.handleCreateNote.bind(this);
    (this: any).handleDeleteLane = this.handleDeleteLane.bind(this);
    (this: any).handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  handleCreateNote() {
    this.props.onCreateNote(this.props.lane.id);
  }

  handleDeleteLane() {
    const lane = this.props.lane;
    this.props.onDeleteLane(lane.id);
    lane.notes.forEach(noteId => this.props.onDeleteNote(null, noteId));
  }

  handleDeleteNote(noteId: string) {
    this.props.onDeleteNote(this.props.lane.id, noteId);
  }

  render() {
    const lane = this.props.lane;
    const allNotes = this.props.allNotes;
    const laneNotes = lane.notes
      .map(id => allNotes.find(note => note.id === id))
      .filter(note => note); // filter out undefined notes
    const connectDragSource = this.props.connectDragSource;
    const connectDragPreview = this.props.connectDragPreview;
    const connectDropTarget = this.props.connectDropTarget;

    return connectDragPreview(
      connectDropTarget(
        <div className="lane">
          <h2 className="lane__name">
            <Editable
              editing={lane.editing}
              id={lane.id}
              value={lane.name}
              onEdit={this.props.onEditLane}
              onValueClick={this.props.onEditLane}
            />
            <button className="lane__delete" onClick={this.handleDeleteLane}>
              -
            </button>
            {connectDragSource(<button className="lane__drag" />)}
          </h2>
          <Notes
            notes={laneNotes}
            onDeleteNote={this.handleDeleteNote}
            onEditNote={this.props.onEditNote}
            onValueClick={this.props.onEditNote}
            onMoveNote={this.props.onMoveNote}
          />
          <button className="add-note" onClick={this.handleCreateNote}>
            + note
          </button>
        </div>
      )
    );
  }
}
