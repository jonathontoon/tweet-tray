import { UPDATE_WEIGHTED_STATUS, } from '../actions/actionTypes';

const weightedStatus = (state = null, action) => {
  switch (action.type) {
    case UPDATE_WEIGHTED_STATUS:
      return action.weightedStatus;
    default:
      return state;
  }
};

export default weightedStatus;
