var expect = require('chai').expect;
var actions = require('../app/javascripts/actions/lanes');
var types = actions.types;
var uuid = require('uuid');

describe('lanes actions', function() {
  it('should return an action to create a lane', function() {
    var name = 'Active';
    var expectedAction = {
      type: types.CREATE_LANE,
      payload: {
        id: uuid(),
        name: name
      }
    };

    expect(actions.createLane(name).type).to.equal(expectedAction.type);
    expect(actions.createLane(name).payload.id).to.be.a('string');
    expect(actions.createLane(name).payload.name).to.equal(expectedAction.payload.name);
    expect(actions.createLane(name).payload.notes).to.be.an('array');
  });

  it('should return an action to attach a note to a lane', function() {
    var validId = uuid.v4();
    var expectedAction = {
      type: types.ATTACH_TO_LANE,
      payload: {
        laneId: validId,
        noteId: validId
      }
    };

    expect(actions.attachToLane(validId, validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to update a lane', function() {
    var validId = uuid.v4();
    var updatedLane = {
      id: validId,
      name: 'Text'
    };
    var expectedAction = {
      type: types.UPDATE_LANE,
      payload: {
        id: validId,
        name: 'Text'
      }
    };

    expect(actions.updateLane(updatedLane)).to.deep.equal(expectedAction);
  });

  it('should create an action to delete the lane', function() {
    var validId = uuid.v4();
    var expectedAction = {
      type: actions.types.DELETE_LANE,
      payload: {
        id: validId
      }
    };

    expect(actions.deleteLane(validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to detach a note from a lane', function() {
    var validId = uuid.v4();
    var expectedAction = {
      type: types.DETACH_FROM_LANE,
      payload: {
        laneId: validId,
        noteId: validId
      }
    };

    expect(actions.detachFromLane(validId, validId)).to.deep.equal(expectedAction);
  });

  it('should return an action to move a note in the lane', function() {
    var validId = uuid.v4();
    var expectedAction = {
      type: types.MOVE,
      payload: {
        sourceId: validId,
        targetId: validId
      }
    };

    expect(actions.move(validId, validId)).to.deep.equal(expectedAction);
  });

  it('should throw an error', function() {
    expect(actions.createLane.bind(null, {})).to.throw(Error);
    expect(actions.attachToLane.bind(null, 1, 'invalidId')).to.throw(Error);
    expect(actions.detachFromLane.bind(null, 1, 'invalidId')).to.throw(Error);
  });
});
