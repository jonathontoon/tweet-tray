import { UPDATE_ACCESS_TOKEN_PAIR, } from '../actions/actionTypes';

const accessTokenPair = (state = null, action) => {
  switch (action.type) {
    case UPDATE_ACCESS_TOKEN_PAIR:
      return action.accessTokenPair;
    default:
      return state;
  }
};

export default accessTokenPair;
