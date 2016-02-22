var expect = require('chai').expect;
var actions = require('../app/javascripts/actions/lanes');
var uuid = require('uuid');

describe('lanes actions', function() {
  it('should return an action to create a lane', function() {
    var name = 'Active';
    var expectedAction = {
      type: 'CREATE_LANE',
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

  it('should throw an error', function() {
    var invalidParam = {};

    expect(actions.createLane.bind(null, invalidParam)).to.throw(Error);
  });
});
