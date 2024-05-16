"use strict";

var _consts = require("../../__mocks__/consts");
var _e2eConsts = require("../e2e-consts");
var _sdk = require("@hashgraph/sdk");
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

describe('increaseNFTSupply function e2e', () => {
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
    it(`Increasing a token supply by ${amount}`, async () => {
      const tokenId = await _e2eConsts.nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol'
      });
      const baseNFT = await _e2eConsts.nftSDK.mintUniqueMetadata({
        tokenId,
        batchSize: 10,
        metadata: ['www.youtube.com'],
        supplyKey: _e2eConsts.operatorPrivateKey
      });
      const nftInfo = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), baseNFT[0].serialNumber)).execute(_e2eConsts.nftSDK.client);

      //wait for the collection and nfts to be available on mirror node
      await new Promise(r => setTimeout(r, _consts.MIRROR_NODE_DELAY));
      const increaseSupplyResult = await _e2eConsts.nftSDK.increaseNFTSupply({
        nftId: nftInfo[0].nftId,
        amount,
        batchSize: 10,
        supplyKey: _e2eConsts.operatorPrivateKey
      });
      for (const mintedNft of increaseSupplyResult) {
        const nftInfos = await new _sdk.TokenNftInfoQuery().setNftId(new _sdk.NftId(_sdk.TokenId.fromString(tokenId), mintedNft.serialNumber)).execute(_e2eConsts.nftSDK.client);
        expect(nftInfos[0].metadata.toString()).toEqual(baseNFT[0].content);
      }
    }, _consts.LONG_E2E_TIMEOUT);
  });
});
//# sourceMappingURL=increase-nft-supply-e2e.test.js.map