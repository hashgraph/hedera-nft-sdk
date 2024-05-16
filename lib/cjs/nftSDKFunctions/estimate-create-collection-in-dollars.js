"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estimateCreateCollectionInDollars = void 0;
var _validateProps = require("../utils/validate-props");
var _tokenCreateUsage = require("./token-create-usage");
var _calculatePrice = require("../helpers/calculate-price");
var _getTokenCreateWithFeesUsage = require("../helpers/get-token-create-with-fees-usage");
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

const estimateCreateCollectionInDollars = _ref => {
  let {
    collectionName,
    collectionSymbol,
    keys,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees
  } = _ref;
  (0, _validateProps.validatePropsForCreateCollection)({
    collectionName,
    collectionSymbol,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees
  });
  const tokenUsage = (0, _tokenCreateUsage.tokenCreateUsage)({
    collectionName,
    collectionSymbol,
    keys,
    treasuryAccount
  });
  if (customFees && customFees.length > 0) {
    const usage = (0, _getTokenCreateWithFeesUsage.getTokenCreateWithFeesUsage)({
      tokenUsage,
      customFees
    });
    return usage ? _calculatePrice.FeeTool.getCreateTokenWithFeesCost(usage) : 0;
  }
  return tokenUsage ? _calculatePrice.FeeTool.getCreateTokenCost(tokenUsage) : 0;
};
exports.estimateCreateCollectionInDollars = estimateCreateCollectionInDollars;
//# sourceMappingURL=estimate-create-collection-in-dollars.js.map