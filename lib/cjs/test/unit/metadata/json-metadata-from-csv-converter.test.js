"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _jsonMetadataFromCsvConverter = require("../../../services/json-metadata-from-csv-converter");
var _saveMetadataObjectAsJsonFiles = require("../../../helpers/save-metadata-object-as-json-files");
var _consts = require("../../__mocks__/consts");
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

const csvRows = [{
  name: '',
  creator: '',
  description: '',
  properties_1: 'url',
  properties_2: 'url',
  attributes_1: 'color',
  attributes_2: 'color',
  attributes_3: ''
}, {
  name: 'Example NFT 1',
  creator: 'Hedera',
  description: 'This is an example NFT 2',
  properties_1: 'Cool collection',
  properties_2: 'https://nft.com/mycollection/1',
  attributes_1: 'red',
  attributes_2: 'long',
  attributes_3: ''
}, {
  name: 'Example NFT 2',
  creator: 'Hedera',
  description: 'This is an example NFT 2',
  properties_1: 'Cool collection',
  properties_2: 'https://nft.com/mycollection/2',
  attributes_1: 'black',
  attributes_2: 'short',
  attributes_3: ''
}];
const objectsFromCSVRows = [{
  name: 'Example NFT 1',
  creator: 'Hedera',
  description: 'This is an example NFT 2',
  properties: {
    url: 'https://nft.com/mycollection/1'
  },
  attributes: [{
    trait_type: 'color',
    value: 'red'
  }, {
    trait_type: 'color',
    value: 'long'
  }]
}, {
  name: 'Example NFT 2',
  creator: 'Hedera',
  description: 'This is an example NFT 2',
  properties: {
    url: 'https://nft.com/mycollection/2'
  },
  attributes: [{
    trait_type: 'color',
    value: 'black'
  }, {
    trait_type: 'color',
    value: 'short'
  }]
}];
describe('JsonMetadataFromCSVConverter', () => {
  describe('saveMetadataObjectsAsJsonFiles', () => {
    it('should save content of MetadataObject[] to json files', () => {
      const metadataObjectsFromCSVRows = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
        csvParsedRows: (0, _cloneDeep.default)(csvRows),
        headerAttributes: 'attributes',
        headerProperties: 'properties'
      });
      (0, _saveMetadataObjectAsJsonFiles.saveMetadataObjectsAsJsonFiles)(metadataObjectsFromCSVRows, _consts.JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH);
      const firstJson = JSON.parse(_fs.default.readFileSync(`${_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH}/1.json`).toString());
      const secondJson = JSON.parse(_fs.default.readFileSync(`${_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH}/2.json`).toString());
      _fs.default.rmSync(_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH, {
        recursive: true,
        force: true
      });
      _fs.default.mkdirSync(_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH, {
        recursive: true
      });
      expect([firstJson, secondJson]).toStrictEqual(objectsFromCSVRows);
    });
    it('should create directory if path do not point to directory save content of MetadataObject[] to json files', () => {
      const metadataObjectsFromCSVRows = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
        csvParsedRows: (0, _cloneDeep.default)(csvRows),
        headerAttributes: 'attributes',
        headerProperties: 'properties'
      });
      (0, _saveMetadataObjectAsJsonFiles.saveMetadataObjectsAsJsonFiles)(metadataObjectsFromCSVRows, _consts.JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH);
      const firstJson = JSON.parse(_fs.default.readFileSync(`${_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH}/1.json`).toString());
      const secondJson = JSON.parse(_fs.default.readFileSync(`${_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH}/2.json`).toString());
      _fs.default.rmSync(_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH, {
        recursive: true,
        force: true
      });
      _fs.default.mkdirSync(_consts.JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH, {
        recursive: true
      });
      expect([firstJson, secondJson]).toStrictEqual(objectsFromCSVRows);
    });
  });
  describe('metadataObjectsFromRows', () => {
    it('should transform CSV rows into metadata objects', () => {
      const result = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
        csvParsedRows: csvRows,
        headerAttributes: 'attributes',
        headerProperties: 'properties'
      });
      expect(result).toEqual(objectsFromCSVRows);
    });
  });
});
//# sourceMappingURL=json-metadata-from-csv-converter.test.js.map