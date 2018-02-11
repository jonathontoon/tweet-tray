import { TOGGLE_SETTINGS_VISIBILITY, } from '../actions/actionTypes';

const settingsVisibility = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_VISIBILITY:
      return action.settingsVisibility;
    default:
      return state;
  }
};

export default settingsVisibility;
