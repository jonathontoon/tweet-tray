import requestTokenPair from '../../app/reducers/requestTokenPair';
import { UPDATE_REQUEST_TOKEN_PAIR, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('requestTokenPair reducer', () => {
  it('should handle initial state', () => {
    expect(requestTokenPair(undefined, {})).toEqual(null);
  });

  it('should handle UPDATE_REQUEST_TOKEN_PAIR', () => {
    expect(requestTokenPair(undefined, {
      requestTokenPair: testData.requestTokenPair,
      type: UPDATE_REQUEST_TOKEN_PAIR,
    })).toEqual({
      secret: 'YopgcfgT8xSGS4HaP3V71l3eFyFUY4NI',
      token: '2XvdJwMMMMMM31rrSSSUOPXn4wHA',
    });
  });
});
