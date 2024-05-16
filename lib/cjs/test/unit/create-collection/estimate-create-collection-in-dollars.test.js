"use strict";

var _estimateCreateCollectionInDollars = require("../../../nftSDKFunctions/estimate-create-collection-in-dollars");
var _consts = require("../../__mocks__/consts");
var _feeFactory = require("../../../feeFactory");
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

let feeFactoryInstance;
beforeAll(() => {
  feeFactoryInstance = new _feeFactory.FeeFactory();
});
describe('estimateCreateCollectionInDollars', () => {
  it('should work properly', () => {
    const dollars = (0, _estimateCreateCollectionInDollars.estimateCreateCollectionInDollars)({
      collectionName: 'test',
      collectionSymbol: 'test2'
    });
    expect(dollars).toEqual(0.86112);
  });
  it('should return a value when valid parameters are passed', () => {
    const dollars = (0, _estimateCreateCollectionInDollars.estimateCreateCollectionInDollars)({
      collectionName: 'test',
      collectionSymbol: 'test2',
      treasuryAccount: '0.0.1234',
      treasuryAccountPrivateKey: _consts.myPrivateKey
    });
    expect(dollars).toEqual(0.90605);
  });
  it('should return a value when royalty fees are passed', () => {
    const royaltyFee = feeFactoryInstance.royaltyFee({
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
    const dollars = (0, _estimateCreateCollectionInDollars.estimateCreateCollectionInDollars)({
      collectionName: 'test',
      collectionSymbol: 'test2',
      treasuryAccount: '0.0.1234',
      treasuryAccountPrivateKey: _consts.myPrivateKey,
      customFees: [royaltyFee]
    });
    expect(dollars).toEqual(1.81324);
  });
});
//# sourceMappingURL=estimate-create-collection-in-dollars.test.js.map