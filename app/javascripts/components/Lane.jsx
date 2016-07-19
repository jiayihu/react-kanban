import React, { PropTypes } from 'react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';

export default class Lane extends React.Component {
  constructor() {
    super();
    this.handleCreateNote = this.handleCreateNote.bind(this);
    this.handleDeleteLane = this.handleDeleteLane.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  handleCreateNote() {
    this.props.onCreateNote(this.props.lane.id);
  }

  handleDeleteLane() {
    const lane = this.props.lane;
    this.props.onDeleteLane(lane.id);
    lane.notes.forEach((noteId) => this.props.onDeleteNote(null, noteId));
  }

  handleDeleteNote(noteId) {
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
            <button
              className="lane__delete"
              onClick={this.handleDeleteLane}
            >-</button>
            {
              connectDragSource(
                <button className="lane__drag" />
              )
            }
          </h2>
          <Notes
            notes={laneNotes}
            onDeleteNote={this.handleDeleteNote}
            onEditNote={this.props.onEditNote}
            onValueClick={this.props.onEditNote}
            onMoveNote={this.props.onMoveNote}
          />
          <button className="add-note" onClick={this.handleCreateNote} >
            + note
          </button>
        </div>
      )
    );
  }
}

Lane.propTypes = {
  allNotes: PropTypes.array.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  lane: PropTypes.object.isRequired,
  onCreateNote: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onMoveNote: PropTypes.func.isRequired,
};
