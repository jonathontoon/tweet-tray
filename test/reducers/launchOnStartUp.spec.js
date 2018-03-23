import launchOnStartUp from '../../app/reducers/launchOnStartUp';
import { TOGGLE_LAUNCH_ON_START_UP, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('launchOnStartUp reducer', () => {
  it('should handle initial state', () => {
    expect(launchOnStartUp(undefined, {})).toEqual(false);
  });

  it('should handle TOGGLE_LAUNCH_ON_START_UP', () => {
    expect(launchOnStartUp(undefined, {
      launchOnStartUp: testData.launchOnStartUp,
      type: TOGGLE_LAUNCH_ON_START_UP,
    })).toEqual(true);
  });
});
