"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mintSharedMetadataFunction = void 0;
var _dictionary = require("../utils/constants/dictionary");
var _validateProps = require("../utils/validate-props");
var _mintingError = require("../utils/minting-error");
var _mintToken = require("./mint-token");
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

const mintSharedMetadataFunction = async _ref => {
  let {
    client,
    tokenId,
    amount,
    batchSize,
    metaData,
    supplyKey
  } = _ref;
  (0, _validateProps.validatePropsForSharedNFTMinting)({
    tokenId,
    amount,
    metaData,
    supplyKey,
    batchSize
  });
  const mintedNFTs = [];
  // Example if amount = 8 and batchSize = 5. NumberOfCalls should be 2. So 8/5 = 1.6. Math.ceil(1.6) = 2. Because Math.ceil rounds up to the next largest integer.
  const numberOfCalls = Math.ceil(amount / batchSize);
  try {
    for (let i = 0; i < numberOfCalls; i++) {
      const metadataBatchArray = new Array(Math.min(batchSize, amount)).fill(metaData);
      amount -= batchSize;
      const mintTokenReceipt = await (0, _mintToken.mintToken)(metadataBatchArray, tokenId, supplyKey, client);
      const result = mintTokenReceipt?.serials.map(longValue => {
        return {
          content: metaData,
          serialNumber: longValue.toNumber()
        };
      });
      if (result) {
        mintedNFTs.push(...result);
      }
    }
    return mintedNFTs.flat();
  } catch (error) {
    throw new _mintingError.MintingError(`${_dictionary.dictionary.hederaActions.mintingError} ${error}`, mintedNFTs.flat());
  }
};
exports.mintSharedMetadataFunction = mintSharedMetadataFunction;
//# sourceMappingURL=mint-shared-metadata-function.js.map