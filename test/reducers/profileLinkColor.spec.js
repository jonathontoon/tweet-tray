import profileLinkColor from '../../app/reducers/profileLinkColor';
import { SET_PROFILE_LINK_COLOR, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('profileLinkColor reducer', () => {
  it('should handle initial state', () => {
    expect(profileLinkColor(undefined, {})).toEqual('#1da1f2');
  });

  it('should handle SET_PROFILE_LINK_COLOR', () => {
    expect(profileLinkColor(undefined, {
      profileLinkColor: testData.profileLinkColor,
      type: SET_PROFILE_LINK_COLOR,
    })).toEqual('#1da1f2');
  });
});
