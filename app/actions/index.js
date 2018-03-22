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

export const setProfileImageURL = (profileImageURL) => {
  return {
    type: types.SET_PROFILE_IMAGE_URL,
    profileImageURL,
  };
};

export const setProfileLinkColor = (profileLinkColor) => {
  return {
    type: types.SET_PROFILE_LINK_COLOR,
    profileLinkColor,
  };
};

export const updateWeightedStatus = (weightedStatus) => {
  return {
    type: types.UPDATE_WEIGHTED_STATUS,
    weightedStatus,
  };
};

export const setStatusImage = (statusImage) => {
  return {
    type: types.SET_STATUS_IMAGE,
    statusImage,
  };
};

export const toggleLaunchOnStartUp = (launchOnStartUp) => {
  return {
    type: types.TOGGLE_LAUNCH_ON_START_UP,
    launchOnStartUp,
  };
};

export const toggleTheme = (theme) => {
  return {
    type: types.TOGGLE_THEME,
    theme,
  };
};

export const onLogout = () => {
  return {
    type: types.ON_LOGOUT,
  };
};
