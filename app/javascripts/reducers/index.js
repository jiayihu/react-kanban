var combineReducers = require('redux').combineReducers;
var lanesReducer = require('./lanes');
var notesReducer = require('./notes');

module.exports = combineReducers({
  lanes: lanesReducer,
  notes: notesReducer
});
