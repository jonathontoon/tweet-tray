import { TOGGLE_LAUNCH_ON_START_UP, } from '../actions/actionTypes';

const launchOnStartUp = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_LAUNCH_ON_START_UP:
      return action.launchOnStartUp;
    default:
      return state;
  }
};

export default launchOnStartUp;
