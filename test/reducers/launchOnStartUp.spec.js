import launchOnStartUp from '../../app/reducers/launchOnStartUp';
import { TOGGLE_LAUNCH_ON_START_UP, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('reducers', () => {
  describe('launchOnStartUp', () => {
    it('should handle initial state', () => {
      expect(launchOnStartUp(null, {})).toMatchSnapshot();
    });

    it('should handle TOGGLE_LAUNCH_ON_START_UP', () => {
      expect(launchOnStartUp(testData.launchOnStartUp, {
        type: TOGGLE_LAUNCH_ON_START_UP,
      })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(launchOnStartUp(testData.launchOnStartUp, { type: 'unknown', })).toMatchSnapshot();
    });
  });
});
