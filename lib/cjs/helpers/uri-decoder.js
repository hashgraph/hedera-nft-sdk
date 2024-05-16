"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uriDecoder = void 0;
var _decodeMetadataUrl = require("./decode-metadata-url");
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

const uriDecoder = (nfts, ipfsGateway) => {
  const nftsArray = Array.isArray(nfts) ? nfts : [nfts];
  const decodedMetadataArray = nftsArray.map(nft => {
    const decodedNFTMetadata = (0, _decodeMetadataUrl.decodeMetadataUrl)(nft.metadata, ipfsGateway);
    return {
      metadata: decodedNFTMetadata,
      serialNumber: nft.serial_number
    };
  });
  return decodedMetadataArray;
};
exports.uriDecoder = uriDecoder;
//# sourceMappingURL=uri-decoder.js.map