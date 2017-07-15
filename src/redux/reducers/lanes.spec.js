import { expect } from 'chai';
import reducer from './lanes';
import * as actionTypes from '../../constants/actionTypes';

describe('lanes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).to.have.length(3);
  });

  it('should handle CREATE_LANE', () => {
    const createAction = {
      type: actionTypes.CREATE_LANE,
      payload: {
        name: 'New Lane',
      },
    };

    expect(reducer([], createAction)).to.deep.equal([createAction.payload]);
  });

  it('should handle ATTACH_TO_LANE', () => {
    const action = {
      type: actionTypes.ATTACH_TO_LANE,
      payload: {
        laneId: 1,
        noteId: 1,
      },
    };

    expect(reducer(undefined, action)).to.have.length(3);
  });
});
