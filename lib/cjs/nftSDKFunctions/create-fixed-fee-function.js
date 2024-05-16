"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFixedFeeFunction = void 0;
var _sdk = require("@hashgraph/sdk");
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

const createFixedFeeFunction = _ref => {
  let {
    collectorAccountId,
    hbarAmount,
    amount,
    denominatingTokenId,
    allCollectorsAreExempt
  } = _ref;
  (0, _validateProps.validatePropsForFixedFeeFunction)({
    collectorAccountId,
    hbarAmount,
    amount,
    denominatingTokenId
  });
  const fixedFee = new _sdk.CustomFixedFee().setFeeCollectorAccountId(collectorAccountId);
  if (hbarAmount) {
    fixedFee.setHbarAmount(_sdk.Hbar.fromString(hbarAmount.toString()));
  }
  if (amount) {
    fixedFee.setAmount(amount);
  }
  if (denominatingTokenId) {
    fixedFee.setDenominatingTokenId(denominatingTokenId);
  }
  if (allCollectorsAreExempt) {
    fixedFee.setAllCollectorsAreExempt(allCollectorsAreExempt);
  }
  return fixedFee;
};
exports.createFixedFeeFunction = createFixedFeeFunction;
//# sourceMappingURL=create-fixed-fee-function.js.map