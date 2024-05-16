"use strict";

var _dictionary = require("../../../utils/constants/dictionary");
var _consts = require("../../__mocks__/consts");
var _createFixedFeeFunction = require("../../../nftSDKFunctions/create-fixed-fee-function");
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

describe('createFixedFeeFunction', () => {
  it('should create a CustomFixedFee with all properties', () => {
    const fixedFeeType = {
      collectorAccountId: _consts.myAccountId,
      hbarAmount: 100,
      allCollectorsAreExempt: true
    };
    const result = (0, _createFixedFeeFunction.createFixedFeeFunction)(fixedFeeType);
    expect(result).toBeDefined();
    expect(result._allCollectorsAreExempt).toEqual(fixedFeeType.allCollectorsAreExempt);
  });
  it('should throw an error when Collector account id is not provided', () => {
    expect(() => (0, _createFixedFeeFunction.createFixedFeeFunction)({
      collectorAccountId: '',
      hbarAmount: 100
    })).toThrow(_dictionary.dictionary.hederaActions.cannotParseAccountId);
  });
});
//# sourceMappingURL=create-fixed-fee-function.test.js.map