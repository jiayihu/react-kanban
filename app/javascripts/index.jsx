var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var App = require('./containers/App.jsx');
var localforage = require('localforage');
var configStore = require('./store');

var localStore = localforage.createInstance({
  name: 'kanban'
});

var onReset = function() {
  localStore.clear();
  window.location.reload();
};

localStore.getItem('state')
  .then(function(value) {
    return configStore(value);
  }, function(err) {
    console.error(err);
    return configStore(null);
  })
  .then(function(store) {
    ReactDOM.render(
      <div>
        <Provider store={store}>
          <App onReset={onReset} />
        </Provider>
      </div>,
      document.querySelector('.app')
    );

    store.subscribe(function() {
      localStore.setItem('state', store.getState());
    });
  });
