import { SET_USER_CREDENTIALS, } from '../actions/actionTypes';

const userCredentials = (state = null, action) => {
  switch (action.type) {
    case SET_USER_CREDENTIALS:
      return action.userCredentials;
    default:
      return state;
  }
};

export default userCredentials;
