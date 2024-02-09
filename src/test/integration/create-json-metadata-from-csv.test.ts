/*-
 *
 * Hedera NFT Utilities
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
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { Hip412MetadataCommonSchema } from '../../utils/validation-schemas/hip412-metadata-schema';
import {
  JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
  CSV_EXAMPLE_WITH_IMAGES,
  CSV_EXAMPLE_ONLY_REQUIRED_FIELDS,
  CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS,
  CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS,
  LONG_E2E_TIMEOUT,
} from '../__mocks__/consts';
import { createJsonMetadataFromCSV } from '../../nftSDKFunctions/create-json-metadata-from-csv';

const HEADERS_COUNT = 2;

describe('createJsonMetadataFromCSV Integration Test', () => {
  beforeEach(() => {
    if (!fs.existsSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH)) {
      fs.mkdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, { recursive: true });
    }
  });

  afterEach(() => {
    fs.rmSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, { recursive: true, force: true });
  });

  test('createJsonMetadataFromCSV should complete without errors', async () => {
    const result = await createJsonMetadataFromCSV({
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      csvFilePath: CSV_EXAMPLE_WITH_IMAGES,
    });

    expect(result.errors.metadataObjectsValidationErrors).toHaveLength(0);
  });

  test(
    'createJsonMetadataFromCSV should create correct number of JSON files based on the CSV file',
    async () => {
      await createJsonMetadataFromCSV({
        savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
        csvFilePath: CSV_EXAMPLE_WITH_IMAGES,
      });

      const files = fs.readdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
      const csvContent = fs.readFileSync(CSV_EXAMPLE_WITH_IMAGES, 'utf-8');
      const csvRows = csvContent.trim().split('\n').length;
      const expectedJsonFilesCount = csvRows - HEADERS_COUNT;

      expect(files.length).toBe(expectedJsonFilesCount);
    },
    LONG_E2E_TIMEOUT
  );

  test('Each file should match Hip412MetadataSchema', async () => {
    await createJsonMetadataFromCSV({
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      csvFilePath: CSV_EXAMPLE_WITH_IMAGES,
    });

    const files = fs.readdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
    const Hip412MetadataSchema = z.object(Hip412MetadataCommonSchema);

    files.forEach((file) => {
      const filePath = path.join(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, file);
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      expect(() => Hip412MetadataSchema.parse(jsonData)).not.toThrow();
    });
  });

  test('createJsonMetadataFromCSV should create a limited number of JSON files when nftsLimit is set', async () => {
    const nftsLimit = 2;

    await createJsonMetadataFromCSV({
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      csvFilePath: CSV_EXAMPLE_WITH_IMAGES,
      nftsLimit,
    });

    const generatedFiles = fs.readdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
    expect(generatedFiles.length).toBe(nftsLimit);
  });

  test('createJsonMetadataFromCSV should complete without errors using CSV with only required fields filled', async () => {
    const result = await createJsonMetadataFromCSV({
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      csvFilePath: CSV_EXAMPLE_ONLY_REQUIRED_FIELDS,
    });

    expect(result.errors.metadataObjectsValidationErrors).toHaveLength(0);
  });

  test('createJsonMetadataFromCSV should complete without errors using CSV with only required fields and headers filled', async () => {
    const result = await createJsonMetadataFromCSV({
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      csvFilePath: CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS,
    });

    expect(result.errors.metadataObjectsValidationErrors).toHaveLength(0);
  });

  test('createJsonMetadataFromCSV should return errors for missing required fields in CSV', async () => {
    const result = await createJsonMetadataFromCSV({
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      csvFilePath: CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS,
    });

    expect(result.errors.metadataObjectsValidationErrors).toHaveLength(6);
  });
});
