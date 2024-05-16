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
import { readCSVFile } from '../services/csv-file-reader';
import { AMOUNT_OF_HEADERS, OMITTED_HEADER_COUNT } from '../utils/constants/csv-constants';
import { dictionary } from '../utils/constants/dictionary';
import { prepareMetadataObjectsFromCSVRows } from './prepare-metadata-objects-from-csv-rows';
export const convertCSVToMetadataObjects = async (csvFilePath, limit) => {
  const csvParsedRows = await readCSVFile(csvFilePath, limit);
  if (csvParsedRows.length <= AMOUNT_OF_HEADERS - OMITTED_HEADER_COUNT) {
    throw new Error(dictionary.validation.csvFileIsEmpty(csvFilePath));
  }
  const metadataObjects = prepareMetadataObjectsFromCSVRows({
    csvParsedRows
  });
  return metadataObjects;
};
//# sourceMappingURL=convert-csv-to-metadata-objects.js.map