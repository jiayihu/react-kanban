import uuid from 'uuid';
import * as actionTypes from '../constants/actionTypes';

/**
 * Checks if string is valid v4 id
 * @param  {String} id Id to be checked
 * @return {Boolean}
 */
function isV4(id) {
  if(typeof id !== 'string') {
    return false;
  }

  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id);
}

/**
 * Returns a createLane action
 * @param  {String} name Lane name
 * @return {Object}
 */
function createLane(name) {
  if(typeof name !== 'string') {
    throw new Error(`params ${name}`);
  }

  return {
    type: actionTypes.CREATE_LANE,
    payload: {
      id: uuid.v4(),
      name,
      notes: [],
    },
  };
}

/**
 * Returns the action to update a lane
 * @param  {Object} updatedLane Updated lane properties
 * @return {Object}
 * @example
 * updateLane({
 *   id: String,
 *   name: String,
 *   editing: Bool
 * })
 */
function updateLane(updatedLane) {
  if((typeof updatedLane !== 'object') || (!isV4(updatedLane.id))) {
    throw new Error(`params ${updatedLane}`);
  }

  return {
    type: actionTypes.UPDATE_LANE,
    payload: updatedLane,
  };
}

/**
 * Returns an action to delete a lane
 * @param  {String} id Lane id
 * @return {Object}
 */
function deleteLane(id) {
  if(!isV4(id)) {
    throw new Error(`params ${id}`);
  }

  return {
    type: actionTypes.DELETE_LANE,
    payload: {
      id,
    },
  };
}

/**
 * Returns an action to attach a note to a lane
 * @param  {String} laneId Lane id
 * @param  {String} noteId Note id
 * @return {Object}
 */
function attachToLane(laneId, noteId) {
  if((!isV4(laneId)) || (!isV4(noteId))) {
    throw new Error(`params ${laneId} ${noteId}`);
  }

  return {
    type: actionTypes.ATTACH_TO_LANE,
    payload: {
      laneId,
      noteId,
    },
  };
}

/**
 * Returns an action to detach a note from a lane
 * @param  {String} laneId Lane id
 * @param  {String} noteId Note id
 * @return {Object}
 */
function detachFromLane(laneId, noteId) {
  if((!isV4(laneId)) || (!isV4(noteId))) {
    throw new Error(`params ${laneId} ${noteId}`);
  }

  return {
    type: actionTypes.DETACH_FROM_LANE,
    payload: {
      laneId,
      noteId,
    },
  };
}

/**
 * Returns an action to move a note or a lane
 * @param  {String} target Whether it's a note or a lane
 * @param  {String} sourceId Source id
 * @param  {String} targetId Target id
 * @return {Object}
 */
function move(target, sourceId, targetId) {
  if((typeof target !== 'string') || (!isV4(sourceId)) || (!isV4(targetId))) {
    throw new Error(`params ${target} ${sourceId} ${targetId}`);
  }

  return {
    type: target === 'note' ? actionTypes.MOVE_NOTE : actionTypes.MOVE_LANE,
    payload: {
      sourceId,
      targetId,
    },
  };
}

export default {
  createLane,
  updateLane,
  deleteLane,
  attachToLane,
  detachFromLane,
  move,
};
