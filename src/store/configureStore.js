import 'babel-polyfill';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import mySaga from '../sagas';

function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
  sagaMiddleware.run(mySaga);
  return store;
}

function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [reduxImmutableStateInvariant(), sagaMiddleware];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
  sagaMiddleware.run(mySaga);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module
      .hot
      .accept('../reducers', () => {
        const nextReducer = require('../reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
  }
  return store;
}

const configureStore = process.env.NODE_ENV === 'production'
  ? configureStoreProd
  : configureStoreDev;

export default configureStore;