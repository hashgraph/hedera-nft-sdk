"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCSVRowsToMetadataObjects = parseCSVRowsToMetadataObjects;
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

function processCSVRowEntry(metadataObject, header, cell, secondHeader, headerAttributes, headerProperties, attributes, properties) {
  if (cell && header.includes(headerAttributes)) {
    attributes.push({
      trait_type: secondHeader[header],
      value: cell
    });
  } else if (cell && header.includes(headerProperties)) {
    properties[secondHeader[header]] = cell;
  } else if (cell) {
    metadataObject[header] = cell;
  }
  return metadataObject;
}
function parseCSVRowsToMetadataObjects(_ref) {
  let {
    csvParsedRows,
    headerAttributes,
    headerProperties
  } = _ref;
  const secondHeader = csvParsedRows[0];
  csvParsedRows.shift();
  const metadataObjectsFromCSVRows = csvParsedRows.map(csvRow => {
    const csvRowKeyValuesAsEntries = Object.entries(csvRow);
    const properties = {};
    const attributes = [];
    const result = csvRowKeyValuesAsEntries.reduce((currentMetadataObject, _ref2) => {
      let [header, cell] = _ref2;
      return processCSVRowEntry(currentMetadataObject, header, cell, secondHeader, headerAttributes, headerProperties, attributes, properties);
    }, {});
    if (Object.keys(properties).length) {
      result.properties = properties;
    }
    if (attributes.length) {
      result.attributes = attributes;
    }
    return result;
  });
  return metadataObjectsFromCSVRows;
}
//# sourceMappingURL=json-metadata-from-csv-converter.js.map