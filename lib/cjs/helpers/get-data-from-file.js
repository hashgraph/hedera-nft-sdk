"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataFromFile = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _csvParser = _interopRequireDefault(require("csv-parser"));
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

const getDataFromFile = async pathToMetadataURIsFile => {
  const results = [];
  try {
    await new Promise((resolve, reject) => {
      _fs.default.createReadStream(pathToMetadataURIsFile).pipe((0, _csvParser.default)({
        separator: ',',
        quote: ',',
        headers: false
      })).on('data', data => {
        const chunk = Object.values(data)[0]?.toString() || '';
        const urls = chunk.split(',').map(url => url.trim()).filter(i => i);
        results.push(...urls);
      }).on('end', resolve).on('error', error => reject(error));
    });
  } catch (error) {
    throw new Error(String(error));
  }
  return results;
};
exports.getDataFromFile = getDataFromFile;
//# sourceMappingURL=get-data-from-file.js.map