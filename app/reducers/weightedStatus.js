import { UPDATE_WEIGHTED_STATUS, } from '../actions/actionTypes';

const weightedStatus = (state = {
  text: '',
  weightedLength: 0,
  permillage: 0,
  valid: true,
  displayRangeStart: 0,
  displayRangeEnd: 0,
  validDisplayRangeStart: 0,
  validDisplayRangeEnd: 0,
}, action) => {
  switch (action.type) {
    case UPDATE_WEIGHTED_STATUS:
      return action.weightedStatus;
    default:
      return state;
  }
};

export default weightedStatus;
