var uuid = require('node-uuid');

var notes = [
  {
    id: uuid.v4(),
    task: 'Learn Webpack'
  },
  {
    id: uuid.v4(),
    task: 'Learn React'
  },
  {
    id: uuid.v4(),
    task: 'Do laundry'
  }
];

/**
 * Adds a note to the notes
 * @param  {object} note Note object
 * @return {array}
 */
var addNote = function(note) {
  if( (typeof note !== 'object') || (Object.keys(note).length === 0) ) {
    throw new Error('model.addNote(): wrong param');
  }

  var newNote = {
    id: uuid.v4(),
    task: note.task
  };
  notes.push(newNote);
  return notes;
};

var getNotes = function() {
  return notes;
};

/**
 * Updates a note
 * @param  {string} id Note uuid
 * @param  {string} value New task text
 * @return {array}
 */
var updateNote = function(id, value) {
  if( (typeof id !== 'string') || (typeof value !== 'string') ) {
    throw new Error('model.updateNote(): wrong params');
  }

  notes.forEach(function(note) {
    if(note.id === id) {
      note.task = value;
    }
  });

  return notes;
};

var removeNote = function(id) {
  if(typeof id !== 'string') {
    throw new Error('model.updateNote(): wrong params');
  }

  notes.forEach(function(note, index) {
    if(note.id === id) {
      notes.splice(index, 1);
    }
  });

  return notes;
};

module.exports = {
  addNote: addNote,
  getNotes: getNotes,
  updateNote: updateNote,
  removeNote: removeNote
};
