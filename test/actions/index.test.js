import * as types from '../../app/actions/actionTypes';
import * as actions from '../../app/actions';

describe('actions', () => {
  it('should create an action to update the access token pair', () => {
    const accessTokenPair = {
      secret: 'TLsqmFkIghY8X5uidkMXRLvIsMKhV1plTxNSwlZeOfYZh',
      token: '954614948138482765-8rODZ0c2pehDd7J28Ko4bwfspTyE19J',
    };
    const expectedAction = {
      type: types.UPDATE_ACCESS_TOKEN_PAIR,
      accessTokenPair,
    };
    expect(actions.updateAccessTokenPair(accessTokenPair)).toEqual(expectedAction);
  });

  it('should create an action to update the request token pair', () => {
    const requestTokenPair = {
      secret: 'YopgcfgT8xSGS4HaP3V71l3eFyFUY4NI',
      token: '2XvdJwMMMMMM31rrSSSUOPXn4wHA',
    };
    const expectedAction = {
      type: types.UPDATE_REQUEST_TOKEN_PAIR,
      requestTokenPair,
    };
    expect(actions.updateRequestTokenPair(requestTokenPair)).toEqual(expectedAction);
  });

  it('should create an action to set the user credentials object', () => {
    const userCredentials = {
      description: 'Internet explorer.',
      geoEnabled: true,
      lang: 'en',
      location: 'Tokyo, Japan',
      name: 'Jonathon Toon',
      profileImageURL: 'https://pbs.twimg.com/profile_images/960374717726130182/AS3TkK0J_normal.jpg',
      screenName: 'jonathontoon',
      timeZone: 'Pacific Time (US & Canada)',
      utcOffset: -28800,
    };
    const expectedAction = {
      type: types.SET_USER_CREDENTIALS,
      userCredentials,
    };
    expect(actions.setUserCredentials(userCredentials)).toEqual(expectedAction);
  });

  it('should create an action to update the weighted status object', () => {
    const weightedStatus = {
      displayRangeEnd: 208,
      displayRangeStart: 0,
      permillage: 746,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non nisl facilisis, imperdiet ipsum sed, pretium metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      valid: true,
      weightedLength: 209,
    };
    const expectedAction = {
      type: types.UPDATE_WEIGHTED_STATUS,
      weightedStatus,
    };
    expect(actions.updateWeightedStatus(weightedStatus)).toEqual(expectedAction);
  });

  it('should create an action to toggle the status of whether settings are shown', () => {
    const settingsVisibility = true;
    const expectedAction = {
      type: types.TOGGLE_SETTINGS_VISIBILITY,
      settingsVisibility,
    };
    expect(actions.toggleSettingsVisibility(settingsVisibility)).toEqual(expectedAction);
  });

  it('should create an action to toggle between night and day mode', () => {
    const colorTheme = 'night';
    const expectedAction = {
      type: types.TOGGLE_COLOR_THEME,
      colorTheme,
    };
    expect(actions.toggleColorTheme(colorTheme)).toEqual(expectedAction);
  });

  it('should create an action to handle the user logging out', () => {
    const expectedAction = {
      type: types.ON_LOGOUT,
    };
    expect(actions.onLogout()).toEqual(expectedAction);
  });
});
