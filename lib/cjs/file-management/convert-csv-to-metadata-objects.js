"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCSVToMetadataObjects = void 0;
var _csvFileReader = require("../services/csv-file-reader");
var _csvConstants = require("../utils/constants/csv-constants");
var _dictionary = require("../utils/constants/dictionary");
var _prepareMetadataObjectsFromCsvRows = require("./prepare-metadata-objects-from-csv-rows");
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

const convertCSVToMetadataObjects = async (csvFilePath, limit) => {
  const csvParsedRows = await (0, _csvFileReader.readCSVFile)(csvFilePath, limit);
  if (csvParsedRows.length <= _csvConstants.AMOUNT_OF_HEADERS - _csvConstants.OMITTED_HEADER_COUNT) {
    throw new Error(_dictionary.dictionary.validation.csvFileIsEmpty(csvFilePath));
  }
  const metadataObjects = (0, _prepareMetadataObjectsFromCsvRows.prepareMetadataObjectsFromCSVRows)({
    csvParsedRows
  });
  return metadataObjects;
};
exports.convertCSVToMetadataObjects = convertCSVToMetadataObjects;
//# sourceMappingURL=convert-csv-to-metadata-objects.js.map