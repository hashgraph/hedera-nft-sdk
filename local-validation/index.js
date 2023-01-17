/*-
 *
 * Hedera NFT Utilities
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
const { validator } = require('../validator/index');
const { readFiles, getJSONFilesForDir } = require('../helpers/files');

const validateFiles = (files) => {
    let validationResults = {};

    files.forEach(file => {
        const result = validator(file.filedata);
        validationResults[file.filename] = result;
    });

    return validationResults;
}

/**
 * Validate files locally
 * 
 * @param {string} path Absolute path to folder containing files
 * @returns {Object<filename<string>, validationResults<Object>>}
 */
const localValidation = (path) => {
    const filenames = getJSONFilesForDir(path);
    const filedata = readFiles(path, filenames);
    const validationResults = validateFiles(filedata);

    // Print results for the user
    console.log(JSON.stringify(validationResults));

    return validationResults;
}

module.exports = {
    localValidation
};
