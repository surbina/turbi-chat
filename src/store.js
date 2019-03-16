import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger } from 'redux-logger';
// eslint-disable-next-line import/no-extraneous-dependencies
import freeze from 'redux-freeze';
import firebase from './firebase';
import { reducer as login } from './login';
import { reducer as chat } from './chat';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  thunk.withExtraArgument({ firebase }),
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({
    level: 'info',
    collapsed: true,
  }));

  middlewares.push(freeze);
}

export default function storeFactory() {
  return createStore(
    combineReducers({
      login,
      chat,
    }),
    composeEnhancers(applyMiddleware(...middlewares)),
  );
}
