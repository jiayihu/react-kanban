// @flow

import { combineReducers } from 'redux';
import lanesReducer from './lanes';
import notesReducer from './notes';

import type { LanesState } from './lanes';
import type { NotesState } from './notes';

export interface State {
  +lanes: LanesState,
  +notes: NotesState,
}

export default combineReducers({
  lanes: lanesReducer,
  notes: notesReducer,
});
