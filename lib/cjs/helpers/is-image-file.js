"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImageFile = void 0;
var _some = _interopRequireDefault(require("lodash/some"));
var _mimeTypesAndExtensions = require("../utils/constants/mime-types-and-extensions");
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

const isImageFile = (fileName, mimeType) => {
  if (!mimeType || !fileName) return false;
  const bufferFileExtension = fileName.split('.')[fileName.split('.').length - 1];
  const isKnownExtension = (0, _some.default)(_mimeTypesAndExtensions.KNOWN_IMAGE_EXTENSIONS, el => el === bufferFileExtension);
  const isKnownMimeType = (0, _some.default)(_mimeTypesAndExtensions.KNOWN_IMAGE_MIME_TYPES, knownMimeType => mimeType.includes(knownMimeType));
  return isKnownMimeType || isKnownExtension;
};
exports.isImageFile = isImageFile;
//# sourceMappingURL=is-image-file.js.map