import settingsVisibility from '../../app/reducers/settingsVisibility';
import { TOGGLE_SETTINGS_VISIBILITY, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('reducers', () => {
  describe('settingsVisibility', () => {
    it('should handle initial state', () => {
      expect(settingsVisibility(null, {})).toMatchSnapshot();
    });

    it('should handle TOGGLE_SETTINGS_VISIBILITY', () => {
      expect(settingsVisibility(testData.settingsVisibility, {
        type: TOGGLE_SETTINGS_VISIBILITY,
      })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(settingsVisibility(testData.settingsVisibility, { type: 'unknown', })).toMatchSnapshot();
    });
  });
});
