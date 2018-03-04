import { SET_PROFILE_LINK_COLOR, } from '../actions/actionTypes';

const profileLinkColor = (state = '#1da1f2', action) => {
  switch (action.type) {
    case SET_PROFILE_LINK_COLOR:
      return action.profileLinkColor;
    default:
      return state;
  }
};

export default profileLinkColor;
