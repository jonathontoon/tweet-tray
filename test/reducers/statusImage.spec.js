import statusImage from '../../app/reducers/statusImage';
import { SET_STATUS_IMAGE, } from '../../app/actions/actionTypes';
import * as testData from '../testData';

describe('statusImage reducer', () => {
  it('should handle initial state', () => {
    expect(statusImage(undefined, {})).toEqual(null);
  });

  it('should handle SET_STATUS_IMAGE', () => {
    expect(statusImage(undefined, {
      statusImage: testData.statusImage,
      type: SET_STATUS_IMAGE,
    })).toEqual({
      data: 'R0lGODlh3AEMAfcAMQD/AAgGAggJBgsIBQsLBwwKBg0MCA4JAw4KBw4LBw4NCQ8NDg8PCRAOCREPDhIJBRINCBIOCBIRDxISDxISIhMPCRMPDBMQDxMSExMUKRQRChQRGxUOChUODRUSFxYOBxYPCBYTDxcMBxcQDhgKBhgRFBgVFBgZLBkGAxkRCBkSDRkWFBkcNRoT…',
      extension: '.gif',
      path: 'C:\\Users\\toon\\Downloads\\giphy.gif',
      size: 3.069171905517578,
    });
  });
});
