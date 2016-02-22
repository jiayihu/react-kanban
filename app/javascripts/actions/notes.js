var helpers = require('../helpers');
var uuid = require('uuid');

/**
 * Actions Types
 */

var CREATE_NOTE = 'CREATE_NOTE';
var UPDATE_NOTE = 'UPDATE_NOTE';
var DELETE_NOTE = 'DELETE_NOTE';

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

/**
 * Returns the action to create a note
 * @param  {string} text Note text
 * @return {object}
 */
var createNote = function(text) {
  if(typeof text !== 'string') {
    helpers.makeError('params', text);
  }

  return {
    type: CREATE_NOTE,
    payload: {
      id: uuid.v4(),
      text: text
    }
  };
};

/**
 * Returns the action to update a note
 * @param  {object} updatedNote Object with note properties to update. It must
 * have a valid id.
 * @return {object}
 */
var updateNote = function(updatedNote) {
  if( (typeof updatedNote !== 'object') || (!isV4(updatedNote.id)) ) {
    helpers.makeError('params', updatedNote);
  }

  return {
    type: UPDATE_NOTE,
    payload: updatedNote
  };
};

/**
 * Returns the action to delete a note
 * @param  {string} id Note id
 * @return {object}
 */
var deleteNote = function(id) {
  if(!isV4(id)) {
    helpers.makeError('params', id);
  }

  return {
    type: DELETE_NOTE,
    payload: {
      id: id
    }
  };
};

module.exports = {
  types: {
    CREATE_NOTE: CREATE_NOTE,
    UPDATE_NOTE: UPDATE_NOTE,
    DELETE_NOTE: DELETE_NOTE
  },
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote
};
