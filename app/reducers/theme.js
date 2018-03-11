import { TOGGLE_THEME, } from '../actions/actionTypes';

const theme = (state = 'day', action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return action.theme;
    default:
      return state;
  }
};

export default theme;
