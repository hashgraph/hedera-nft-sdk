"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareMetadataObjectsFromCSVRows = void 0;
var _jsonMetadataFromCsvConverter = require("../services/json-metadata-from-csv-converter");
var _csvConstants = require("../utils/constants/csv-constants");
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

const prepareMetadataObjectsFromCSVRows = _ref => {
  let {
    csvParsedRows
  } = _ref;
  const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
    csvParsedRows,
    headerAttributes: _csvConstants.ATTRIBUTES,
    headerProperties: _csvConstants.PROPERTIES
  });
  return metadataObjects;
};
exports.prepareMetadataObjectsFromCSVRows = prepareMetadataObjectsFromCSVRows;
//# sourceMappingURL=prepare-metadata-objects-from-csv-rows.js.map