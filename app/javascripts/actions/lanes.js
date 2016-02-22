var helpers = require('../helpers');
var uuid = require('uuid');

/**
 * Actions types
 */

var CREATE_LANE = 'CREATE_LANE';
var UPDATE_LANE = 'UPDATE_LANE';
var DELETE_LANE = 'DELETE_LANE';

var createLane = function(name) {
  if(typeof name !== 'string') {
    helpers.makeError('params', name);
  }

  return {
    type: CREATE_LANE,
    payload: {
      id: uuid.v4(),
      name: name,
      notes: []
    }
  };
};

module.exports = {
  types: {
    CREATE_LANE: CREATE_LANE,
    UPDATE_LANE: UPDATE_LANE,
    DELETE_LANE: DELETE_LANE
  },
  createLane: createLane
};
