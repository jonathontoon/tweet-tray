import { SET_PROFILE_IMAGE_URL, } from '../actions/actionTypes';

const profileImageURL = (state = null, action) => {
  switch (action.type) {
    case SET_PROFILE_IMAGE_URL:
      return action.profileImageURL;
    default:
      return state;
  }
};

export default profileImageURL;
