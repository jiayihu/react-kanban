var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var rootReducer = require('./reducers');

var logger = function(Store) {
  return function(next) {
    return function(action) {
      var console = window.console;
      var prevState = Store.getState();
      var returnValue = next(action);
      var nextState = Store.getState();
      console.log('%c prev state', 'color: #9E9E9E', prevState);
      console.log('%c action', 'color: #03A9F4', action);
      console.log('%c next state', 'color: #4CAF50', nextState);
      return returnValue;
    };
  };
};

module.exports = function(initialState) {
  initialState = initialState || {};
  console.log('initialState %o', initialState);

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger)
  );
};
