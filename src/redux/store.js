// @flow

import { createStore, compose } from 'redux';
import rootReducer from './reducers/';

import type { State } from './reducers/index';

export default function configStore(initialState?: State) {
  return createStore(
    rootReducer,
    initialState,
    compose(window.devToolsExtension ? window.devToolsExtension() : f => f),
  );
}
