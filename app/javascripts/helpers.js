var ParamsError = function(data) {
  this.message = 'Invalid parameters: ' + JSON.stringify(data);
  this.stack = (new Error()).stack;
};

ParamsError.prototype = Object.create(Error.prototype);
ParamsError.prototype.name = 'ParamsError';

var makeError = function(type, data) {
  switch (type) {
    case 'params':
      throw new ParamsError(data);
    default:
      throw new Error(JSON.stringify(data));
  }
};

module.exports = {
  makeError: makeError
};
