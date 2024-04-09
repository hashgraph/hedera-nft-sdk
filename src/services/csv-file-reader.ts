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
import { NFTS_LIMIT_ERROR } from '../utils/constants/nfts-limit-error';
import { dictionary } from '../utils/constants/dictionary';
import type { CSVRow } from '../types/csv';
import csvParser from 'csv-parser';
import { selectSeparator } from '../helpers/select-separator';
import { ATTRIBUTES, PROPERTIES, OMITTED_HEADER_COUNT } from '../utils/constants/csv-constants';

type CSVReaderErrorId = 'invalid-headers';

type CurrentType = 'attributes' | 'properties' | null;

export class CSVReaderError extends Error {
  id: CSVReaderErrorId;

  constructor(message: string, id: CSVReaderErrorId) {
    super(message);
    this.id = id;
  }
}

function checkForErrorsAndLimit({
  headersErrors,
  limit,
  currentRowCount,
}: {
  headersErrors: string[];
  limit?: number;
  currentRowCount: number;
}): void {
  if (headersErrors.length) {
    throw new CSVReaderError(headersErrors[0], 'invalid-headers');
  }

  const effectiveLimit = Number(limit) + OMITTED_HEADER_COUNT;
  if (limit && currentRowCount >= effectiveLimit) {
    throw new Error(NFTS_LIMIT_ERROR);
  }
}

function processHeader(
  header: { header: string; index: number },
  currentType: CurrentType,
  propertyIndex: number,
  attributesIndex: number,
  refToErrorArray: string[]
): {
  result: string | null;
  currentType: CurrentType;
  propertyIndex: number;
  attributesIndex: number;
} {
  let result: string | null = null;

  // TODO: try to simplyfy this
  if (header.header === ATTRIBUTES) {
    currentType = ATTRIBUTES;
    attributesIndex++;
  } else if (header.header === PROPERTIES) {
    currentType = PROPERTIES;
    propertyIndex = 1;
  } else if (!currentType) {
    return { result: header.header, currentType, propertyIndex, attributesIndex };
  }

  if (header.header !== '' && header.header !== ATTRIBUTES && header.header !== PROPERTIES) {
    refToErrorArray.push(dictionary.validation.errorInCellWithHeader(1, header.index + 1));
  }

  if ((propertyIndex > 1 && header.header === PROPERTIES) || (attributesIndex > 1 && header.header === ATTRIBUTES)) {
    refToErrorArray.push(dictionary.validation.errorInCellWithHeader(1, header.index + 1));
  }

  if (currentType === PROPERTIES) {
    result = `${PROPERTIES}_${propertyIndex}`;
    propertyIndex++;
  }

  if (currentType === ATTRIBUTES) {
    result = `${ATTRIBUTES}_${attributesIndex}`;
    attributesIndex++;
  }

  return { result, currentType, propertyIndex, attributesIndex };
}

export async function readCSVFile(absolutePath: string, limit?: number): Promise<CSVRow[]> {
  const separator = selectSeparator();
  const rows: CSVRow[] = [];
  const readStream = fs.createReadStream(absolutePath);
  const headersErrors: string[] = [];

  try {
    await new Promise((resolve, reject) => {
      readStream
        .pipe(
          csvParser({
            separator,
            mapHeaders: mapHeadersForCSV(headersErrors),
          })
        )
        .on('data', (row: CSVRow) => {
          try {
            checkForErrorsAndLimit({
              headersErrors,
              limit,
              currentRowCount: rows.length,
            });

            rows.push(row);
          } catch (e) {
            return reject(e);
          }
        })
        .on('end', () => resolve(readStream.read()))
        .on('error', (e) => {
          return reject(e);
        });
    });
  } catch (e) {
    // We want to throw only error related to CSV headers. In this case we want to ignore errors like limit for example and return rows as it is so the whole process can continue.
    if (e instanceof CSVReaderError) {
      throw e;
    }
  }

  return rows;
}

function mapHeadersForCSV(refToErrorArray: string[]): (header: { header: string; index: number }) => string | null {
  let propertyIndex = 0;
  let attributesIndex = 0;
  let currentType: CurrentType = null;

  return (header: { header: string; index: number }): string | null => {
    const {
      result,
      currentType: updatedType,
      propertyIndex: updatedPropertyIndex,
      attributesIndex: updatedAttributesIndex,
    } = processHeader(header, currentType, propertyIndex, attributesIndex, refToErrorArray);

    currentType = updatedType;
    propertyIndex = updatedPropertyIndex;
    attributesIndex = updatedAttributesIndex;

    return result;
  };
}
