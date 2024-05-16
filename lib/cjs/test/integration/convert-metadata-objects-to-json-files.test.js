"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _zod = require("zod");
var _hip412MetadataSchema = require("../../utils/validation-schemas/hip412-metadata-schema");
var _convertMetadataObjectsToJsonFiles = require("../../file-management/convert-metadata-objects-to-json-files");
var _consts = require("../__mocks__/consts");
var _csvFileReader = require("../../services/csv-file-reader");
var _jsonMetadataFromCsvConverter = require("../../services/json-metadata-from-csv-converter");
var _csvConstants = require("../../utils/constants/csv-constants");
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

describe('convertMetadataObjectsToJsonFiles Integration Test', () => {
  beforeEach(() => {
    if (!_fs.default.existsSync(_consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH)) {
      _fs.default.mkdirSync(_consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, {
        recursive: true
      });
    }
  });
  afterEach(() => {
    _fs.default.rmSync(_consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, {
      recursive: true,
      force: true
    });
  });
  it('convertMetadataObjectsToJsonFiles should complete without errors', async () => {
    const csvParsedRows = await (0, _csvFileReader.readCSVFile)(_consts.CSV_EXAMPLE_WITH_ALL_FIELDS);
    const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
      csvParsedRows,
      headerAttributes: _csvConstants.ATTRIBUTES,
      headerProperties: _csvConstants.PROPERTIES
    });
    const result = await (0, _convertMetadataObjectsToJsonFiles.convertMetadataObjectsToJsonFiles)({
      metadataObjects,
      savedJsonFilesLocation: _consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH
    });
    expect(result.errors).toHaveLength(0);
  });
  it('convertMetadataObjectsToJsonFiles should create correct number of JSON files based on the CSV file', async () => {
    const csvParsedRows = await (0, _csvFileReader.readCSVFile)(_consts.CSV_EXAMPLE_WITH_ALL_FIELDS);
    const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
      csvParsedRows,
      headerAttributes: _csvConstants.ATTRIBUTES,
      headerProperties: _csvConstants.PROPERTIES
    });
    await (0, _convertMetadataObjectsToJsonFiles.convertMetadataObjectsToJsonFiles)({
      metadataObjects,
      savedJsonFilesLocation: _consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH
    });
    const files = _fs.default.readdirSync(_consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
    const csvContent = _fs.default.readFileSync(_consts.CSV_EXAMPLE_WITH_ALL_FIELDS, 'utf-8');
    const csvRows = csvContent.trim().split('\n').length;
    const expectedJsonFilesCount = csvRows - _csvConstants.AMOUNT_OF_HEADERS;
    expect(files.length).toBe(expectedJsonFilesCount);
  }, _consts.LONG_E2E_TIMEOUT);
  it('Each file should match Hip412MetadataSchema', async () => {
    const csvParsedRows = await (0, _csvFileReader.readCSVFile)(_consts.CSV_EXAMPLE_WITH_ALL_FIELDS);
    const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
      csvParsedRows,
      headerAttributes: _csvConstants.ATTRIBUTES,
      headerProperties: _csvConstants.PROPERTIES
    });
    await (0, _convertMetadataObjectsToJsonFiles.convertMetadataObjectsToJsonFiles)({
      metadataObjects,
      savedJsonFilesLocation: _consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH
    });
    const files = _fs.default.readdirSync(_consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
    const Hip412MetadataSchema = _zod.z.object(_hip412MetadataSchema.Hip412MetadataCommonSchema);
    files.forEach(file => {
      const filePath = _path.default.join(_consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, file);
      const jsonData = JSON.parse(_fs.default.readFileSync(filePath, 'utf-8'));
      expect(() => Hip412MetadataSchema.parse(jsonData)).not.toThrow();
    });
  });
  it('convertMetadataObjectsToJsonFiles should create a limited number of JSON files when nftsLimit is set', async () => {
    const limit = 2;
    const csvParsedRows = await (0, _csvFileReader.readCSVFile)(_consts.CSV_EXAMPLE_WITH_ALL_FIELDS);
    const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
      csvParsedRows,
      headerAttributes: _csvConstants.ATTRIBUTES,
      headerProperties: _csvConstants.PROPERTIES
    });
    await (0, _convertMetadataObjectsToJsonFiles.convertMetadataObjectsToJsonFiles)({
      metadataObjects,
      savedJsonFilesLocation: _consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      limit
    });
    const generatedFiles = _fs.default.readdirSync(_consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
    expect(generatedFiles.length).toBe(limit);
  });
  it('convertMetadataObjectsToJsonFiles should complete without errors using CSV with only required fields filled', async () => {
    const csvParsedRows = await (0, _csvFileReader.readCSVFile)(_consts.CSV_EXAMPLE_ONLY_REQUIRED_FIELDS);
    const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
      csvParsedRows,
      headerAttributes: _csvConstants.ATTRIBUTES,
      headerProperties: _csvConstants.PROPERTIES
    });
    const result = await (0, _convertMetadataObjectsToJsonFiles.convertMetadataObjectsToJsonFiles)({
      metadataObjects,
      savedJsonFilesLocation: _consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH
    });
    expect(result.errors).toHaveLength(0);
  });
  it('convertMetadataObjectsToJsonFiles should complete without errors using CSV with only required fields and headers filled', async () => {
    const csvParsedRows = await (0, _csvFileReader.readCSVFile)(_consts.CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS);
    const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
      csvParsedRows,
      headerAttributes: _csvConstants.ATTRIBUTES,
      headerProperties: _csvConstants.PROPERTIES
    });
    const result = await (0, _convertMetadataObjectsToJsonFiles.convertMetadataObjectsToJsonFiles)({
      metadataObjects,
      savedJsonFilesLocation: _consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH
    });
    expect(result.errors).toHaveLength(0);
  });
  it('convertMetadataObjectsToJsonFiles should return errors for missing required fields in CSV', async () => {
    const csvParsedRows = await (0, _csvFileReader.readCSVFile)(_consts.CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS);
    const metadataObjects = (0, _jsonMetadataFromCsvConverter.parseCSVRowsToMetadataObjects)({
      csvParsedRows,
      headerAttributes: _csvConstants.ATTRIBUTES,
      headerProperties: _csvConstants.PROPERTIES
    });
    const result = await (0, _convertMetadataObjectsToJsonFiles.convertMetadataObjectsToJsonFiles)({
      metadataObjects,
      savedJsonFilesLocation: _consts.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH
    });
    expect(result.errors).toHaveLength(8);
  });
});
//# sourceMappingURL=convert-metadata-objects-to-json-files.test.js.map