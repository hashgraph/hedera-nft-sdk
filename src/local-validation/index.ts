/*
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
 * Package below is not browser supported
 * @browserUnsupported
 */
import { Validator } from '../validator/index';
import { readFiles, getJSONFilesForPath } from '../helpers/files';
import { ValidationResult, Instance } from '../types/validator';
import path from 'path';
import { dictionary } from '../utils/constants/dictionary';

interface File {
  filename: string;
  filedata: Instance;
}

interface BlobFileInput {
  fileName: string;
  file: Blob;
}

interface ValidationResults {
  [key: string]: ValidationResult;
}

export const validateFiles = async (files: BlobFileInput[]): Promise<ValidationResults> => {
  const metadataFiles = await Promise.all(
    files.map(async ({ file, fileName }) => {
      if (!file.type.includes('application/json')) {
        throw new Error(dictionary.errors.validateFiles.invalidFileType);
      }
      try {
        const blobAsText = await file.text();
        const metadataObject = JSON.parse(blobAsText) as Instance;

        return { fileName, fileData: metadataObject };
      } catch (error) {
        throw new Error(dictionary.errors.validateFiles.invalidMetadataFile(fileName, JSON.parse(error)));
      }
    })
  );

  const validationResults: ValidationResults = {};
  const validator = new Validator();

  metadataFiles.forEach((file) => {
    const result = validator.validate(file.fileData);
    validationResults[file.fileName] = result;
  });

  return validationResults;
};

/**
 * Function below is not browser supported
 * @browserUnsupported
 */
/**
 * Validate files locally
 *
 * @param {string} relativePath Relative path to folder containing files
 * @returns {Object<filename<string>, validationResults<Object>>}
 */

export const mapFileDataToBlobFiles = (files: File[]): BlobFileInput[] =>
  files.map(({ filedata, filename }) => ({
    fileName: filename,
    file: new Blob([JSON.stringify(filedata)], { type: 'application/json ' }),
  }));

const localValidation = async (relativePath: string): Promise<ValidationResults> => {
  const absolutePath = path.resolve(relativePath); // convert relative path to absolute path
  const filenames = getJSONFilesForPath(absolutePath);
  const filedata = readFiles(absolutePath, filenames);
  const validationResults = validateFiles(mapFileDataToBlobFiles(filedata));

  return validationResults;
};

export { localValidation };
