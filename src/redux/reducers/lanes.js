// @flow

import * as actionTypes from '../../constants/actionTypes';
import uuid from 'uuid';

import type { IAction, ILane } from '../../types';

export type LanesState = $ReadOnlyArray<ILane>;

const defaultState: LanesState = [
  {
    id: uuid.v4(),
    name: 'Todo',
    editing: false,
    notes: [],
  },
  {
    id: uuid.v4(),
    name: 'In Progress',
    editing: false,
    notes: [],
  },
  {
    id: uuid.v4(),
    name: 'Review',
    editing: false,
    notes: [],
  },
];

export default function lanes(state: LanesState = defaultState, action: IAction): LanesState {
  switch (action.type) {
    case actionTypes.CREATE_LANE:
      return state.concat(action.payload);

    case actionTypes.UPDATE_LANE:
      return state.map(lane => {
        if (lane.id === action.payload.id) {
          return Object.assign({}, lane, action.payload);
        }

        return lane;
      });

    case actionTypes.DELETE_LANE:
      return state.filter(lane => lane.id !== action.payload.id);

    case actionTypes.ATTACH_TO_LANE: {
      const laneId = action.payload.laneId;
      const noteId = action.payload.noteId;
      let noteIndex;

      return state.map(lane => {
        noteIndex = lane.notes.indexOf(noteId);
        if (noteIndex !== -1) {
          return Object.assign({}, lane, {
            notes: lane.notes.filter(id => id !== noteId),
          });
        }

        if (lane.id === laneId) {
          return Object.assign({}, lane, {
            notes: lane.notes.concat(noteId),
          });
        }

        return lane;
      });
    }

    case actionTypes.DETACH_FROM_LANE: {
      const laneId = action.payload.laneId;
      const noteId = action.payload.noteId;

      return state.map(lane => {
        if (lane.id === laneId) {
          return Object.assign({}, lane, {
            notes: lane.notes.filter(id => id !== noteId),
          });
        }

        return lane;
      });
    }

    case actionTypes.MOVE_NOTE: {
      const sourceId = action.payload.sourceId;
      const targetId = action.payload.targetId;
      const sourceLane = state.filter(lane => lane.notes.indexOf(sourceId) !== -1)[0];
      const targetLane = state.filter(lane => lane.notes.indexOf(targetId) !== -1)[0];
      const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
      const targetNoteIndex = targetLane.notes.indexOf(targetId);

      if (sourceLane.id === targetLane.id) {
        return state.map(lane => {
          if (lane.id === sourceLane.id) {
            const notesWithoutSource = sourceLane.notes.filter(
              (note, index) => index !== sourceNoteIndex
            );
            const notesWithTarget = notesWithoutSource.slice();
            notesWithTarget.splice(targetNoteIndex, 0, sourceId);

            return Object.assign({}, lane, {
              notes: notesWithTarget,
            });
          }

          return lane;
        });
      }

      return state.map(lane => {
        if (lane.id === sourceLane.id) {
          return Object.assign({}, lane, {
            notes: lane.notes.filter((note, index) => index !== sourceNoteIndex),
          });
        }

        if (lane.id === targetLane.id) {
          const notesWithTarget = lane.notes.slice();
          notesWithTarget.splice(targetNoteIndex, 0, sourceId);

          return Object.assign({}, lane, {
            notes: notesWithTarget,
          });
        }

        return lane;
      });
    }

    case actionTypes.MOVE_LANE: {
      const sourceId = action.payload.sourceId;
      const targetId = action.payload.targetId;
      const sourceLane = state.find(lane => lane.id === sourceId);
      const sourceLaneIndex = state.findIndex(lane => lane.id === sourceId);
      const targetLaneIndex = state.findIndex(lane => lane.id === targetId);

      if (!sourceLane) return state;

      const lanesWithoutSource = state.filter((lane, index) => index !== sourceLaneIndex);
      const lanesWithTarget = lanesWithoutSource.slice();
      lanesWithTarget.splice(targetLaneIndex, 0, sourceLane);

      return lanesWithTarget;
    }

    default:
      return state;
  }
}
