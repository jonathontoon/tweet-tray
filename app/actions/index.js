export const UPDATE_ACCESS_TOKEN_PAIR = 'UPDATE_ACCESS_TOKEN_PAIR';
export const UPDATE_REQUEST_TOKEN_PAIR = 'UPDATE_REQUEST_TOKEN_PAIR';

export const SET_USER_CREDENTIALS = 'SET_USER_CREDENTIALS';
export const UPDATE_WEIGHTED_STATUS = 'UPDATE_WEIGHTED_STATUS';
export const TOGGLE_SETTINGS_VISIBILITY = 'TOGGLE_SETTINGS_VISIBILITY';
export const TOGGLE_COLOR_THEME = 'TOGGLE_COLOR_THEME';

export const ON_LOGOUT = 'ON_LOGOUT';

export const updateAccessTokenPair = (accessTokenPair) => {
  return {
    type: UPDATE_ACCESS_TOKEN_PAIR,
    accessTokenPair,
  };
};

export const updateRequestTokenPair = (requestTokenPair) => {
  return {
    type: UPDATE_REQUEST_TOKEN_PAIR,
    requestTokenPair,
  };
};

export const setUserCredentials = (userCredentials) => {
  return {
    type: SET_USER_CREDENTIALS,
    userCredentials,
  };
};

export const updateWeightedStatus = (weightedStatus) => {
  return {
    type: UPDATE_WEIGHTED_STATUS,
    weightedStatus,
  };
};

export const toggleSettingsVisibility = (settingsVisibility) => {
  return {
    type: TOGGLE_SETTINGS_VISIBILITY,
    settingsVisibility,
  };
};

export const toggleColorTheme = (colorTheme) => {
  return {
    type: TOGGLE_COLOR_THEME,
    colorTheme,
  };
};

export const onLogout = () => {
  return {
    type: ON_LOGOUT,
  };
};
