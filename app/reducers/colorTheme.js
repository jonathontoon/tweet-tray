import { TOGGLE_COLOR_THEME, } from '../actions/actionTypes';

const colorTheme = (state = 'day', action) => {
  switch (action.type) {
    case TOGGLE_COLOR_THEME:
      return action.colorTheme;
    default:
      return state;
  }
};

export default colorTheme;
