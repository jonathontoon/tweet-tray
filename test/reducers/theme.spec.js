import theme from '../../app/reducers/theme';
import { TOGGLE_THEME, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('theme reducer', () => {
  it('should handle initial state', () => {
    expect(theme(undefined, {})).toEqual('day');
  });

  it('should handle TOGGLE_THEME', () => {
    expect(theme(undefined, {
      theme: testData.theme,
      type: TOGGLE_THEME,
    })).toEqual('night');
  });
});
