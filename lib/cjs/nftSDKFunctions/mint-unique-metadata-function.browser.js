"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mintUniqueMetadataFunction = void 0;
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

const mintUniqueMetadataFunction /** Browser */ = async _ref => {
  let {
    client,
    tokenId,
    batchSize = 5,
    supplyKey,
    metadataArray,
    ...props
  } = _ref;
  if ('pathToMetadataURIsFile' in props) {
    throw new Error(_dictionary.dictionary.hederaActions.pathToMetadataURIsFileNotSupportedInBrowser);
  }
  (0, _validateProps.validatePropsForUniqueNFTMinting)({
    batchSize,
    tokenId,
    supplyKey,
    metadataArray
  });
  const mintedNFTs = [];
  const metaData = metadataArray || [];
  if (!metaData.length) throw new Error(_dictionary.dictionary.hederaActions.metadataRequired);
  try {
    const numberOfCalls = Math.ceil(metaData.length / batchSize);
    for (let i = 0; i < numberOfCalls; i++) {
      const batch = metaData.slice(i * batchSize, (i + 1) * batchSize);
      const mintTokenReceipt = await (0, _mintToken.mintToken)(batch, tokenId, supplyKey, client);
      const result = mintTokenReceipt?.serials.map((longValue, index) => {
        return {
          content: batch[index],
          serialNumber: longValue.toNumber()
        };
      });
      if (result) {
        mintedNFTs.push(...result);
      }
    }
  } catch (error) {
    throw new _mintingError.MintingError(`${_dictionary.dictionary.hederaActions.mintingError} ${error}`, mintedNFTs.flat());
  }
  return mintedNFTs.flat();
};
exports.mintUniqueMetadataFunction = mintUniqueMetadataFunction;
//# sourceMappingURL=mint-unique-metadata-function.browser.js.map