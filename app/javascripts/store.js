var createStore = require('redux').createStore;
var reducer = require('./reducers/notes');

var store = createStore(reducer);

store.subscribe(function() {
  console.log(store.getState());
});

module.exports = store;
