import weightedStatus from '../../app/reducers/weightedStatus';
import { UPDATE_WEIGHTED_STATUS, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('reducers', () => {
  describe('weightedStatus', () => {
    it('should handle initial state', () => {
      expect(weightedStatus(null, {})).toMatchSnapshot();
    });

    it('should handle UPDATE_WEIGHTED_STATUS', () => {
      expect(weightedStatus(testData.weightedStatus, {
        type: UPDATE_WEIGHTED_STATUS,
      })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(weightedStatus(testData.weightedStatus, { type: 'unknown', })).toMatchSnapshot();
    });
  });
});
