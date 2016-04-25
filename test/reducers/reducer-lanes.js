var expect = require('chai').expect;
var reducer = require('../../app/javascripts/reducers/lanes');
var types = require('../../app/javascripts/actions/constants');

describe('lanes reducer', function() {
  it('should return the initial state', function() {
    expect(reducer(null, {type: 'unknown'})).to.have.length(3);
  });

  it('should handle CREATE_LANE', function() {
    var createAction = {
      type: types.CREATE_LANE,
      payload: {
        name: 'New Lane'
      }
    };

    expect(reducer([], createAction)).to.deep.equal([createAction.payload]);
  });

  it('should handle ATTACH_TO_LANE', function() {
    var action = {
      type: types.ATTACH_TO_LANE,
      payload: {
        laneId: 1,
        noteId: 1
      }
    };

    expect(reducer(null, action)).to.have.length(3);
  });
});
