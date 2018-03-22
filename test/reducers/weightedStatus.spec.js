import weightedStatus from '../../app/reducers/weightedStatus';
import { UPDATE_WEIGHTED_STATUS, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('weightedStatus reducer', () => {
  it('should handle initial state', () => {
    expect(weightedStatus(undefined, {})).toEqual({
      text: '',
      weightedLength: 0,
      permillage: 0,
      valid: true,
      displayRangeStart: 0,
      displayRangeEnd: 0,
      validDisplayRangeStart: 0,
      validDisplayRangeEnd: 0,
    });
  });

  it('should handle UPDATE_WEIGHTED_STATUS', () => {
    expect(weightedStatus(undefined, {
      weightedStatus: testData.weightedStatus,
      type: UPDATE_WEIGHTED_STATUS,
    })).toEqual({
      displayRangeEnd: 208,
      displayRangeStart: 0,
      permillage: 746,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non nisl facilisis, imperdiet ipsum sed, pretium metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      valid: true,
      weightedLength: 209,
    });
  });
});
