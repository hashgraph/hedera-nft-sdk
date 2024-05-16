import axios from 'axios';
import { dictionary } from '../../utils/constants/dictionary';
import { MOCK_SERIAL, MOCK_TOKEN_ID, NETWORK } from '../__mocks__/consts';
import { getHolderAndDuration } from '../../get-holder-and-duration';
jest.mock('axios');
describe('getHolderAndDuration', () => {
  let mockAxios;
  beforeEach(() => {
    mockAxios = axios;
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
    const result = await getHolderAndDuration({
      tokenId: MOCK_TOKEN_ID,
      serialNumber: MOCK_SERIAL,
      network: NETWORK
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
    await expect(getHolderAndDuration({
      tokenId: MOCK_TOKEN_ID,
      serialNumber: MOCK_SERIAL,
      network: NETWORK
    })).rejects.toThrow(dictionary.errors.nftDeleted);
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
    await expect(getHolderAndDuration({
      tokenId: MOCK_TOKEN_ID,
      serialNumber: MOCK_SERIAL,
      network: NETWORK
    })).rejects.toThrow(dictionary.errors.nftNoTransactions);
  });
});
//# sourceMappingURL=get-holder-and-duration.test.js.map