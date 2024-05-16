"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeMetadataUrl = void 0;
var _dictionary = require("../utils/constants/dictionary");
var _errorToMessage = require("./error-to-message");
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

const decodeMetadataUrl = (encodedMetadata, ipfsGateway) => {
  let decodedUrl = '';
  try {
    decodedUrl = atob(encodedMetadata);
  } catch (error) {
    throw new Error((0, _errorToMessage.errorToMessage)(error));
  }
  if (!decodedUrl.startsWith('https://') && !decodedUrl.startsWith('http://') && !ipfsGateway) {
    throw new Error(_dictionary.dictionary.errors.ipfsGatewayRequired);
  }
  if (decodedUrl.startsWith('ipfs://') && ipfsGateway) {
    decodedUrl = decodedUrl.replace('ipfs://', ipfsGateway);
  } else if (!decodedUrl.startsWith('https://') && !decodedUrl.startsWith('http://') && ipfsGateway) {
    decodedUrl = `${ipfsGateway}${decodedUrl}`;
  }
  return decodedUrl;
};
exports.decodeMetadataUrl = decodeMetadataUrl;
//# sourceMappingURL=decode-metadata-url.js.map