import accessTokenPair from '../../app/reducers/accessTokenPair';
import { UPDATE_ACCESS_TOKEN_PAIR, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('reducers', () => {
  describe('accessTokenPair', () => {
    it('should handle initial state', () => {
      expect(accessTokenPair(null, {})).toMatchSnapshot();
    });

    it('should handle UPDATE_ACCESS_TOKEN_PAIR', () => {
      expect(accessTokenPair(testData.accessTokenPair, {
        type: UPDATE_ACCESS_TOKEN_PAIR,
      })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(accessTokenPair(testData.accessTokenPair, { type: 'unknown', })).toMatchSnapshot();
    });
  });
});
