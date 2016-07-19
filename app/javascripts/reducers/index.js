import { combineReducers } from 'redux';
import lanesReducer from './lanes';
import notesReducer from './notes';

export default combineReducers({
  lanes: lanesReducer,
  notes: notesReducer,
});
