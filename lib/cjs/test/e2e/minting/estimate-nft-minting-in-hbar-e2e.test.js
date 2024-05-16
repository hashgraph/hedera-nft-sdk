"use strict";

var _e2eConsts = require("../e2e-consts");
var _sdk = require("@hashgraph/sdk");
var _consts = require("../../__mocks__/consts");
var _estimateNftMintingInHbar = require("../../../nftSDKFunctions/estimate-nft-minting-in-hbar");
var _const = require("../../../utils/const");
var _roundToPrecision = require("../../helpers/round-to-precision");
var _isWithinAcceptableDifference = require("../../helpers/is-within-acceptable-difference");
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
    it(`Creating a token and minting ${amount} NFTs into it. Then checking estimated cost`, async () => {
      const tokenId = await _e2eConsts.nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol'
      });
      const metaData = new Array(amount).fill('www.youtube.com');
      const CIDs = metaData.map(metaData => Buffer.from(metaData));
      const transaction = new _sdk.TokenMintTransaction().setTokenId(tokenId).setMaxTransactionFee(new _sdk.Hbar(_const.mintingMaxTransactionFee)).setMetadata(CIDs).freezeWith(_e2eConsts.nftSDK.client);
      const txResponse = await transaction.execute(_e2eConsts.nftSDK.client);
      const record = await txResponse.getRecord(_e2eConsts.nftSDK.client);
      const estimatedHbarNumber = await (0, _estimateNftMintingInHbar.estimateNftMintingInHbar)({
        amountOfNfts: amount,
        network: 'testnet'
      });
      const estimatedHbars = new _sdk.Hbar((0, _roundToPrecision.roundToPrecision)(estimatedHbarNumber, 6));
      const transactionFeeHbars = record.transactionFee.toTinybars().toNumber();
      const estimatedHbarsValue = estimatedHbars.toTinybars().toNumber();
      expect(tokenId).toBeDefined();
      expect(record.transactionId).toBeDefined();
      expect(record.transactionFee).toBeDefined();
      expect((0, _isWithinAcceptableDifference.isWithinAcceptableDifference)(estimatedHbarsValue, transactionFeeHbars)).toBe(true);
    }, _consts.LONG_E2E_TIMEOUT);
  });
});
//# sourceMappingURL=estimate-nft-minting-in-hbar-e2e.test.js.map