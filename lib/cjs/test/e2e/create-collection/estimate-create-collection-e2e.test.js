"use strict";

var _e2eConsts = require("../e2e-consts");
var _estimateCreateCollectionInHbar = require("../../../nftSDKFunctions/estimate-create-collection-in-hbar");
var _sdk = require("@hashgraph/sdk");
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

describe('estimateCreateCollectionInHbarE2E', () => {
  it('should work properly with default values', async () => {
    const name = 'test';
    const symbol = 'test2';
    const estimatedHbarNumber = await (0, _estimateCreateCollectionInHbar.estimateCreateCollectionInHbar)({
      collectionName: name,
      network: 'testnet',
      collectionSymbol: symbol
    });
    const estimatedHbars = new _sdk.Hbar((0, _roundToPrecision.roundToPrecision)(estimatedHbarNumber, 6));
    const createToken = new _sdk.TokenCreateTransaction().setTokenName(name).setTokenSymbol(symbol).setTokenType(_sdk.TokenType.NonFungibleUnique).setSupplyKey(_e2eConsts.operatorPrivateKey).setTreasuryAccountId(_e2eConsts.operatorAccountId);
    const txResponse = await createToken.execute(_e2eConsts.nftSDK.client);
    const record = await txResponse.getRecord(_e2eConsts.nftSDK.client);
    expect(record.transactionId).toBeDefined();
    expect(record.transactionFee).toBeDefined();
    const transactionFeeHbars = record.transactionFee.toTinybars().toNumber();
    const estimatedHbarsValue = estimatedHbars.toTinybars().toNumber();
    expect((0, _isWithinAcceptableDifference.isWithinAcceptableDifference)(estimatedHbarsValue, transactionFeeHbars)).toBe(true);
  });
});
//# sourceMappingURL=estimate-create-collection-e2e.test.js.map