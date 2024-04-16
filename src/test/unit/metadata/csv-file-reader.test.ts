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
import fs from 'fs';
import { readCSVFile } from '../../../services/csv-file-reader';
import { CSVRow } from '../../../types/csv';
import { Readable } from 'stream';

jest.mock('fs');

describe('CSVFileReader', () => {
  const filePath = 'example.csv';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should read a CSV file correctly', async () => {
    const mockData: CSVRow[] = [
      { header1: 'value1', header2: 'value2' },
      { header1: 'value3', header2: 'value4' },
    ];

    const mockStream = new Readable({
      read() {
        this.push('header1,header2\nvalue1,value2\nvalue3,value4');
        this.push(null);
      },
    });

    (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);

    const result = await readCSVFile(filePath);
    expect(result).toEqual(mockData);
  });
});
