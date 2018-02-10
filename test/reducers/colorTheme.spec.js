import colorTheme from '../../app/reducers/colorTheme';
import { TOGGLE_COLOR_THEME, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('reducers', () => {
  describe('toggleColorTheme', () => {

    it('should handle initial state', () => {
      expect(colorTheme(null, {})).toMatchSnapshot();
    });

    it('should handle TOGGLE_COLOR_THEME', () => {
      expect(colorTheme(testData.colorTheme, {
        type: TOGGLE_COLOR_THEME,
      })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(colorTheme(testData.colorTheme, { type: 'unknown', })).toMatchSnapshot();
    });
  });
});
