import { combineReducers, } from 'redux';
import { routerReducer as router, } from 'react-router-redux';

import colorTheme from './colorTheme';
import settingsVisibility from './settingsVisibility';
import userCredentials from './userCredentials';
import weightedStatus from './weightedStatus';
import requestTokenPair from './requestTokenPair';
import accessTokenPair from './accessTokenPair';

const rootReducer = combineReducers({
  colorTheme,
  settingsVisibility,
  userCredentials,
  weightedStatus,
  requestTokenPair,
  accessTokenPair,
  router,
});

export default rootReducer;
