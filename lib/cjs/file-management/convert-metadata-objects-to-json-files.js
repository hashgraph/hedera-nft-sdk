"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertMetadataObjectsToJsonFiles = void 0;
var _tokenMetadataValidator = require("../token-metadata-validator");
var _saveMetadataObjectAsJsonFiles = require("../helpers/save-metadata-object-as-json-files");
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

const convertMetadataObjectsToJsonFiles = async _ref => {
  let {
    metadataObjects,
    savedJsonFilesLocation,
    limit
  } = _ref;
  const {
    allObjectsValid,
    results
  } = _tokenMetadataValidator.TokenMetadataValidator.validateArrayOfObjects(metadataObjects);
  if (allObjectsValid) {
    const objectsToProcess = limit !== undefined && limit < metadataObjects.length ? metadataObjects.slice(0, limit) : metadataObjects;
    (0, _saveMetadataObjectAsJsonFiles.saveMetadataObjectsAsJsonFiles)(objectsToProcess, savedJsonFilesLocation);
  }

  // Prepare the error structure while maintaining the index of the metadata object and its error list for greater readability.
  const errorsDetailed = Object.entries(results).reduce((acc, _ref2) => {
    let [index, {
      errors
    }] = _ref2;
    if (errors.length > 0) {
      acc.push({
        objectIndex: parseInt(index),
        errors
      });
    }
    return acc;
  }, []);
  return {
    isValid: allObjectsValid,
    errors: errorsDetailed,
    savedJsonFilesLocation
  };
};
exports.convertMetadataObjectsToJsonFiles = convertMetadataObjectsToJsonFiles;
//# sourceMappingURL=convert-metadata-objects-to-json-files.js.map