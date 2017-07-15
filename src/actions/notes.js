import uuid from 'uuid';
import * as actionTypes from '../constants/actionTypes';

/**
 * Checks if String is valid v4 id
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
 * Returns the action to create a note
 * @param  {String} text Note text
 * @return {Object}
 */
function createNote(text) {
  if(typeof text !== 'string') {
    throw new Error(`params ${text}`);
  }

  return {
    type: actionTypes.CREATE_NOTE,
    payload: {
      id: uuid.v4(),
      editing: false,
      text,
    },
  };
}

/**
 * Returns the action to update a note
 * @param  {Object} updatedNote Object with note properties to update. It must
 * have a valid id.
 * @return {Object}
 */
function updateNote(updatedNote) {
  if((typeof updatedNote !== 'object') || (!isV4(updatedNote.id))) {
    throw new Error(`params ${updatedNote}`);
  }

  return {
    type: actionTypes.UPDATE_NOTE,
    payload: updatedNote,
  };
}

/**
 * Returns the action to delete a note
 * @param  {String} id Note id
 * @return {Object}
 */
function deleteNote(id) {
  if(!isV4(id)) {
    throw new Error(`params ${id}`);
  }

  return {
    type: actionTypes.DELETE_NOTE,
    payload: {
      id,
    },
  };
}

export default {
  createNote,
  updateNote,
  deleteNote,
};
