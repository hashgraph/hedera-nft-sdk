"use strict";

var _e2eConsts = require("./e2e-consts");
var _consts = require("../__mocks__/consts");
var _sdk = require("@hashgraph/sdk");
var _dictionary = require("../../utils/constants/dictionary");
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

describe('feeFactory', () => {
  it('creates a collection with fixedFee', async () => {
    const fixedFee = _e2eConsts.feeFactoryInstance.fixedFee({
      allCollectorsAreExempt: false,
      collectorAccountId: _consts.myAccountId,
      hbarAmount: 100
    });
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol',
      customFees: [fixedFee]
    });
    const query = new _sdk.TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await query.execute(_e2eConsts.nftSDK.client);
    const customFees = tokenInfo.customFees;
    let customFeeAccId = '';
    if (customFees.length > 0 && customFees[0] instanceof _sdk.CustomFixedFee) {
      customFeeAccId = customFees[0]._feeCollectorAccountId.toString();
    }
    expect(customFeeAccId).toEqual(_consts.myAccountId);
    expect(tokenId).toBeDefined();
  });
  it('creates a collection with royaltyFee', async () => {
    const royaltyFee = _e2eConsts.feeFactoryInstance.royaltyFee({
      collectorAccountId: _consts.myAccountId,
      numerator: 1,
      denominator: 100,
      allCollectorsAreExempt: false,
      fallbackFee: {
        allCollectorsAreExempt: false,
        collectorAccountId: _consts.mySecondAccountId,
        hbarAmount: 100
      }
    });
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol',
      customFees: [royaltyFee]
    });
    const query = new _sdk.TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await query.execute(_e2eConsts.nftSDK.client);
    const customFees = tokenInfo.customFees;
    let customFeeDenominator = undefined;
    let customFeeNumenator = undefined;
    if (customFees.length > 0 && customFees[0] instanceof _sdk.CustomRoyaltyFee) {
      customFeeDenominator = customFees[0]._denominator.toInt();
      customFeeNumenator = customFees[0]._numerator.toString();
    }
    expect(Number(customFeeNumenator)).toEqual(royaltyFee.numerator.toInt());
    expect(customFeeDenominator).toEqual(royaltyFee.denominator.toInt());
    expect(tokenId).toBeDefined();
  });
  it('creates a collection with royaltyFee and fixedFee', async () => {
    const royaltyFee = _e2eConsts.feeFactoryInstance.royaltyFee({
      collectorAccountId: _consts.myAccountId,
      numerator: 1,
      denominator: 100,
      allCollectorsAreExempt: false,
      fallbackFee: {
        allCollectorsAreExempt: false,
        collectorAccountId: _consts.mySecondAccountId,
        hbarAmount: 100
      }
    });
    const fixedFee = _e2eConsts.feeFactoryInstance.fixedFee({
      allCollectorsAreExempt: false,
      collectorAccountId: _consts.myAccountId,
      hbarAmount: 100
    });
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol',
      customFees: [royaltyFee, fixedFee]
    });
    const query = new _sdk.TokenInfoQuery().setTokenId(tokenId);
    const tokenInfo = await query.execute(_e2eConsts.nftSDK.client);
    const customFees = tokenInfo.customFees;
    let customFeeDenominator = undefined;
    let customFeeNumenator = undefined;
    if (customFees.length > 0 && customFees[0] instanceof _sdk.CustomRoyaltyFee) {
      customFeeDenominator = customFees[0]._denominator.toInt();
      customFeeNumenator = customFees[0]._numerator.toString();
    }
    expect(Number(customFeeNumenator)).toEqual(royaltyFee.numerator.toInt());
    expect(customFeeDenominator).toEqual(royaltyFee.denominator.toInt());
    expect(tokenId).toBeDefined();
  });
  it('throws error when more than 10 customFees', async () => {
    const fixedFee = _e2eConsts.feeFactoryInstance.fixedFee({
      allCollectorsAreExempt: false,
      collectorAccountId: _consts.myAccountId,
      amount: 100,
      denominatingTokenId: _consts.myAccountId
    });
    await expect(_e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol',
      customFees: [fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee, fixedFee]
    })).rejects.toThrow(_dictionary.dictionary.hederaActions.tooManyCustomFees);
  });
});
//# sourceMappingURL=fee-factory-e2e.test.js.map