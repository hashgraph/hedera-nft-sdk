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
import cloneDeep from 'lodash/cloneDeep';
import { CSVRow, MetadataObject } from '../../types/csv';
import { JsonMetadataFromCSVConverter } from '../../services/json-metadata-from-csv-converter';
import {
  JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH,
  JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH,
} from '../__mocks__/consts';

const csvRows: CSVRow[] = [
  {
    name: '',
    creator: '',
    description: '',
    properties_1: 'url',
    properties_2: 'url',
    attributes_1: 'color',
    attributes_2: 'color',
    attributes_3: '',
  },
  {
    name: 'Example NFT 1',
    creator: 'Hedera',
    description: 'This is an example NFT 2',
    properties_1: 'Cool collection',
    properties_2: 'https://nft.com/mycollection/1',
    attributes_1: 'red',
    attributes_2: 'long',
    attributes_3: '',
  },
  {
    name: 'Example NFT 2',
    creator: 'Hedera',
    description: 'This is an example NFT 2',
    properties_1: 'Cool collection',
    properties_2: 'https://nft.com/mycollection/2',
    attributes_1: 'black',
    attributes_2: 'short',
    attributes_3: '',
  },
];

const objectsFromCSVRows = [
  {
    name: 'Example NFT 1',
    creator: 'Hedera',
    description: 'This is an example NFT 2',
    properties: { url: 'https://nft.com/mycollection/1' },
    attributes: [
      { trait_type: 'color', value: 'red' },
      { trait_type: 'color', value: 'long' },
    ],
  },
  {
    name: 'Example NFT 2',
    creator: 'Hedera',
    description: 'This is an example NFT 2',
    properties: { url: 'https://nft.com/mycollection/2' },
    attributes: [
      { trait_type: 'color', value: 'black' },
      { trait_type: 'color', value: 'short' },
    ],
  },
];

describe('JsonMetadataFromCSVConverter', () => {
  describe('saveCSVRowsAsJsonFiles', () => {
    it('should save content of MetadataObject[] to json files', () => {
      const metadataObjectsFromCSVRows: MetadataObject[] = JsonMetadataFromCSVConverter.parseCSVRowsToMetadataObjects({
        csvParsedRows: cloneDeep(csvRows),
        csvFilePath: 'csvFilePath',
        headerAttributes: 'attributes',
        headerProperties: 'properties',
      });

      JsonMetadataFromCSVConverter.saveCSVRowsAsJsonFiles(metadataObjectsFromCSVRows, JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH);

      const firstJson = JSON.parse(fs.readFileSync(`${JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH}/1.json`).toString());
      const secondJson = JSON.parse(fs.readFileSync(`${JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH}/2.json`).toString());

      fs.rmSync(JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH, {
        recursive: true,
        force: true,
      });
      fs.mkdirSync(JSON_METADATA_UNIT_TESTS_OUTPUT_METADATA_FOLDER_PATH, { recursive: true });

      expect([firstJson, secondJson]).toStrictEqual(objectsFromCSVRows);
    });

    it('should create directory if path do not point to directory save content of MetadataObject[] to json files', () => {
      const metadataObjectsFromCSVRows: MetadataObject[] = JsonMetadataFromCSVConverter.parseCSVRowsToMetadataObjects({
        csvParsedRows: cloneDeep(csvRows),
        csvFilePath: 'csvFilePath',
        headerAttributes: 'attributes',
        headerProperties: 'properties',
      });

      JsonMetadataFromCSVConverter.saveCSVRowsAsJsonFiles(
        metadataObjectsFromCSVRows,
        JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH
      );

      const firstJson = JSON.parse(fs.readFileSync(`${JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH}/1.json`).toString());
      const secondJson = JSON.parse(fs.readFileSync(`${JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH}/2.json`).toString());

      fs.rmSync(JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH, {
        recursive: true,
        force: true,
      });
      fs.mkdirSync(JSON_METADATA_UNIT_TESTS_OUTPUT_NEW_METADATA_FOLDER_PATH, { recursive: true });

      expect([firstJson, secondJson]).toStrictEqual(objectsFromCSVRows);
    });
  });

  describe('metadataObjectsFromRows', () => {
    it('should transform CSV rows into metadata objects', () => {
      const result = JsonMetadataFromCSVConverter.parseCSVRowsToMetadataObjects({
        csvParsedRows: csvRows,
        csvFilePath: 'csvFilePath',
        headerAttributes: 'attributes',
        headerProperties: 'properties',
      });
      expect(result).toEqual(objectsFromCSVRows);
    });

    it('should throw an error when the CSV rows are empty', () => {
      expect(() =>
        JsonMetadataFromCSVConverter.parseCSVRowsToMetadataObjects({
          csvParsedRows: [],
          csvFilePath: 'csvFilePath',
          headerAttributes: 'attributes',
          headerProperties: 'properties',
        })
      ).toThrow();
    });
  });
});
