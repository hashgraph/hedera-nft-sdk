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
import { CSVFileReader } from '../../csv-file-reader';
import { CSV_EXAMPLE_WITH_ALL_FIELDS } from '../__mocks__/consts';
import { convertCSVToMetadataObjects } from '../../nftSDKFunctions/convert-csv-to-metadata-objects';

describe('convertCSVToMetadataObjects Integration Test', () => {
  it('should create correct number of metadata objects based on the CSV file', async () => {
    const csvContent = fs.readFileSync(CSV_EXAMPLE_WITH_ALL_FIELDS, 'utf-8');
    const csvRows = csvContent.trim().split('\n').length - CSVFileReader.AMOUNT_OF_HEADERS;
    const metadataObjects = await convertCSVToMetadataObjects(CSV_EXAMPLE_WITH_ALL_FIELDS);

    expect(metadataObjects.length).toBe(csvRows);
  });

  it('should accurately convert CSV data to metadata objects', async () => {
    const EXPECTED_FIRST_OBJECT = {
      name: 'Example NFT 1',
      creator: 'Hedera',
      description: 'This is an example NFT 1',
      image: 'https://nft.com/mycollection/1.jpg',
      type: 'image/jpeg',
      properties: {
        external_url: 'https://nft.com/mycollection/1',
        url: 'https://nft.com/mycollection/1',
      },
      attributes: [
        { trait_type: 'color', value: 'rgb(0,255,0)' },
        { trait_type: 'hasPipe', value: 'false' },
        { trait_type: 'stamina', value: '65' },
      ],
    };

    const metadataObjects = await convertCSVToMetadataObjects(CSV_EXAMPLE_WITH_ALL_FIELDS);

    expect(metadataObjects.length).toBeGreaterThan(0);
    expect(metadataObjects[0]).toEqual(EXPECTED_FIRST_OBJECT);
  });

  it('should return a number of metadataObjects no greater than specified limit', async () => {
    const limit = 5;
    const metadataObjects = await convertCSVToMetadataObjects(CSV_EXAMPLE_WITH_ALL_FIELDS, limit);

    expect(metadataObjects.length).toBe(limit);
  });
});
