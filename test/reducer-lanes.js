var expect = require('chai').expect;
var reducer = require('../app/javascripts/reducers/lanes');
var types = require('../app/javascripts/actions/lanes').types;

describe('lanes reducer', function() {
  it('should return the initial state', function() {
    expect(reducer(null, {type: 'unknown'})).to.deep.equal([]);
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
});
