"use strict";

var _sdk = require("@hashgraph/sdk");
var _e2eConsts = require("../e2e-consts");
var _consts = require("../../__mocks__/consts");
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

describe('mintSharedMetadata function e2e', () => {
  const testCases = [{
    amount: 1
  }, {
    amount: 3
  }, {
    amount: 10
  }];
  testCases.forEach(_ref => {
    let {
      amount
    } = _ref;
    it('Creating a token and minting ${amount} NFTs into it', async () => {
      const tokenId = await _e2eConsts.nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol'
      });
      const mintedMetadata = await _e2eConsts.nftSDK.mintSharedMetadata({
        tokenId,
        amount,
        batchSize: 2,
        metaData: 'www.youtube.com',
        supplyKey: _e2eConsts.operatorPrivateKey
      });
      expect(tokenId).toBeDefined();
      expect(mintedMetadata).toBeDefined();
      expect(mintedMetadata).toHaveLength(amount);
      expect(mintedMetadata).toEqual(expect.arrayContaining(Array(amount).fill({
        content: 'www.youtube.com',
        serialNumber: expect.any(Number)
      })));
      for (const metaData of mintedMetadata) {
        const nftInfos = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), metaData.serialNumber)).execute(_e2eConsts.nftSDK.client);
        expect(nftInfos[0].metadata.toString()).toEqual('www.youtube.com');
      }
    }, _consts.LONG_E2E_TIMEOUT);
  });
  it('Creating a token and minting 1 NFTs into it with default supplyKey', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol'
    });
    const mintedMetadata = await _e2eConsts.nftSDK.mintSharedMetadata({
      tokenId,
      amount: 1,
      batchSize: 2,
      metaData: 'www.youtube.com'
    });
    expect(tokenId).toBeDefined();
    expect(mintedMetadata).toBeDefined();
    expect(mintedMetadata).toHaveLength(1);
    expect(mintedMetadata).toEqual(expect.arrayContaining(Array(1).fill({
      content: 'www.youtube.com',
      serialNumber: expect.any(Number)
    })));
    for (const metaData of mintedMetadata) {
      const nftInfos = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), metaData.serialNumber)).execute(_e2eConsts.nftSDK.client);
      expect(nftInfos[0].metadata.toString()).toEqual('www.youtube.com');
    }
  }, _consts.LONG_E2E_TIMEOUT);
  it('Creating a token and minting 8 NFTs into it with batchSize 5', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol'
    });
    const mintedMetadata = await _e2eConsts.nftSDK.mintSharedMetadata({
      tokenId,
      amount: 1,
      batchSize: 5,
      metaData: 'www.youtube.com'
    });
    expect(tokenId).toBeDefined();
    expect(mintedMetadata).toBeDefined();
    expect(mintedMetadata).toHaveLength(1);
    expect(mintedMetadata).toEqual(expect.arrayContaining(Array(1).fill({
      content: 'www.youtube.com',
      serialNumber: expect.any(Number)
    })));
    for (const metaData of mintedMetadata) {
      const nftInfos = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), metaData.serialNumber)).execute(_e2eConsts.nftSDK.client);
      expect(nftInfos[0].metadata.toString()).toEqual('www.youtube.com');
    }
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=mint-shared-metadata-function-e2e.test.js.map