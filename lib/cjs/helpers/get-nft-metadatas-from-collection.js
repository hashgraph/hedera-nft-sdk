"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNftMetadataFromCollection = void 0;
var _mirrorNode = require("../api/mirror-node");
var _uriDecoder = require("./uri-decoder");
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

const getNftMetadataFromCollection = async (network, tokenId, limit, ipfsGateway) => {
  const nfts = await (0, _mirrorNode.getNFTsFromToken)(network, tokenId, limit);
  const decodedMetadataArray = (0, _uriDecoder.uriDecoder)(nfts, ipfsGateway);
  return Promise.all(decodedMetadataArray.map(async _ref => {
    let {
      metadata,
      serialNumber
    } = _ref;
    return (0, _mirrorNode.getMetadataObjectsForValidation)(metadata, serialNumber);
  }));
};
exports.getNftMetadataFromCollection = getNftMetadataFromCollection;
//# sourceMappingURL=get-nft-metadatas-from-collection.js.map