"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFiles = exports.getJSONFilesForDir = void 0;
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

/**
 * @param dir Absolute path to file you want to read contents for
 * @param filenames An array of filenames
 * @returns Array of objects containing a filename and filedata
 */
const readFiles = (_, __) => {
  throw new Error("not supported in browser");
};

/**
 * @param dir Absolute path to folder you want to validate
 * @returns An array of filenames with extension
 */
exports.readFiles = readFiles;
const getJSONFilesForDir = _ => {
  throw new Error('not supported in browser');
};
exports.getJSONFilesForDir = getJSONFilesForDir;
//# sourceMappingURL=files.browser.js.map