/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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
/**
 * @param dir Absolute path to file you want to read contents for
 * @param filenames An array of filenames
 * @returns Array of objects containing a filename and filedata
 */
export const readFiles = (dir, filenames) => {
  const JSONdata = [];
  filenames.forEach(filename => {
    const data = fs.readFileSync(path.join(dir, filename), {
      encoding: 'utf8',
      flag: 'r'
    });
    JSONdata.push({
      filename,
      filedata: JSON.parse(data)
    });
  });
  return JSONdata;
};

/**
 * @param dir Absolute path to folder you want to validate
 * @returns An array of filenames with extension
 */
export const getJSONFilesForDir = dir => {
  const directoryPath = dir;
  const files = fs.readdirSync(directoryPath, {
    withFileTypes: true
  });
  const JSONFiles = [];
  files.forEach(file => {
    if (path.extname(file.name) === '.json') JSONFiles.push(file.name);
  });
  return JSONFiles;
};
//# sourceMappingURL=files.js.map