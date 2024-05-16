"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estimateCreateCollectionInHbar = void 0;
var _validateProps = require("../utils/validate-props");
var _estimateCreateCollectionInDollars = require("./estimate-create-collection-in-dollars");
var _getHbarPriceInDollars = require("../helpers/get-hbar-price-in-dollars");
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

const estimateCreateCollectionInHbar = async _ref => {
  let {
    collectionName,
    collectionSymbol,
    keys,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees,
    network,
    mirrorNodeUrl
  } = _ref;
  (0, _validateProps.validatePropsForCreateCollection)({
    collectionName,
    collectionSymbol,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees
  });
  const totalCostInDollars = (0, _estimateCreateCollectionInDollars.estimateCreateCollectionInDollars)({
    collectionName,
    collectionSymbol,
    keys,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees
  });
  const hbarPrice = await (0, _getHbarPriceInDollars.getHbarPriceInDollars)(network, mirrorNodeUrl);
  return totalCostInDollars / hbarPrice.priceInDollars;
};
exports.estimateCreateCollectionInHbar = estimateCreateCollectionInHbar;
//# sourceMappingURL=estimate-create-collection-in-hbar.js.map