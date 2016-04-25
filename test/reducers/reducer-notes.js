var expect = require('chai').expect;
var reducer = require('../../app/javascripts/reducers/notes');
var types = require('../../app/javascripts/actions/notes').types;
var uuid = require('uuid');

describe('notes reducer', function() {
  it('should return the initial state', function() {
    expect(reducer([], {type: 'unknown type'})).to.deep.equal([]);
  });

  it('should handle CREATE_NOTE', function() {
    var createAction = {
      type: types.CREATE_NOTE,
      payload: {
        id: uuid.v4(),
        text: 'New task'
      }
    };

    expect(reducer([], createAction)).to.deep.equal([createAction.payload]);
    expect(reducer(null, createAction)).to.have.length(1);
  });

  it('should handle UPDATE_NOTE', function() {
    var v4Id = uuid.v4();
    var oldState = [{
      id: v4Id,
      text: 'Old task'
    }];
    var updateAction = {
      type: types.UPDATE_NOTE,
      payload: {
        id: v4Id,
        text: 'New task'
      }
    };

    expect(reducer(oldState, updateAction)).to.deep.equal([updateAction.payload]);
  });

  it('should handle DELETE_NOTE', function() {
    var v4Id = uuid.v4();
    var oldState = [{
      id: v4Id,
      text: 'Old task'
    }];
    var deleteAction = {
      type: types.DELETE_NOTE,
      payload: {
        id: v4Id
      }
    };

    expect(reducer(oldState, deleteAction)).to.deep.equal([]);
  });
});
