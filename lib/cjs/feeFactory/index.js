"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeeFactory = void 0;
var _createFixedFeeFunction = require("../nftSDKFunctions/create-fixed-fee-function");
var _createRoyaltyFeeFunction = require("../nftSDKFunctions/create-royalty-fee-function");
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

class FeeFactory {
  fixedFee(_ref) {
    let {
      collectorAccountId,
      hbarAmount,
      amount,
      denominatingTokenId,
      allCollectorsAreExempt
    } = _ref;
    return (0, _createFixedFeeFunction.createFixedFeeFunction)({
      collectorAccountId,
      hbarAmount,
      amount,
      denominatingTokenId,
      allCollectorsAreExempt
    });
  }
  royaltyFee(_ref2) {
    let {
      collectorAccountId,
      numerator,
      denominator,
      fallbackFee,
      allCollectorsAreExempt
    } = _ref2;
    return (0, _createRoyaltyFeeFunction.createRoyaltyFeeFunction)({
      collectorAccountId,
      numerator,
      denominator,
      fallbackFee,
      allCollectorsAreExempt
    });
  }
}
exports.FeeFactory = FeeFactory;
//# sourceMappingURL=index.js.map