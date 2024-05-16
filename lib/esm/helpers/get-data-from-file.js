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
import csv from 'csv-parser';
export const getDataFromFile = async pathToMetadataURIsFile => {
  const results = [];
  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(pathToMetadataURIsFile).pipe(csv({
        separator: ',',
        quote: ',',
        headers: false
      })).on('data', data => {
        const chunk = Object.values(data)[0]?.toString() || '';
        const urls = chunk.split(',').map(url => url.trim()).filter(i => i);
        results.push(...urls);
      }).on('end', resolve).on('error', error => reject(error));
    });
  } catch (error) {
    throw new Error(String(error));
  }
  return results;
};
//# sourceMappingURL=get-data-from-file.js.map