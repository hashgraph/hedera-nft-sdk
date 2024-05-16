"use strict";

var _e2eConsts = require("../e2e-consts");
var _consts = require("../../__mocks__/consts");
var _sdk = require("@hashgraph/sdk");
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

describe('mintUniqueMetadata function e2e', () => {
  it('Mints unique metadata from csv with one line and commas', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol'
    });
    const mintedMetadata = await _e2eConsts.nftSDK.mintUniqueMetadata({
      tokenId,
      batchSize: 2,
      supplyKey: _e2eConsts.operatorPrivateKey,
      pathToMetadataURIsFile: _consts.pathToOneLineCSV
    });
    expect(tokenId).toBeDefined();
    expect(mintedMetadata).toBeDefined();
    expect(mintedMetadata).toEqual([{
      content: 'https://www.youtube.com1',
      serialNumber: expect.any(Number)
    }, {
      content: 'https://www.youtube.com2',
      serialNumber: expect.any(Number)
    }]);
    for (const [index, metaData] of mintedMetadata.entries()) {
      const nftInfos = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), metaData.serialNumber)).execute(_e2eConsts.nftSDK.client);
      expect(nftInfos[0].metadata.toString()).toEqual(`https://www.youtube.com${index + 1}`);
    }
  }, _consts.LONG_E2E_TIMEOUT);
  it('Mints unique metadata from csv with rows', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol'
    });
    const mintedMetadata = await _e2eConsts.nftSDK.mintUniqueMetadata({
      tokenId,
      batchSize: 2,
      supplyKey: _e2eConsts.operatorPrivateKey,
      pathToMetadataURIsFile: _consts.pathToRowCSV
    });
    expect(tokenId).toBeDefined();
    expect(mintedMetadata).toBeDefined();
    expect(mintedMetadata).toEqual([{
      content: 'https://www.youtube.com1',
      serialNumber: expect.any(Number)
    }, {
      content: 'https://www.youtube.com2',
      serialNumber: expect.any(Number)
    }]);
    for (const [index, metaData] of mintedMetadata.entries()) {
      const nftInfos = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), metaData.serialNumber)).execute(_e2eConsts.nftSDK.client);
      expect(nftInfos[0].metadata.toString()).toEqual(`https://www.youtube.com${index + 1}`);
    }
  }, _consts.LONG_E2E_TIMEOUT);
  it('Mints unique metadata from metadata array props', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol'
    });
    const mintedMetadata = await _e2eConsts.nftSDK.mintUniqueMetadata({
      tokenId,
      batchSize: 2,
      supplyKey: _e2eConsts.operatorPrivateKey,
      metadata: ['https://www.youtube.com1', 'https://www.youtube.com2']
    });
    expect(tokenId).toBeDefined();
    expect(mintedMetadata).toBeDefined();
    expect(mintedMetadata).toEqual([{
      content: 'https://www.youtube.com1',
      serialNumber: expect.any(Number)
    }, {
      content: 'https://www.youtube.com2',
      serialNumber: expect.any(Number)
    }]);
    for (const [index, metaData] of mintedMetadata.entries()) {
      const nftInfos = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), metaData.serialNumber)).execute(_e2eConsts.nftSDK.client);
      expect(nftInfos[0].metadata.toString()).toEqual(`https://www.youtube.com${index + 1}`);
    }
  }, _consts.LONG_E2E_TIMEOUT);
  it('throws an error when invalid token ID is provided', async () => {
    const invalidTokenId = 'invalidTokenId';
    await expect(_e2eConsts.nftSDK.mintUniqueMetadata({
      tokenId: invalidTokenId,
      batchSize: 2,
      supplyKey: _e2eConsts.operatorPrivateKey,
      pathToMetadataURIsFile: _consts.pathToRowCSV
    })).rejects.toThrow(_dictionary.dictionary.hederaActions.cannotParseTokenId);
  });
});
//# sourceMappingURL=mint-unique-metadata-function-e2e.test.js.map