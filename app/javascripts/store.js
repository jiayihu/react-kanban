import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const logger = (Store) => (next) => (action) => {
  const console = window.console;
  const prevState = Store.getState();
  const returnValue = next(action);
  const nextState = Store.getState();

  console.log('%c prev state', 'color: #9E9E9E', prevState);
  console.log('%c action', 'color: #03A9F4', action);
  console.log('%c next state', 'color: #4CAF50', nextState);

  return returnValue;
};

const reduxDebug = window.devToolsExtension ? window.devToolsExtension : (f) => f;

export default (initialState = {}) => createStore(
  rootReducer,
  initialState,
  reduxDebug(applyMiddleware(logger))
);
