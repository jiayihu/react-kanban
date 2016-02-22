var types = require('../actions/notes').types;

var initialState = [];

var reducer = function(state, action) {
  state = state || initialState;

  switch (action.type) {
    case types.CREATE_NOTE:
      return state.concat(action.payload);

    case types.UPDATE_NOTE:
      return state.map(function(note) {
        if(note.id === action.payload.id) {
          return Object.assign({}, note, action.payload);
        }
        return note;
      });

    case types.DELETE_NOTE:
      return state.filter(function(note) {
        return note.id !== action.payload.id;
      });

    default:
      return state;
  }
};

module.exports = reducer;
