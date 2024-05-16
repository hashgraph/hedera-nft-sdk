"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadService = void 0;
var _filter = _interopRequireDefault(require("lodash/filter"));
var _isNull = _interopRequireDefault(require("lodash/isNull"));
var _map = _interopRequireDefault(require("lodash/map"));
var _dictionary = require("../utils/constants/dictionary");
var _errorToMessage = require("../helpers/error-to-message");
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

class UploadService {
  constructor(service) {
    this.service = service;
  }
  async uploadFilesFromPath(_) {
    throw new Error("Not implemented in browser");
  }
  async uploadBlobFiles(_) {
    throw new Error("Not implemented in browser");
  }
  async handleBlobUpload(metadata) {
    if (!metadata) {
      throw new Error(_dictionary.dictionary.errors.uploadService.noMetadata);
    }
    try {
      const file = new Blob([JSON.stringify(metadata)], {
        type: 'application/json'
      });
      // @ts-expect-error Argument of type 'Blob' is assignable to parameter of type 'import("buffer").Blob
      const url = await this.service.uploadFile(file);
      return {
        content: file,
        url
      };
    } catch (e) {
      const errorMessage = (0, _errorToMessage.errorToMessage)(e);
      throw new Error(errorMessage);
    }
  }
  async uploadMetadataList(metadatas) {
    const metadataUris = await Promise.all((0, _map.default)(metadatas, async metadata => this.handleBlobUpload(metadata)));
    return (0, _filter.default)(metadataUris, metadataUri => !(0, _isNull.default)(metadataUri));
  }
}
exports.UploadService = UploadService;
//# sourceMappingURL=upload-service.browser.js.map