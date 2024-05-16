"use strict";

var _axios = _interopRequireDefault(require("axios"));
var _dictionary = require("../../utils/constants/dictionary");
var _consts = require("../__mocks__/consts");
var _getHolderAndDuration = require("../../get-holder-and-duration");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
jest.mock('axios');
describe('getHolderAndDuration', () => {
  let mockAxios;
  beforeEach(() => {
    mockAxios = _axios.default;
  });
  it('should return holder and duration', async () => {
    const mockNFTDetails = {
      deleted: false
    };
    const mockTransactions = {
      transactions: [{
        type: 'CRYPTOTRANSFER',
        receiver_account_id: 'mockReceiverAccountId',
        consensus_timestamp: '1695821531.685486177'
      }],
      links: {
        next: null
      }
    };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: mockNFTDetails
    }));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: mockTransactions
    }));
    const result = await (0, _getHolderAndDuration.getHolderAndDuration)({
      tokenId: _consts.MOCK_TOKEN_ID,
      serialNumber: _consts.MOCK_SERIAL,
      network: _consts.NETWORK
    });
    expect(result).toEqual({
      holder: 'mockReceiverAccountId',
      holderSince: expect.any(String)
    });
  });
  it('should throw an error when the NFT has been deleted', async () => {
    const mockNFTDetails = {
      deleted: true
    };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: mockNFTDetails
    }));
    await expect((0, _getHolderAndDuration.getHolderAndDuration)({
      tokenId: _consts.MOCK_TOKEN_ID,
      serialNumber: _consts.MOCK_SERIAL,
      network: _consts.NETWORK
    })).rejects.toThrow(_dictionary.dictionary.errors.nftDeleted);
  });
  it('should throw an error when there are no transactions for the NFT', async () => {
    const mockNFTDetails = {
      deleted: false
    };
    const mockTransactions = {
      transactions: [],
      links: {
        next: null
      }
    };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: mockNFTDetails
    }));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: mockTransactions
    }));
    await expect((0, _getHolderAndDuration.getHolderAndDuration)({
      tokenId: _consts.MOCK_TOKEN_ID,
      serialNumber: _consts.MOCK_SERIAL,
      network: _consts.NETWORK
    })).rejects.toThrow(_dictionary.dictionary.errors.nftNoTransactions);
  });
});
//# sourceMappingURL=get-holder-and-duration.test.js.map