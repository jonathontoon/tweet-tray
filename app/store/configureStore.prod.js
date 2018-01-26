import { createStore, applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { createBrowserHistory, } from 'history';
import { routerMiddleware, } from 'react-router-redux';
import rootReducer from '../reducers';

const history = createBrowserHistory();
const router = routerMiddleware(history);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose([
    applyMiddleware(thunk, router),
    persistState(['accessTokenPair', 'userCredentials', 'colorTheme', ]),
  ]));
}

export default { configureStore, history, };
