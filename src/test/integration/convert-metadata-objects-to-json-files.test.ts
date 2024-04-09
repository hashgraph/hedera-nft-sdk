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
import { convertMetadataObjectsToJsonFiles } from '../../file-management/convert-metadata-objects-to-json-files';
import {
  JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
  CSV_EXAMPLE_WITH_ALL_FIELDS,
  CSV_EXAMPLE_ONLY_REQUIRED_FIELDS,
  CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS,
  CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS,
  LONG_E2E_TIMEOUT,
} from '../__mocks__/consts';
import { readCSVFile } from '../../services/csv-file-reader';
import { parseCSVRowsToMetadataObjects } from '../../services/json-metadata-from-csv-converter';
import { ATTRIBUTES, PROPERTIES, AMOUNT_OF_HEADERS } from '../../utils/constants/csv-constants';

describe('convertMetadataObjectsToJsonFiles Integration Test', () => {
  beforeEach(() => {
    if (!fs.existsSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH)) {
      fs.mkdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, { recursive: true });
    }
  });

  afterEach(() => {
    fs.rmSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, { recursive: true, force: true });
  });

  it('convertMetadataObjectsToJsonFiles should complete without errors', async () => {
    const csvParsedRows = await readCSVFile(CSV_EXAMPLE_WITH_ALL_FIELDS);
    const metadataObjects = parseCSVRowsToMetadataObjects({
      csvParsedRows,
      headerAttributes: ATTRIBUTES,
      headerProperties: PROPERTIES,
    });

    const result = await convertMetadataObjectsToJsonFiles({
      metadataObjects,
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
    });

    expect(result.errors).toHaveLength(0);
  });

  it(
    'convertMetadataObjectsToJsonFiles should create correct number of JSON files based on the CSV file',
    async () => {
      const csvParsedRows = await readCSVFile(CSV_EXAMPLE_WITH_ALL_FIELDS);
      const metadataObjects = parseCSVRowsToMetadataObjects({
        csvParsedRows,
        headerAttributes: ATTRIBUTES,
        headerProperties: PROPERTIES,
      });

      await convertMetadataObjectsToJsonFiles({
        metadataObjects,
        savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      });

      const files = fs.readdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
      const csvContent = fs.readFileSync(CSV_EXAMPLE_WITH_ALL_FIELDS, 'utf-8');
      const csvRows = csvContent.trim().split('\n').length;
      const expectedJsonFilesCount = csvRows - AMOUNT_OF_HEADERS;

      expect(files.length).toBe(expectedJsonFilesCount);
    },
    LONG_E2E_TIMEOUT
  );

  it('Each file should match Hip412MetadataSchema', async () => {
    const csvParsedRows = await readCSVFile(CSV_EXAMPLE_WITH_ALL_FIELDS);
    const metadataObjects = parseCSVRowsToMetadataObjects({
      csvParsedRows,
      headerAttributes: ATTRIBUTES,
      headerProperties: PROPERTIES,
    });

    await convertMetadataObjectsToJsonFiles({
      metadataObjects,
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
    });

    const files = fs.readdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
    const Hip412MetadataSchema = z.object(Hip412MetadataCommonSchema);

    files.forEach((file) => {
      const filePath = path.join(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH, file);
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      expect(() => Hip412MetadataSchema.parse(jsonData)).not.toThrow();
    });
  });

  it('convertMetadataObjectsToJsonFiles should create a limited number of JSON files when nftsLimit is set', async () => {
    const limit = 2;
    const csvParsedRows = await readCSVFile(CSV_EXAMPLE_WITH_ALL_FIELDS);
    const metadataObjects = parseCSVRowsToMetadataObjects({
      csvParsedRows,
      headerAttributes: ATTRIBUTES,
      headerProperties: PROPERTIES,
    });

    await convertMetadataObjectsToJsonFiles({
      metadataObjects,
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
      limit,
    });

    const generatedFiles = fs.readdirSync(JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH);
    expect(generatedFiles.length).toBe(limit);
  });

  it('convertMetadataObjectsToJsonFiles should complete without errors using CSV with only required fields filled', async () => {
    const csvParsedRows = await readCSVFile(CSV_EXAMPLE_ONLY_REQUIRED_FIELDS);
    const metadataObjects = parseCSVRowsToMetadataObjects({
      csvParsedRows,
      headerAttributes: ATTRIBUTES,
      headerProperties: PROPERTIES,
    });

    const result = await convertMetadataObjectsToJsonFiles({
      metadataObjects,
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
    });

    expect(result.errors).toHaveLength(0);
  });

  it('convertMetadataObjectsToJsonFiles should complete without errors using CSV with only required fields and headers filled', async () => {
    const csvParsedRows = await readCSVFile(CSV_EXAMPLE_ONLY_REQUIRED_FIELDS_AND_HEADERS);
    const metadataObjects = parseCSVRowsToMetadataObjects({
      csvParsedRows,
      headerAttributes: ATTRIBUTES,
      headerProperties: PROPERTIES,
    });

    const result = await convertMetadataObjectsToJsonFiles({
      metadataObjects,
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
    });

    expect(result.errors).toHaveLength(0);
  });

  it('convertMetadataObjectsToJsonFiles should return errors for missing required fields in CSV', async () => {
    const csvParsedRows = await readCSVFile(CSV_EXAMPLE_WITH_MISSING_REQUIRED_FIELDS);
    const metadataObjects = parseCSVRowsToMetadataObjects({
      csvParsedRows,
      headerAttributes: ATTRIBUTES,
      headerProperties: PROPERTIES,
    });

    const result = await convertMetadataObjectsToJsonFiles({
      metadataObjects,
      savedJsonFilesLocation: JSON_METADATA_INTEGRATION_TESTS_OUTPUT_FOLDER_PATH,
    });
    expect(result.errors).toHaveLength(8);
  });
});
