"use strict";

var _tokenMetadataValidator = require("../../token-metadata-validator");
var _dictionary = require("../../utils/constants/dictionary");
var _consts = require("../__mocks__/consts");
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

describe('TokenMetadataValidator.validateLocalDirectory integration tests', () => {
  it('should return an error if the directory is empty', () => {
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalDirectory(_consts.EMPTY_JSON_DIRECTORY_PATH);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors.length).toBeGreaterThan(0);
    expect(validationResult.errors[0].general).toContain(_dictionary.dictionary.validation.directoryIsEmpty);
  });
  it('should not return any errors if the directory contains valid JSON files', () => {
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalDirectory(_consts.NON_EMPTY_JSON_DIRECTORY_PATH);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors.length).toBe(0);
  });
  it('should not return any errors if the directory contains valid text files with extensions other than JSON', () => {
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalDirectory(_consts.FILES_WITH_MIXED_EXTENSION_PATH);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors.length).toBe(0);
  });
});
//# sourceMappingURL=validate-local-directory.test.js.map