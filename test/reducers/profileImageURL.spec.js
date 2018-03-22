import profileImageURL from '../../app/reducers/profileImageURL';
import { SET_PROFILE_IMAGE_URL, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('profileImageURL reducer', () => {
  it('should handle initial state', () => {
    expect(profileImageURL(undefined, {})).toEqual(null);
  });

  it('should handle SET_PROFILE_IMAGE_URL', () => {
    expect(profileImageURL(undefined, {
      profileImageURL: testData.setProfileImage,
      type: SET_PROFILE_IMAGE_URL,
    })).toEqual(testData.setProfileImage);
  });
});
