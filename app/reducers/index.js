import { combineReducers, } from 'redux';

import colorTheme from './colorTheme';
import launchOnStartUp from './launchOnStartUp';
import profileImageURL from './profileImageURL';
import weightedStatus from './weightedStatus';
import requestTokenPair from './requestTokenPair';
import accessTokenPair from './accessTokenPair';

import { ON_LOGOUT, } from '../actions/actionTypes';

const appReducer = combineReducers({
  accessTokenPair,
  requestTokenPair,
  profileImageURL,
  weightedStatus,
  launchOnStartUp,
  colorTheme,
});

/* eslint no-param-reassign: 0 */
const rootReducer = (state, action) => {
  if (action.type === ON_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
