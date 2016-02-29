var types = require('../actions/lanes').types;
var uuid = require('uuid');
var update = require('react-addons-update');

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
      var noteIndex;

      return state.map(function(lane) {
        noteIndex = lane.notes.indexOf(noteId);
        if(~noteIndex) {
          return Object.assign({}, lane, {
            notes: lane.notes.filter(function(id) {
              return id !== noteId;
            })
          });
        }

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

    case types.MOVE_NOTE:
      var sourceId = action.payload.sourceId;
      var targetId = action.payload.targetId;
      console.log(sourceId, targetId);
      var sourceLane = state.filter(function(lane) {
        return ~lane.notes.indexOf(sourceId);
      })[0];
      var targetLane = state.filter(function(lane) {
        return ~lane.notes.indexOf(targetId);
      })[0];
      var sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
      var targetNoteIndex = targetLane.notes.indexOf(targetId);

      if(sourceLane.id === targetLane.id) {
        return state.map(function(lane) {
          if(lane.id === sourceLane.id) {
            return Object.assign({}, lane, {
              notes: update(sourceLane.notes, {
                $splice: [
                  [sourceNoteIndex, 1],
                  [targetNoteIndex, 0, sourceId]
                ]
              })
            });
          }

          return lane;
        });
      } else {
        return state.map(function(lane) {
          if(lane.id === sourceLane.id) {
            return Object.assign({}, lane, {
              notes: update(lane.notes, {
                $splice: [[sourceNoteIndex, 1]]
              })
            });
          }

          if(lane.id === targetLane.id) {
            return Object.assign({}, lane, {
              notes: update(lane.notes, {
                $splice: [[targetNoteIndex, 0, sourceId]]
              })
            });
          }

          return lane;
        });
      }

    case types.MOVE_LANE:
      var sourceId = action.payload.sourceId; //eslint-disable-line no-redeclare
      var targetId = action.payload.targetId; //eslint-disable-line no-redeclare
      var sourceLane = state.find(function(lane) { //eslint-disable-line no-redeclare
        return lane.id === sourceId;
      });
      var sourceLaneIndex = state.findIndex(function(lane) {
        return lane.id === sourceId;
      });
      var targetLaneIndex = state.findIndex(function(lane) {
        return lane.id === targetId;
      });

      return update(state, {
        $splice: [
          [sourceLaneIndex, 1],
          [targetLaneIndex, 0, sourceLane]
        ]
      });

    default:
      return state;
  }
};
