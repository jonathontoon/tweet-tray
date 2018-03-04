import accessTokenPair from '../../app/reducers/accessTokenPair';
import { UPDATE_ACCESS_TOKEN_PAIR, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('accessTokenPair reducer', () => {
  it('should handle initial state', () => {
    expect(accessTokenPair(undefined, {})).toEqual(null);
  });

  it('should handle UPDATE_ACCESS_TOKEN_PAIR', () => {
    expect(accessTokenPair(undefined, {
      accessTokenPair: testData.accessTokenPair,
      type: UPDATE_ACCESS_TOKEN_PAIR,
    })).toEqual({
      secret: 'TLsqmFkIghY8X5uidkMXRLvIsMKhV1plTxNSwlZeOfYZh',
      token: '954614948138482765-8rODZ0c2pehDd7J28Ko4bwfspTyE19J',
    });
  });
});
