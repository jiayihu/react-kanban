var helpers = require('../helpers');
var uuid = require('uuid');

/**
 * Checks if string is valid v4 id
 * @param  {string} id Id to be checked
 * @return {boolean}
 */
var isV4 = function(id) {
  if(typeof id !== 'string') {
    return false;
  }

  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id);
};

var CREATE_LANE = 'CREATE_LANE';
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

var UPDATE_LANE = 'UPDATE_LANE';
var updateLane = function(updatedLane) {
  if( (typeof updatedLane !== 'object') || (!isV4(updatedLane.id)) ) {
    helpers.makeError('params', updatedLane);
  }

  return {
    type: UPDATE_LANE,
    payload: updatedLane
  };
};

var DELETE_LANE = 'DELETE_LANE';
var deleteLane = function(id) {
  if(!isV4(id)) {
    helpers.makeError('params', id);
  }

  return {
    type: DELETE_LANE,
    payload: {
      id: id
    }
  };
};

var ATTACH_TO_LANE = 'ATTACH_TO_LANE';
var attachToLane = function(laneId, noteId) {
  if( (!isV4(laneId)) || (!isV4(noteId)) ) {
    helpers.makeError('params', {laneId: laneId, noteId: noteId});
  }

  return {
    type: ATTACH_TO_LANE,
    payload: {
      laneId: laneId,
      noteId: noteId
    }
  };
};

var DETACH_FROM_LANE = 'DETACH_FROM_LANE';
var detachFromLane = function(laneId, noteId) {
  if( (!isV4(laneId)) || (!isV4(noteId)) ) {
    helpers.makeError('params', {laneId: laneId, noteId: noteId});
  }

  return {
    type: DETACH_FROM_LANE,
    payload: {
      laneId: laneId,
      noteId: noteId
    }
  };
};

module.exports = {
  types: {
    CREATE_LANE: CREATE_LANE,
    UPDATE_LANE: UPDATE_LANE,
    DELETE_LANE: DELETE_LANE,
    ATTACH_TO_LANE: ATTACH_TO_LANE,
    DETACH_FROM_LANE: DETACH_FROM_LANE
  },
  createLane: createLane,
  updateLane: updateLane,
  deleteLane: deleteLane,
  attachToLane: attachToLane,
  detachFromLane: detachFromLane
};
