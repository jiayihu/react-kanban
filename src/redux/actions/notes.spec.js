import { expect } from 'chai';
import actions from './notes';
import * as actionTypes from '../../constants/actionTypes';
import uuid from 'uuid';

describe('notes actions', () => {
  it('should create an action to add a note', () => {
    const text = 'Create task';
    const expectedAction = {
      type: actionTypes.CREATE_NOTE,
      payload: {
        text,
      },
    };

    expect(actions.createNote(text).type).to.equal(expectedAction.type);
    expect(actions.createNote(text).payload.id).to.be.a('string');
    expect(actions.createNote(text).payload.text).to.equal(expectedAction.payload.text);
  });

  it('should check if id is v4 valid and create an update action', () => {
    const invalidId = {
      id: 'Hello',
    };
    const invalidNote = 'not an object';
    const validId = uuid.v4();
    const validNote = {
      id: validId,
      text: 'Hello',
    };
    const expectedAction = {
      type: actionTypes.UPDATE_NOTE,
      payload: validNote,
    };

    expect(actions.updateNote.bind(null, invalidId)).to.throw(Error);
    expect(actions.updateNote.bind(null, invalidNote)).to.throw(Error);
    expect(actions.updateNote(validNote)).to.deep.equal(expectedAction);
  });

  it('should check if id is v4 valid and create a delete action', () => {
    const invalidId = 'Hello';
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.DELETE_NOTE,
      payload: {
        id: validId,
      },
    };

    expect(actions.deleteNote.bind(null, invalidId)).to.throw(Error);
    expect(actions.deleteNote(validId)).to.deep.equal(expectedAction);
  });
});
