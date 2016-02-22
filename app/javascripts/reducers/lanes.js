var types = require('../actions/lanes').types;
var uuid = require('uuid');
var initialState = [
  {
    id: uuid.v4(),
    name: 'Todo',
    notes: [
      {
        id: 1,
        text: 'Write BDD code!'
      },
      {
        id: 2,
        text: 'Learn functional programming'
      },
      {
        id: 3,
        text: 'Hello world!'
      }
    ]
  },
  {
    id: uuid.v4(),
    name: 'In Progress',
    notes: [{
      id: 1,
      text: 'Write BDD code!'
    }]
  },
  {
    id: uuid.v4(),
    name: 'Review',
    notes: [{
      id: 1,
      text: 'Fix UI bugs!'
    }]
  }
];

module.exports = function(state, action) {
  state = state || initialState;

  switch (action.type) {
    case types.CREATE_LANE:
      return state.concat(action.payload);
    default:
      return state;
  }
};
