var types = require('../actions/notes').types;
var uuid = require('node-uuid');

var initialState = [
  {
    id: uuid.v4(),
    text: 'Learn Webpack'
  },
  {
    id: uuid.v4(),
    text: 'Learn React'
  },
  {
    id: uuid.v4(),
    text: 'Do laundry'
  }
];

module.exports = function(state, action) {
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
