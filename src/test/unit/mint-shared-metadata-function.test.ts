/*-
 *
 * Hedera NFT Utilities
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
import { mintSharedMetadataFunction } from '../../functions/mint-shared-metadata-function';
import { mintToken } from '../../functions/mint-token';
import { Client, PrivateKey } from '@hashgraph/sdk';
import { myPrivateKey } from '../__mocks__/consts';
import { dictionary } from '../../utils/constants/dictionary';

jest.mock('../../functions/mint-token', () => ({
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
    const mockClient = {} as Client;
    const mockMetaData = 'meta1';
    const mockTokenId = 'tokenId';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 10;
    const mockBatchSize = 2;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: mockClient,
      metaData: mockMetaData,
      tokenId: mockTokenId,
      supplyKey: mockSupplyKey,
      amount: mockAmount,
      batchSize: mockBatchSize,
    });

    expect(result).toHaveLength(10);
    expect(result).toEqual(expect.arrayContaining([{ content: mockMetaData, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(mockAmount / mockBatchSize));
  });

  it('should handle amount less than batchSize correctly', async () => {
    const mockClient = {} as Client;
    const mockMetaData = 'meta1';
    const mockTokenId = 'tokenId';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 1;
    const mockBatchSize = 2;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: mockClient,
      metaData: mockMetaData,
      tokenId: mockTokenId,
      supplyKey: mockSupplyKey,
      amount: mockAmount,
      batchSize: mockBatchSize,
    });

    expect(result).toEqual(expect.arrayContaining([{ content: mockMetaData, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(mockAmount / mockBatchSize));
  });

  it('should handle batchSize of 1 correctly', async () => {
    const mockClient = {} as Client;
    const mockMetaData = 'meta1';
    const mockTokenId = 'tokenId';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 1;
    const mockBatchSize = 1;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: mockClient,
      metaData: mockMetaData,
      tokenId: mockTokenId,
      supplyKey: mockSupplyKey,
      amount: mockAmount,
      batchSize: mockBatchSize,
    });

    expect(result).toEqual(expect.arrayContaining([{ content: mockMetaData, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(mockAmount / mockBatchSize));
  });

  it('should handle batchSize of 10 correctly', async () => {
    const mockClient = {} as Client;
    const mockMetaData = 'meta1';
    const mockTokenId = 'tokenId';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 10;
    const mockBatchSize = 10;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    const result = await mintSharedMetadataFunction({
      client: mockClient,
      metaData: mockMetaData,
      tokenId: mockTokenId,
      supplyKey: mockSupplyKey,
      amount: mockAmount,
      batchSize: mockBatchSize,
    });
    expect(result).toHaveLength(10);
    expect(result).toEqual(expect.arrayContaining([{ content: mockMetaData, serialNumber: 1 }]));
    expect((mintToken as jest.Mock).mock.calls.length).toBe(Math.ceil(mockAmount / mockBatchSize));
  });

  it('should handle error when batchSize is lower than 1', async () => {
    const mockClient = {} as Client;
    const mockMetaData = 'meta1';
    const mockTokenId = 'tokenId';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 1;
    const mockBatchSize = -1;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });
    await expect(
      mintSharedMetadataFunction({
        client: mockClient,
        metaData: mockMetaData,
        tokenId: mockTokenId,
        supplyKey: mockSupplyKey,
        amount: mockAmount,
        batchSize: mockBatchSize,
      })
    ).rejects.toThrow(dictionary.hederaActions.minBatchSize);
  });

  it('should handle error when batchSize is higher than 10', async () => {
    const mockClient = {} as Client;
    const mockMetaData = 'meta1';
    const mockTokenId = 'tokenId';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 1;
    const mockBatchSize = 11;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });

    await expect(
      mintSharedMetadataFunction({
        client: mockClient,
        metaData: mockMetaData,
        tokenId: mockTokenId,
        supplyKey: mockSupplyKey,
        amount: mockAmount,
        batchSize: mockBatchSize,
      })
    ).rejects.toThrow(dictionary.hederaActions.maxBatchSize);
  });

  it('should handle error when metaData is not passed', async () => {
    const mockClient = {} as Client;
    const mockMetaData = '';
    const mockTokenId = 'tokenId';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 1;
    const mockBatchSize = 10;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });
    await expect(
      mintSharedMetadataFunction({
        client: mockClient,
        metaData: mockMetaData,
        tokenId: mockTokenId,
        supplyKey: mockSupplyKey,
        amount: mockAmount,
        batchSize: mockBatchSize,
      })
    ).rejects.toThrow(dictionary.hederaActions.metadataRequired);
  });

  it('should handle error when tokenId is not passed', async () => {
    const mockClient = {} as Client;
    const mockMetaData = 'meta1';
    const mockTokenId = '';
    const mockSupplyKey = PrivateKey.fromString(myPrivateKey);
    const mockAmount = 1;
    const mockBatchSize = 10;

    (mintToken as jest.Mock).mockResolvedValueOnce({
      serials: Array.from({ length: mockAmount }, (_, i) => ({
        toNumber: () => i + 1,
      })),
    });
    await expect(
      mintSharedMetadataFunction({
        client: mockClient,
        metaData: mockMetaData,
        tokenId: mockTokenId,
        supplyKey: mockSupplyKey,
        amount: mockAmount,
        batchSize: mockBatchSize,
      })
    ).rejects.toThrow(dictionary.hederaActions.tokenIdRequired);
  });
});
