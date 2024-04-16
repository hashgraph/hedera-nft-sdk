/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { mintSharedMetadataFunction } from '../../../nftSDKFunctions/mint-shared-metadata-function';
import { mintToken } from '../../../nftSDKFunctions/mint-token';
import { MOCK_CLIENT, MOCK_META_DATA, MOCK_TOKEN_ID, MOCK_SUPPLY_KEY } from '../../__mocks__/consts';
import { dictionary } from '../../../utils/constants/dictionary';

jest.mock('../../../nftSDKFunctions/mint-token', () => ({
  mintToken: jest.fn((amount) => {
    return Promise.resolve({
      serials: Array.from({ length: amount }, (_, i) => i + 1),
    });
  }),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe('mintSharedMetadataFunction', () => {
  it('should return correct metadata', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 10 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: MOCK_CLIENT,
      metaData: MOCK_META_DATA,
      tokenId: MOCK_TOKEN_ID,
      supplyKey: MOCK_SUPPLY_KEY,
      amount: 10,
      batchSize: 2,
    });

    expect(result).toHaveLength(10);
    expect(result).toEqual(expect.arrayContaining([{ content: MOCK_META_DATA, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(10 / 2));
  });

  it('should handle amount less than batchSize correctly', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 1 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: MOCK_CLIENT,
      metaData: MOCK_META_DATA,
      tokenId: MOCK_TOKEN_ID,
      supplyKey: MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: 2,
    });

    expect(result).toEqual(expect.arrayContaining([{ content: MOCK_META_DATA, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(1 / 2));
  });

  it('should handle batchSize of 1 correctly', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 1 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: MOCK_CLIENT,
      metaData: MOCK_META_DATA,
      tokenId: MOCK_TOKEN_ID,
      supplyKey: MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: 1,
    });

    expect(result).toEqual(expect.arrayContaining([{ content: MOCK_META_DATA, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(1 / 1));
  });

  it('should handle batchSize of 10 correctly', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 10 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: MOCK_CLIENT,
      metaData: MOCK_META_DATA,
      tokenId: MOCK_TOKEN_ID,
      supplyKey: MOCK_SUPPLY_KEY,
      amount: 10,
      batchSize: 10,
    });
    expect(result).toHaveLength(10);
    expect(result).toEqual(expect.arrayContaining([{ content: MOCK_META_DATA, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(10 / 10));
  });

  it('should handle error when batchSize is lower than 1', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 1 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });
    await expect(
      mintSharedMetadataFunction({
        client: MOCK_CLIENT,
        metaData: MOCK_META_DATA,
        tokenId: MOCK_TOKEN_ID,
        supplyKey: MOCK_SUPPLY_KEY,
        amount: 1,
        batchSize: -1,
      })
    ).rejects.toThrow(dictionary.hederaActions.minBatchSize);
  });

  it('should handle error when batchSize is higher than 10', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 1 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    await expect(
      mintSharedMetadataFunction({
        client: MOCK_CLIENT,
        metaData: MOCK_META_DATA,
        tokenId: MOCK_TOKEN_ID,
        supplyKey: MOCK_SUPPLY_KEY,
        amount: 1,
        batchSize: 11,
      })
    ).rejects.toThrow(dictionary.hederaActions.maxBatchSize);
  });

  it('should handle error when metaData is not passed', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 1 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });
    await expect(
      mintSharedMetadataFunction({
        client: MOCK_CLIENT,
        metaData: '',
        tokenId: MOCK_TOKEN_ID,
        supplyKey: MOCK_SUPPLY_KEY,
        amount: 1,
        batchSize: 10,
      })
    ).rejects.toThrow(dictionary.hederaActions.metadataRequired);
  });

  it('should handle error when tokenId is not passed', async () => {
    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: 1 }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });
    await expect(
      mintSharedMetadataFunction({
        client: MOCK_CLIENT,
        metaData: MOCK_META_DATA,
        tokenId: '',
        supplyKey: MOCK_SUPPLY_KEY,
        amount: 1,
        batchSize: 10,
      })
    ).rejects.toThrow(dictionary.hederaActions.cannotParseTokenId);
  });
});
