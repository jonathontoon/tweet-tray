import { UPDATE_REQUEST_TOKEN_PAIR, } from '../actions/actionTypes';

const requestTokenPair = (state = null, action) => {
  switch (action.type) {
    case UPDATE_REQUEST_TOKEN_PAIR:
      return action.requestTokenPair;
    default:
      return state;
  }
};

export default requestTokenPair;
