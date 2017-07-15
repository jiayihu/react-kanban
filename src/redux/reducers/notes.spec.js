import { expect } from 'chai';
import reducer from './notes';
import * as actionTypes from '../../constants/actionTypes';
import uuid from 'uuid';

describe('notes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer([], { type: 'unknown type' })).to.deep.equal([]);
  });

  it('should handle CREATE_NOTE', () => {
    const createAction = {
      type: actionTypes.CREATE_NOTE,
      payload: {
        id: uuid.v4(),
        text: 'New task',
      },
    };

    expect(reducer([], createAction)).to.deep.equal([createAction.payload]);
    expect(reducer(undefined, createAction)).to.have.length(1);
  });

  it('should handle UPDATE_NOTE', () => {
    const v4Id = uuid.v4();
    const oldState = [
      {
        id: v4Id,
        text: 'Old task',
      },
    ];
    const updateAction = {
      type: actionTypes.UPDATE_NOTE,
      payload: {
        id: v4Id,
        text: 'New task',
      },
    };

    expect(reducer(oldState, updateAction)).to.deep.equal([updateAction.payload]);
  });

  it('should handle DELETE_NOTE', () => {
    const v4Id = uuid.v4();
    const oldState = [
      {
        id: v4Id,
        text: 'Old task',
      },
    ];
    const deleteAction = {
      type: actionTypes.DELETE_NOTE,
      payload: {
        id: v4Id,
      },
    };

    expect(reducer(oldState, deleteAction)).to.deep.equal([]);
  });
});
