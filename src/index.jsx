import './stylesheets/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import localforage from 'localforage';
import configStore from './store';

const localStore = localforage.createInstance({
  name: 'kanban',
});

function onReset() {
  localStore.clear();
  window.location.reload();
}

localStore
  .getItem('state')
  // If value is null ES6 default params don't work
  .then(value => (value = value || undefined))
  .then(
    value => configStore(value),
    err => {
      console.error(err);
      return configStore(null);
    }
  )
  .then(store => {
    ReactDOM.render(
      <div>
        <Provider store={store}>
          <App onReset={onReset} />
        </Provider>
      </div>,
      document.querySelector('.app')
    );

    store.subscribe(() => localStore.setItem('state', store.getState()));
  });
