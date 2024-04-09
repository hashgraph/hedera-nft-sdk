/*
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
import { Validator } from '../validator/index';
import { readFiles, getJSONFilesForDir } from '../helpers/files';

import { ValidationResult, Instance } from '../types/validator';

interface File {
  filename: string;
  filedata: Instance;
}

interface ValidationResults {
  [key: string]: ValidationResult;
}

const validateFiles = (files: File[]): ValidationResults => {
  const validationResults: ValidationResults = {};
  const validator = new Validator();

  files.forEach((file) => {
    const result = validator.validate(file.filedata);
    validationResults[file.filename] = result;
  });

  return validationResults;
};

/**
 * Validate files locally
 *
 * @param {string} path Absolute path to folder containing files
 * @returns {Object<filename<string>, validationResults<Object>>}
 */
const localValidation = (path: string): ValidationResults => {
  const filenames = getJSONFilesForDir(path);
  const filedata = readFiles(path, filenames);
  const validationResults = validateFiles(filedata);

  // Print results for the user
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(validationResults));

  return validationResults;
};

export default {
  localValidation,
};
