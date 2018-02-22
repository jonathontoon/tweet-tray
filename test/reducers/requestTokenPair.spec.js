import requestTokenPair from '../../app/reducers/requestTokenPair';
import { UPDATE_REQUEST_TOKEN_PAIR, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('reducers', () => {
  describe('requestTokenPair', () => {
    it('should handle initial state', () => {
      expect(requestTokenPair(null, {})).toMatchSnapshot();
    });

    it('should handle UPDATE_REQUEST_TOKEN_PAIR', () => {
      expect(requestTokenPair(testData.requestTokenPair, {
        type: UPDATE_REQUEST_TOKEN_PAIR,
      })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(requestTokenPair(testData.requestTokenPair, { type: 'unknown', })).toMatchSnapshot();
    });
  });
});
