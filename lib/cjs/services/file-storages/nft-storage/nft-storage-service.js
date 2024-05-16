"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NftStorageService = void 0;
var _dictionary = require("../../../utils/constants/dictionary");
var _axios = _interopRequireDefault(require("axios"));
var _random = _interopRequireDefault(require("lodash/random"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

class NftStorageService {
  serviceUrl = 'https://api.nft.storage/';
  uploadUrl = 'upload';
  apiKeysList = [];
  constructor(serviceUrl, uploadUrl, apiKeysList) {
    this.serviceUrl = serviceUrl;
    this.uploadUrl = uploadUrl;
    this.apiKeysList = apiKeysList;
    if (apiKeysList.length <= 0) {
      throw new Error(_dictionary.dictionary.errors.noApiKeys);
    }
    this.instance = _axios.default.create({
      baseURL: this.serviceUrl
    });
  }
  async uploadFile(file) {
    const key = this.apiKeysList[(0, _random.default)(0, this.apiKeysList.length - 1)];
    const {
      data: {
        value: {
          cid
        }
      }
    } = await this.instance.post(this.uploadUrl, file, {
      headers: {
        Authorization: `Bearer ${key}`
      }
    });
    return `ipfs://${cid}`;
  }
}
exports.NftStorageService = NftStorageService;
//# sourceMappingURL=nft-storage-service.js.map