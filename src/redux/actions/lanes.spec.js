import { expect } from 'chai';
import actions from './lanes';
import * as actionTypes from '../../constants/actionTypes';
import uuid from 'uuid';

describe('lanes actions', function description() {
  it('should return an action to create a lane', () => {
    const name = 'Active';
    const expectedAction = {
      type: actionTypes.CREATE_LANE,
      payload: {
        id: uuid(),
        name,
      },
    };

    expect(actions.createLane(name).type).to.equal(expectedAction.type);
    expect(actions.createLane(name).payload.id).to.be.a('string');
    expect(actions.createLane(name).payload.name).to.equal(expectedAction.payload.name);
    expect(actions.createLane(name).payload.notes).to.be.an('array');
  });

  it('should return an action to attach a note to a lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.ATTACH_TO_LANE,
      payload: {
        laneId: validId,
        noteId: validId,
      },
    };

    expect(actions.attachToLane(validId, validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to update a lane', () => {
    const validId = uuid.v4();
    const updatedLane = {
      id: validId,
      name: 'Text',
    };
    const expectedAction = {
      type: actionTypes.UPDATE_LANE,
      payload: {
        id: validId,
        name: 'Text',
      },
    };

    expect(actions.updateLane(updatedLane)).to.deep.equal(expectedAction);
  });

  it('should create an action to delete the lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.DELETE_LANE,
      payload: {
        id: validId,
      },
    };

    expect(actions.deleteLane(validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to detach a note from a lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.DETACH_FROM_LANE,
      payload: {
        laneId: validId,
        noteId: validId,
      },
    };

    expect(actions.detachFromLane(validId, validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to move a note in the lane', () => {
    const validId = uuid.v4();
    const expectedAction = {
      type: actionTypes.MOVE_NOTE,
      payload: {
        sourceId: validId,
        targetId: validId,
      },
    };

    expect(actions.move('note', validId, validId)).to.deep.equal(expectedAction);
  });

  it('should throw an error', () => {
    expect(actions.attachToLane.bind(null, 1, 'invalidId')).to.throw(Error);
    expect(actions.detachFromLane.bind(null, 1, 'invalidId')).to.throw(Error);
  });
});
