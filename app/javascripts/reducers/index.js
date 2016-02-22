var combineReducers = require('redux').combineReducers;
var lanesReducer = require('./lanes');

module.exports = combineReducers({
  lanes: lanesReducer
});
