"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _tokenMetadataValidator = require("../../../token-metadata-validator");
var _dictionary = require("../../../utils/constants/dictionary");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

jest.mock('fs');
const mockReadFileSync = _fs.default.readFileSync;
describe('TokenMetadataValidator.validateLocalFile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should throw errors during file reading without permissions', () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error(_dictionary.dictionary.validation.filePermissionDenied);
    });
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalFile('mockPath.json');
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain(_dictionary.dictionary.validation.filePermissionDenied);
  });
  it('should handle JSON files with formatting errors', () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error(_dictionary.dictionary.validation.fileEmptyOrFormattingError);
    });
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalFile('mockPath.json');
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual([_dictionary.dictionary.validation.fileEmptyOrFormattingError]);
  });
  it('should handle empty or non-existent JSON files', () => {
    mockReadFileSync.mockReturnValue('');
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalFile('path/to/empty.json');
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual([_dictionary.dictionary.validation.fileEmptyOrFormattingError]);
  });
  it('should validate correctly structured JSON file', () => {
    const validJson = JSON.stringify({
      name: 'Example NFT',
      image: 'https://example.com/nft.jpg',
      type: 'image/jpeg'
    });
    mockReadFileSync.mockReturnValue(validJson);
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalFile('path/to/valid.json');
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });
});
//# sourceMappingURL=validate-local-file.test.js.map