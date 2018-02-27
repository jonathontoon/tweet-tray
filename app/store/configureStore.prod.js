import { createStore, applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { createHashHistory, } from 'history';
import { routerMiddleware, } from 'react-router-redux';
import rootReducer from '../reducers';

const history = createHashHistory();

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);


  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  enhancers.push(persistState(['accessTokenPair', 'userCredentials', 'colorTheme', 'launchOnStartUp', ]));
  const enhancer = compose(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')); // eslint-disable-line global-require
    });
  }

  return store;
};

export default { configureStore, history, };
