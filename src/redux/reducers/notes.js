// @flow

import * as actionTypes from '../../constants/actionTypes';

import type { Action, Note } from '../../types';

export type NotesState = $ReadOnlyArray<Note>;

export default function notes(state: NotesState = [], action: Action): NotesState {
  switch (action.type) {
    case actionTypes.CREATE_NOTE:
      return state.concat(action.payload);

    case actionTypes.UPDATE_NOTE:
      return state.map(note => {
        if (note.id === action.payload.id) {
          return Object.assign({}, note, action.payload);
        }
        return note;
      });

    case actionTypes.DELETE_NOTE:
      return state.filter(note => note.id !== action.payload.id);

    default:
      return state;
  }
}
