"use strict";

var _mintSharedMetadataFunction = require("../../../nftSDKFunctions/mint-shared-metadata-function");
var _mintToken = require("../../../nftSDKFunctions/mint-token");
var _consts = require("../../__mocks__/consts");
var _dictionary = require("../../../utils/constants/dictionary");
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

jest.mock('../../../nftSDKFunctions/mint-token', () => ({
  mintToken: jest.fn(amount => {
    return Promise.resolve({
      serials: Array.from({
        length: amount
      }, (_, i) => i + 1)
    });
  })
}));
beforeEach(() => {
  jest.resetAllMocks();
});
describe('mintSharedMetadataFunction', () => {
  it('should return correct metadata', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 10
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    const result = await (0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: _consts.MOCK_META_DATA,
      tokenId: _consts.MOCK_TOKEN_ID,
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 10,
      batchSize: 2
    });
    expect(result).toHaveLength(10);
    expect(result).toEqual(expect.arrayContaining([{
      content: _consts.MOCK_META_DATA,
      serialNumber: 1
    }]));
    expect(_mintToken.mintToken.mock.calls.length).toBe(Math.ceil(10 / 2));
  });
  it('should handle amount less than batchSize correctly', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 1
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    const result = await (0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: _consts.MOCK_META_DATA,
      tokenId: _consts.MOCK_TOKEN_ID,
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: 2
    });
    expect(result).toEqual(expect.arrayContaining([{
      content: _consts.MOCK_META_DATA,
      serialNumber: 1
    }]));
    expect(_mintToken.mintToken.mock.calls.length).toBe(Math.ceil(1 / 2));
  });
  it('should handle batchSize of 1 correctly', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 1
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    const result = await (0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: _consts.MOCK_META_DATA,
      tokenId: _consts.MOCK_TOKEN_ID,
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: 1
    });
    expect(result).toEqual(expect.arrayContaining([{
      content: _consts.MOCK_META_DATA,
      serialNumber: 1
    }]));
    expect(_mintToken.mintToken.mock.calls.length).toBe(Math.ceil(1 / 1));
  });
  it('should handle batchSize of 10 correctly', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 10
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    const result = await (0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: _consts.MOCK_META_DATA,
      tokenId: _consts.MOCK_TOKEN_ID,
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 10,
      batchSize: 10
    });
    expect(result).toHaveLength(10);
    expect(result).toEqual(expect.arrayContaining([{
      content: _consts.MOCK_META_DATA,
      serialNumber: 1
    }]));
    expect(_mintToken.mintToken.mock.calls.length).toBe(Math.ceil(10 / 10));
  });
  it('should handle error when batchSize is lower than 1', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 1
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    await expect((0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: _consts.MOCK_META_DATA,
      tokenId: _consts.MOCK_TOKEN_ID,
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: -1
    })).rejects.toThrow(_dictionary.dictionary.hederaActions.minBatchSize);
  });
  it('should handle error when batchSize is higher than 10', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 1
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    await expect((0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: _consts.MOCK_META_DATA,
      tokenId: _consts.MOCK_TOKEN_ID,
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: 11
    })).rejects.toThrow(_dictionary.dictionary.hederaActions.maxBatchSize);
  });
  it('should handle error when metaData is not passed', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 1
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    await expect((0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: '',
      tokenId: _consts.MOCK_TOKEN_ID,
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: 10
    })).rejects.toThrow(_dictionary.dictionary.hederaActions.metadataRequired);
  });
  it('should handle error when tokenId is not passed', async () => {
    _mintToken.mintToken.mockResolvedValueOnce({
      serials: Array.from({
        length: 1
      }, (_, i) => ({
        toNumber: () => i + 1
      }))
    });
    await expect((0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: _consts.MOCK_CLIENT,
      metaData: _consts.MOCK_META_DATA,
      tokenId: '',
      supplyKey: _consts.MOCK_SUPPLY_KEY,
      amount: 1,
      batchSize: 10
    })).rejects.toThrow(_dictionary.dictionary.hederaActions.cannotParseTokenId);
  });
});
//# sourceMappingURL=mint-shared-metadata-function.test.js.map