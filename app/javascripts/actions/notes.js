var uuid = require('node-uuid');

/**
 * Actions Types
 */

var CREATE_NOTE = 'CREATE_NOTE';
var UPDATE_NOTE = 'UPDATE_NOTE';
var DELETE_NOTE = 'DELETE_NOTE';

var createNote = function(text) {
  if(typeof text !== 'string') {
    throw new Error('createNote(): wrong param: ' + JSON.stringify(text));
  }

  return {
    type: CREATE_NOTE,
    payload: {
      id: uuid.v4(),
      text: text
    }
  };
};

var updateNote = function(updatedNote) {
  if( (typeof updatedNote !== 'object') || (typeof updatedNote.id !== 'string') ) {
    throw new Error('updateNote(): wrong param: ' + JSON.stringify(updatedNote));
  }

  return {
    type: UPDATE_NOTE,
    payload: updatedNote
  };
};

var deleteNote = function(id) {
  if(typeof id !== 'string') {
    throw new Error('deleteNote(): wrong param: ' + JSON.stringify(id));
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
