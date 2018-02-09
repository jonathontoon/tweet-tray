import * as types from './actionTypes';

export const updateAccessTokenPair = (accessTokenPair) => {
  return {
    type: types.UPDATE_ACCESS_TOKEN_PAIR,
    accessTokenPair,
  };
};

export const updateRequestTokenPair = (requestTokenPair) => {
  return {
    type: types.UPDATE_REQUEST_TOKEN_PAIR,
    requestTokenPair,
  };
};

export const setUserCredentials = (userCredentials) => {
  return {
    type: types.SET_USER_CREDENTIALS,
    userCredentials,
  };
};

export const updateWeightedStatus = (weightedStatus) => {
  return {
    type: types.UPDATE_WEIGHTED_STATUS,
    weightedStatus,
  };
};

export const toggleSettingsVisibility = (settingsVisibility) => {
  return {
    type: types.TOGGLE_SETTINGS_VISIBILITY,
    settingsVisibility,
  };
};

export const toggleColorTheme = (colorTheme) => {
  return {
    type: types.TOGGLE_COLOR_THEME,
    colorTheme,
  };
};

export const onLogout = () => {
  return {
    type: types.ON_LOGOUT,
  };
};
