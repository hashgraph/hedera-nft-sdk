"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseNFTSupply = void 0;
var _validateProps = require("../utils/validate-props");
var _mintSharedMetadataFunction = require("./mint-shared-metadata-function");
var _mirrorNode = require("../api/mirror-node");
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

const increaseNFTSupply = async _ref => {
  let {
    client,
    network,
    nftId,
    amount,
    batchSize,
    supplyKey,
    mirrorNodeUrl
  } = _ref;
  (0, _validateProps.validatePropsForIncreaseNFTSupply)({
    amount,
    batchSize
  });
  return (0, _mirrorNode.getMetaDataFromMirrorNode)(network, nftId, mirrorNodeUrl).then(metaData => (0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
    client,
    tokenId: nftId.tokenId.toString(),
    amount,
    batchSize,
    metaData,
    supplyKey
  }));
};
exports.increaseNFTSupply = increaseNFTSupply;
//# sourceMappingURL=increase-nft-supply.js.map