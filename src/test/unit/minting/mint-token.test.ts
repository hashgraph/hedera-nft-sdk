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
import { mintToken } from '../../../nftSDKFunctions/mint-token';
import { Client, PrivateKey, Status } from '@hashgraph/sdk';
import { myPrivateKey } from '../../__mocks__/consts';
import { dictionary } from '../../../utils/constants/dictionary';
import { getPrivateKeyFromString } from '../../../helpers/get-private-key-from-string';

jest.mock('@hashgraph/sdk', () => ({
  Client: jest.fn(),
  Status: {
    Success: 'Success',
  },
  Hbar: jest.fn(),
  PrivateKey: {
    fromString: jest.fn(),
    fromStringED25519: jest.fn().mockReturnThis(),
    fromStringECDSA: jest.fn().mockReturnThis(),
  },
  TokenMintTransaction: jest.fn(() => ({
    setTokenId: jest.fn().mockReturnThis(),
    setMaxTransactionFee: jest.fn().mockReturnThis(),
    setMetadata: jest.fn().mockReturnThis(),
    freezeWith: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue({
      execute: jest.fn().mockResolvedValue({
        getReceipt: jest.fn().mockResolvedValue({
          status: 'Success',
        }),
      }),
    }),
  })),
}));

describe('mintToken', () => {
  it('should return Success status', async () => {
    const mockClient = {} as Client;
    const mockMetaData = ['meta1'];
    const mockTokenId = 'tokenId';
    const mockSupplyKey = getPrivateKeyFromString(myPrivateKey);

    const result = await mintToken(mockMetaData, mockTokenId, mockSupplyKey, mockClient);

    expect(result).toEqual({ status: Status.Success });
  });

  it('should return Success status when metadata is 99 characters long', async () => {
    const mockClient = {} as Client;
    const mockMetaData = ['a'.repeat(99)]; // 99 characters
    const mockTokenId = 'tokenId';
    const mockSupplyKey = getPrivateKeyFromString(myPrivateKey);

    const result = await mintToken(mockMetaData, mockTokenId, mockSupplyKey, mockClient);

    expect(result).toEqual({ status: Status.Success });
  });

  it('should return Success status when metadata is 100 characters long', async () => {
    const mockClient = {} as Client;
    const mockMetaData = ['a'.repeat(100)]; // 100 characters
    const mockTokenId = 'tokenId';
    const mockSupplyKey = getPrivateKeyFromString(myPrivateKey);

    const result = await mintToken(mockMetaData, mockTokenId, mockSupplyKey, mockClient);

    expect(result).toEqual({ status: Status.Success });
  });

  it('should throw error when metadata is 101 characters long', async () => {
    const mockClient = {} as Client;
    const mockMetaData = ['a'.repeat(101)]; // 101 characters
    const mockTokenId = 'tokenId';
    const mockSupplyKey = getPrivateKeyFromString(myPrivateKey);

    await expect(mintToken(mockMetaData, mockTokenId, mockSupplyKey, mockClient)).rejects.toThrow(dictionary.mintToken.tooLongCID);
  });
});
