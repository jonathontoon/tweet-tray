import { combineReducers, } from 'redux';

import colorTheme from './colorTheme';
import settingsVisibility from './settingsVisibility';
import userCredentials from './userCredentials';
import weightedStatus from './weightedStatus';
import requestTokenPair from './requestTokenPair';
import accessTokenPair from './accessTokenPair';

import { ON_LOGOUT, } from '../actions/actionTypes';

const appReducer = combineReducers({
  accessTokenPair,
  requestTokenPair,
  userCredentials,
  weightedStatus,
  settingsVisibility,
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
