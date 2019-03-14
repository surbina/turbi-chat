import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import freeze from 'redux-freeze';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({
    level: 'info',
    collapsed: true,
  }));

  middlewares.push(freeze);
}

export default function storeFactory() {
  return createStore(
    () => ({}),
    null,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
}
