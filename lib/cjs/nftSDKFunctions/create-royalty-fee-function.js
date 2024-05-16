"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoyaltyFeeFunction = void 0;
var _sdk = require("@hashgraph/sdk");
var _createFixedFeeFunction = require("./create-fixed-fee-function");
var _validateProps = require("../utils/validate-props");
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

const createRoyaltyFeeFunction = _ref => {
  let {
    collectorAccountId,
    numerator,
    denominator,
    fallbackFee,
    allCollectorsAreExempt
  } = _ref;
  (0, _validateProps.validatePropsForRoyaltyFeeFunction)({
    collectorAccountId,
    numerator,
    denominator
  });
  const royaltyFee = new _sdk.CustomRoyaltyFee().setFeeCollectorAccountId(collectorAccountId).setNumerator(numerator).setDenominator(denominator);
  if (allCollectorsAreExempt) {
    royaltyFee.setAllCollectorsAreExempt(allCollectorsAreExempt);
  }
  if (fallbackFee) {
    royaltyFee.setFallbackFee((0, _createFixedFeeFunction.createFixedFeeFunction)({
      collectorAccountId: fallbackFee.collectorAccountId,
      hbarAmount: fallbackFee.hbarAmount,
      amount: fallbackFee.amount,
      denominatingTokenId: fallbackFee.denominatingTokenId,
      allCollectorsAreExempt: fallbackFee.allCollectorsAreExempt
    }));
  }
  return royaltyFee;
};
exports.createRoyaltyFeeFunction = createRoyaltyFeeFunction;
//# sourceMappingURL=create-royalty-fee-function.js.map