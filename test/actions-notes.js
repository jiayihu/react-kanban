var expect = require('chai').expect;
var actions = require('../app/javascripts/actions/notes');
var uuid = require('uuid');

describe('notes actions', function() {
  it('should create an action to add a note', function() {
    var text = 'Create task';
    var expectedAction = {
      type: actions.types.CREATE_NOTE,
      payload: {
        text: text
      }
    };

    expect(actions.createNote(text).type).to.equal(expectedAction.type);
    expect(actions.createNote(text).payload.id).to.be.a('string');
    expect(actions.createNote(text).payload.text).to.equal(expectedAction.payload.text);
  });

  it('should check if id is v4 valid and create an update action', function() {
    var invalidId = {
      id: 'Hello'
    };
    var invalidNote = 'not an object';
    var validId = uuid.v4();
    var validNote = {
      id: validId,
      text: 'Hello'
    };
    var expectedAction = {
      type: actions.types.UPDATE_NOTE,
      payload: validNote
    };

    expect(actions.updateNote.bind(null, invalidId)).to.throw(Error);
    expect(actions.updateNote.bind(null, invalidNote)).to.throw(Error);
    expect(expectedAction).to.deep.equal(actions.updateNote(validNote));
  });

  it('should check if id is v4 valid and create a delete action', function() {
    var invalidId = 'Hello';
    var validId = uuid.v4();
    var expectedAction = {
      type: actions.types.DELETE_NOTE,
      payload: {
        id: validId
      }
    };

    expect(actions.deleteNote.bind(null, invalidId)).to.throw(Error);
    expect(expectedAction).to.deep.equal(actions.deleteNote(validId));
  });
});
