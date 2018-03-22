import * as types from '../../app/actions/actionTypes';
import * as actions from '../../app/actions';
import * as testData from '../testData';

describe('actions', () => {
  it('should create an action to update the access token pair', () => {
    const expectedAction = {
      type: types.UPDATE_ACCESS_TOKEN_PAIR,
      accessTokenPair: testData.accessTokenPair,
    };
    expect(actions.updateAccessTokenPair(testData.accessTokenPair)).toEqual(expectedAction);
  });

  it('should create an action to update the request token pair', () => {
    const expectedAction = {
      type: types.UPDATE_REQUEST_TOKEN_PAIR,
      requestTokenPair: testData.requestTokenPair,
    };
    expect(actions.updateRequestTokenPair(testData.requestTokenPair)).toEqual(expectedAction);
  });

  it('should create an action to set the profile image url', () => {
    const expectedAction = {
      type: types.SET_PROFILE_IMAGE_URL,
      profileImageURL: testData.profileImageURL,
    };
    expect(actions.setProfileImageURL(testData.profileImageURL)).toEqual(expectedAction);
  });

  it('should create an action to set the profile link color', () => {
    const expectedAction = {
      type: types.SET_PROFILE_LINK_COLOR,
      profileLinkColor: testData.profileLinkColor,
    };
    expect(actions.setProfileLinkColor(testData.profileLinkColor)).toEqual(expectedAction);
  });

  it('should create an action to update the weighted status object', () => {
    const expectedAction = {
      type: types.UPDATE_WEIGHTED_STATUS,
      weightedStatus: testData.weightedStatus,
    };
    expect(actions.updateWeightedStatus(testData.weightedStatus)).toEqual(expectedAction);
  });

  it('should create an action to update the status image object', () => {
    const expectedAction = {
      type: types.SET_STATUS_IMAGE,
      statusImage: testData.statusImage,
    };
    expect(actions.setStatusImage(testData.statusImage)).toEqual(expectedAction);
  });

  it('should create an action to toggle whether the app launchs on system start', () => {
    const expectedAction = {
      type: types.TOGGLE_LAUNCH_ON_START_UP,
      launchOnStartUp: testData.launchOnStartUp,
    };
    expect(actions.toggleLaunchOnStartUp(testData.launchOnStartUp)).toEqual(expectedAction);
  });

  it('should create an action to toggle between night and day mode', () => {
    const expectedAction = {
      type: types.TOGGLE_THEME,
      theme: testData.theme,
    };
    expect(actions.toggleTheme(testData.theme)).toEqual(expectedAction);
  });

  it('should create an action to handle the user logging out', () => {
    const expectedAction = {
      type: types.ON_LOGOUT,
    };
    expect(actions.onLogout()).toEqual(expectedAction);
  });
});
