var types = require('../actions/lanes').types;
var uuid = require('uuid');

var initialState = [
  {
    id: uuid.v4(),
    name: 'Todo',
    notes: []
  },
  {
    id: uuid.v4(),
    name: 'In Progress',
    notes: []
  },
  {
    id: uuid.v4(),
    name: 'Review',
    notes: []
  }
];

module.exports = function(state, action) {
  state = state || initialState;

  switch (action.type) {
    case types.CREATE_LANE:
      return state.concat(action.payload);

    case types.UPDATE_LANE:
      return state.map(function(lane) {
        if(lane.id === action.payload.id) {
          return Object.assign({}, lane, action.payload);
        }

        return lane;
      });

    case types.DELETE_LANE:
      return state.filter(function(lane) {
        return lane.id !== action.payload.id;
      });

    case types.ATTACH_TO_LANE:
      var laneId = action.payload.laneId;
      var noteId = action.payload.noteId;

      return state.map(function(lane) {
        if(lane.id === laneId) {
          return Object.assign({}, lane, {
            notes: lane.notes.concat(noteId)
          });
        }

        return lane;
      });

    case types.DETACH_FROM_LANE:
      var laneId = action.payload.laneId; //eslint-disable-line no-redeclare
      var noteId = action.payload.noteId; //eslint-disable-line no-redeclare

      return state.map(function(lane) {
        if(lane.id === laneId) {
          return Object.assign({}, lane, {
            notes: lane.notes.filter(function(id) {
              return id !== noteId;
            })
          });
        }

        return lane;
      });

    default:
      return state;
  }
};
