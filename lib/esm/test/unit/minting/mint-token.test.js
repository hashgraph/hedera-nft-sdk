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
import { mintToken } from '../../../nftSDKFunctions/mint-token';
import { Status } from '@hashgraph/sdk';
import { myPrivateKey } from '../../__mocks__/consts';
import { dictionary } from '../../../utils/constants/dictionary';
jest.mock('@hashgraph/sdk', () => {
  const mockedSDK = jest.requireActual('@hashgraph/sdk'); // Import rzeczywistej implementacji SDK

  return {
    ...mockedSDK,
    Client: jest.fn().mockImplementation(() => ({
      forName: jest.fn().mockReturnThis(),
      forLocalNode: jest.fn().mockReturnThis(),
      forNetwork: jest.fn().mockReturnThis(),
      setMirrorNetwork: jest.fn().mockReturnThis(),
      setOperator: jest.fn().mockReturnThis()
    })),
    PrivateKey: {
      ...mockedSDK.PrivateKey,
      fromString: jest.fn().mockImplementation(() => mockedSDK.PrivateKey.generateED25519()),
      fromStringED25519: jest.fn().mockImplementation(() => mockedSDK.PrivateKey.generateED25519()),
      fromStringECDSA: jest.fn().mockImplementation(() => mockedSDK.PrivateKey.generateED25519()),
      generateED25519: jest.fn(() => ({
        toString: () => 'fake-private-key-ed25519'
      }))
    },
    TokenMintTransaction: jest.fn(() => ({
      setTokenId: jest.fn().mockReturnThis(),
      setMaxTransactionFee: jest.fn().mockReturnThis(),
      setMetadata: jest.fn().mockReturnThis(),
      freezeWith: jest.fn().mockReturnThis(),
      sign: jest.fn().mockResolvedValue({
        execute: jest.fn().mockResolvedValue({
          getReceipt: jest.fn().mockResolvedValue({
            status: mockedSDK.Status.Success
          })
        })
      })
    }))
  };
});
describe('mintToken', () => {
  it('should return Success status', async () => {
    const mockClient = {};
    const mockMetaData = ['meta1'];
    const mockTokenId = 'tokenId';
    const result = await mintToken(mockMetaData, mockTokenId, myPrivateKey, mockClient);
    expect(result).toEqual({
      status: Status.Success
    });
  });
  it('should return Success status when metadata is 99 characters long', async () => {
    const mockClient = {};
    const mockMetaData = ['a'.repeat(99)]; // 99 characters
    const mockTokenId = 'tokenId';
    const result = await mintToken(mockMetaData, mockTokenId, myPrivateKey, mockClient);
    expect(result).toEqual({
      status: Status.Success
    });
  });
  it('should return Success status when metadata is 100 characters long', async () => {
    const mockClient = {};
    const mockMetaData = ['a'.repeat(100)]; // 100 characters
    const mockTokenId = 'tokenId';
    const result = await mintToken(mockMetaData, mockTokenId, myPrivateKey, mockClient);
    expect(result).toEqual({
      status: Status.Success
    });
  });
  it('should throw error when metadata is 101 characters long', async () => {
    const mockClient = {};
    const mockMetaData = ['a'.repeat(101)]; // 101 characters
    const mockTokenId = 'tokenId';
    await expect(mintToken(mockMetaData, mockTokenId, myPrivateKey, mockClient)).rejects.toThrow(dictionary.mintToken.tooLongCID);
  });
});
//# sourceMappingURL=mint-token.test.js.map