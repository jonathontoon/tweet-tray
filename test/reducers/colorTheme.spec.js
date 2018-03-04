import colorTheme from '../../app/reducers/colorTheme';
import { TOGGLE_COLOR_THEME, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('colorTheme reducer', () => {
  it('should handle initial state', () => {
    expect(colorTheme(undefined, {})).toEqual('day');
  });

  it('should handle TOGGLE_COLOR_THEME', () => {
    expect(colorTheme(undefined, {
      colorTheme: testData.colorTheme,
      type: TOGGLE_COLOR_THEME,
    })).toEqual('night');
  });
});
