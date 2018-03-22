import { SET_STATUS_IMAGE, } from '../actions/actionTypes';

const statusImage = (state = null, action) => {
  switch (action.type) {
    case SET_STATUS_IMAGE:
      return action.statusImage;
    default:
      return state;
  }
};

export default statusImage;
