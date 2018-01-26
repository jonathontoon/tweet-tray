if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.dev'); // eslint-disable-line global-require
}
// import { createStore, applyMiddleware, compose, } from 'redux';
// import thunk from 'redux-thunk';
// import persistState from 'redux-localstorage';
// import { createBrowserHistory, } from 'history';
// import { routerMiddleware, } from 'react-router-redux';
// import rootReducer from '../reducers';

// const history = createBrowserHistory();
// const router = routerMiddleware(history);
// const enhancer = compose(applyMiddleware(thunk, router), persistState(['accessTokenPair', 'userCredentials', 'colorTheme', ]), );

// function configureStore(initialState) {
//   return createStore(rootReducer, initialState, enhancer);
// }

// export default { configureStore, history, };
