import { createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { createBrowserHistory, } from 'history';
import { routerMiddleware, } from 'react-router-redux';
import rootReducer from '../reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = compose(
  applyMiddleware(thunk, router),
  persistState(['accessTokenPair', 'userCredentials', 'colorTheme', ])
);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history, };
