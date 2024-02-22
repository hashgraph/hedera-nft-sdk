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
import { CSVFileReader } from '../csv-file-reader';
import { JsonMetadataFromCSVConverter } from '../services/json-metadata-from-csv-converter';
import { JsonMetadataFromCSVInterface } from '../types/json-metadata-from-csv.module';
import { Hip412Validator } from '../hip412-validator';

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

  const { isValid, errors } = Hip412Validator.validateArrayOfObjects(metadataObjectsFromCSVRows, csvFilePath);

  if (isValid) {
    JsonMetadataFromCSVConverter.saveCSVRowsAsJsonFiles(metadataObjectsFromCSVRows, savedJsonFilesLocation);
  }

  return {
    isValid,
    errors,
    savedJsonFilesLocation,
  };
};
