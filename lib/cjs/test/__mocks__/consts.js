"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.treasuryAccountPrivateKey = exports.pathToRowCSV = exports.pathToOneLineCSV = exports.mySecondPrivateKey = exports.mySecondAccountId = exports.myPrivateKey = exports.myAccountId = exports.NON_EMPTY_JSON_DIRECTORY_PATH = exports.NFT_FROM_TOKEN_EXAMPLE_BASE_URL = exports.NETWORK_ERROR = exports.NETWORK = exports.MOCK_TOKEN_ID = exports.MOCK_SUPPLY_KEY = exports.MOCK_SERIAL = exports.MOCK_META_DATA = exports.MOCK_CLIENT = exports.MIRROR_NODE_DELAY = exports.LONG_MIRROR_NODE_DELAY = exports.LONG_E2E_TIMEOUT = exports.JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH = exports.JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH = exports.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH = exports.IPFS_PREFIXED_HASH = exports.HTTPS_URL = exports.HASH_WITHOUT_IPFS_PREFIX = exports.FILES_WITH_MIXED_EXTENSION_PATH = exports.EXAMPLE_IPFS_GATEWAY = exports.EMPTY_JSON_EXAMPLE_PATH = exports.EMPTY_JSON_DIRECTORY_PATH = exports.CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS = exports.CSV_EXAMPLE_WITH_HEADERS_ONLY = exports.CSV_EXAMPLE_WITH_ALL_FIELDS = exports.CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS = exports.CSV_EXAMPLE_ONLY_REQUIRED_FIELDS = exports.CSV_EXAMPLE_NO_IMAGES = exports.CSV_EXAMPLE_INVALID_HEADERS = exports.CSV_EXAMPLE_EMPTY_FILE = exports.CORRECT_EXAMPLE_PATH = void 0;
var _sdk = require("@hashgraph/sdk");
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
const myAccountId = exports.myAccountId = '0.0.12345';
const mySecondAccountId = exports.mySecondAccountId = '0.0.123';
const myPrivateKey = exports.myPrivateKey = _sdk.PrivateKey.generateED25519();
const mySecondPrivateKey = exports.mySecondPrivateKey = _sdk.PrivateKey.generateED25519();
const treasuryAccountPrivateKey = exports.treasuryAccountPrivateKey = _sdk.PrivateKey.generateED25519();
const pathToOneLineCSV = exports.pathToOneLineCSV = 'src/test/__mocks__/csv/csv-example-one-line.csv';
const pathToRowCSV = exports.pathToRowCSV = 'src/test/__mocks__/csv/csv-example-rows.csv';
const CSV_EXAMPLE_INVALID_HEADERS = exports.CSV_EXAMPLE_INVALID_HEADERS = 'src/test/__mocks__/csv/csv-example-invalid-headers.csv';
const CSV_EXAMPLE_NO_IMAGES = exports.CSV_EXAMPLE_NO_IMAGES = 'src/test/__mocks__/csv/csv-example-no-images.csv';
const CSV_EXAMPLE_ONLY_REQUIRED_FIELDS = exports.CSV_EXAMPLE_ONLY_REQUIRED_FIELDS = 'src/test/__mocks__/csv/csv-example-only-required-fields.csv';
const CSV_EXAMPLE_WITH_ALL_FIELDS = exports.CSV_EXAMPLE_WITH_ALL_FIELDS = 'src/test/__mocks__/csv/csv-example-with-all-fields.csv';
const CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS = exports.CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS = 'src/test/__mocks__/csv/csv-example-with-missing-required-fields.csv';
const CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS = exports.CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS = 'src/test/__mocks__/csv/csv-example-only-required-fields-and-headers.csv';
const CSV_EXAMPLE_EMPTY_FILE = exports.CSV_EXAMPLE_EMPTY_FILE = 'src/test/__mocks__/csv/csv-example-empty-file.csv';
const CSV_EXAMPLE_WITH_HEADERS_ONLY = exports.CSV_EXAMPLE_WITH_HEADERS_ONLY = 'src/test/__mocks__/csv/csv-example-with-headers-only.csv';
const JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH = exports.JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH = 'src/test/integration/output';
const JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH = exports.JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH = 'src/test/unit/output/metadata';
const JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH = exports.JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH = 'src/test/unit/output/newMetadata';
const EMPTY_JSON_DIRECTORY_PATH = exports.EMPTY_JSON_DIRECTORY_PATH = 'src/test/__mocks__/json/empty-json-directory';
const NON_EMPTY_JSON_DIRECTORY_PATH = exports.NON_EMPTY_JSON_DIRECTORY_PATH = 'src/test/__mocks__/json/non-empty-json-directory';
const FILES_WITH_MIXED_EXTENSION_PATH = exports.FILES_WITH_MIXED_EXTENSION_PATH = 'src/test/__mocks__/json/files-with-mixed-extensions';
const EMPTY_JSON_EXAMPLE_PATH = exports.EMPTY_JSON_EXAMPLE_PATH = 'src/test/__mocks__/json/empty-example.json';
const CORRECT_EXAMPLE_PATH = exports.CORRECT_EXAMPLE_PATH = 'src/test/__mocks__/json/correct-example.json';
const LONG_E2E_TIMEOUT = exports.LONG_E2E_TIMEOUT = 55000;
const MIRROR_NODE_DELAY = exports.MIRROR_NODE_DELAY = 5000;
const LONG_MIRROR_NODE_DELAY = exports.LONG_MIRROR_NODE_DELAY = 10000;
const NFT_FROM_TOKEN_EXAMPLE_BASE_URL = exports.NFT_FROM_TOKEN_EXAMPLE_BASE_URL = 'http://example.com';
const NETWORK_ERROR = exports.NETWORK_ERROR = 'Network error';
const EXAMPLE_IPFS_GATEWAY = exports.EXAMPLE_IPFS_GATEWAY = 'https://myipfsgateway.example.com/ipfs/';
const IPFS_PREFIXED_HASH = exports.IPFS_PREFIXED_HASH = 'ipfs://QmSomeHash';
const HASH_WITHOUT_IPFS_PREFIX = exports.HASH_WITHOUT_IPFS_PREFIX = 'QmAnotherHash';
const HTTPS_URL = exports.HTTPS_URL = 'https://example.com/metadata.json';
const NETWORK = exports.NETWORK = 'testnet';
const MOCK_CLIENT = exports.MOCK_CLIENT = {};
const MOCK_META_DATA = exports.MOCK_META_DATA = 'meta1';
const MOCK_TOKEN_ID = exports.MOCK_TOKEN_ID = '0.0.123';
const MOCK_SERIAL = exports.MOCK_SERIAL = 2;
const MOCK_SUPPLY_KEY = exports.MOCK_SUPPLY_KEY = myPrivateKey;
//# sourceMappingURL=consts.js.map