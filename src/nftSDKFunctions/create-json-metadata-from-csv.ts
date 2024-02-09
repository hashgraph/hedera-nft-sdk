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
import { dictionary } from '../utils/constants/dictionary';
import { Hip412Metadata } from '../utils/hedera/hip412-metadata';
import { CSVRowAsObject } from '../types/csv.module';
import { errorToMessage } from '../helpers/error-to-message';
import { JsonMetadataFromCSVInterface } from '../types/json-metadata-from-csv.module';
import { CSVFileReader } from '../csv-file-reader';
import { JsonMetadataFromCSVConverter } from '../services/json-metadata-from-csv-converter';

const validateMetadataObjects = (
  metadataObjectsFromCSVRows: CSVRowAsObject[],
  csvFilePath: string
): { metadataObjectsValidationErrors: string[]; missingAttributesErrors: string[] } => {
  const metadataObjectsValidationErrors: string[] = [];
  const missingAttributesErrors: string[] = [];

  for (const [index, metadataObject] of metadataObjectsFromCSVRows.entries()) {
    try {
      Hip412Metadata.validateMetadataFromCSV(metadataObject);
    } catch (e) {
      metadataObjectsValidationErrors.push(dictionary.csvToJson.errorInRow(index + 1, errorToMessage(e)));
    }

    if (!metadataObject.attributes) {
      missingAttributesErrors.push(dictionary.csvToJson.missingAttributesInRow(csvFilePath, index + 1));
    }
  }

  return { metadataObjectsValidationErrors, missingAttributesErrors };
};

export const createJsonMetadataFromCSV = async ({
  savedJsonFilesLocation,
  csvFilePath,
  nftsLimit,
}: {
  savedJsonFilesLocation: string;
  csvFilePath: string;
  nftsLimit?: number;
}): Promise<JsonMetadataFromCSVInterface> => {
  const csvParsedRows = await CSVFileReader.readCSVFile(csvFilePath, {
    limit: nftsLimit,
  });

  const metadataObjectsFromCSVRows = JsonMetadataFromCSVConverter.parseCSVRowsToMetadataObjects({
    csvParsedRows,
    csvFilePath,
    headerAttributes: CSVFileReader.ATTRIBUTES,
    headerProperties: CSVFileReader.PROPERTIES,
  });

  const { metadataObjectsValidationErrors, missingAttributesErrors } = validateMetadataObjects(metadataObjectsFromCSVRows, csvFilePath);

  JsonMetadataFromCSVConverter.saveCSVRowsAsJsonFiles(metadataObjectsFromCSVRows, savedJsonFilesLocation);

  return {
    errors: {
      metadataObjectsValidationErrors,
      missingAttributesErrors,
    },
    savedJsonFilesLocation,
  };
};
