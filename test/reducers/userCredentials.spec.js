import userCredentials from '../../app/reducers/userCredentials';
import { SET_USER_CREDENTIALS, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('reducers', () => {
  describe('userCredentials', () => {
    it('should handle initial state', () => {
      expect(userCredentials(null, {})).toMatchSnapshot();
    });

    it('should handle SET_USER_CREDENTIALS', () => {
      expect(userCredentials(testData.userCredentials, {
        type: SET_USER_CREDENTIALS,
      })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(userCredentials(testData.userCredentials, { type: 'unknown', })).toMatchSnapshot();
    });
  });
});
