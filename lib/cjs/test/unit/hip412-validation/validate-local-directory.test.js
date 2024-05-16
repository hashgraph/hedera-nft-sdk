"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
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
const mockReadDirSync = _fs.default.readdirSync;
const mockReadFileSync = _fs.default.readFileSync;
describe('TokenMetadataValidator.validateLocalDirectory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return an error if the directory is empty', () => {
    mockReadDirSync.mockReturnValue([]);
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalDirectory('mock/empty/directory');
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors[0].general).toContain(_dictionary.dictionary.validation.directoryIsEmpty);
  });
  it('should validate only .txt and .json files', () => {
    const mockFiles = ['valid_file.json', 'another_valid_file.txt', 'ignore_this.md', '.gitkeep'];
    mockReadDirSync.mockReturnValue(mockFiles);
    const mockContent = JSON.stringify({
      name: 'Test NFT',
      image: 'https://nft.com/mycollection/1.jpg',
      type: 'image/jpeg'
    });
    mockReadFileSync.mockImplementation(filePath => {
      if (filePath.includes('.json') || filePath.includes('.txt')) {
        return mockContent;
      }
      return null;
    });
    const directoryPath = 'mock/directory';
    const validationResult = _tokenMetadataValidator.TokenMetadataValidator.validateLocalDirectory(directoryPath);
    expect(mockReadFileSync).toHaveBeenCalledTimes(2);
    mockFiles.forEach(file => {
      if (file.endsWith('.json') || file.endsWith('.txt')) {
        expect(mockReadFileSync).toHaveBeenCalledWith(_path.default.join(directoryPath, file), 'utf8');
      }
    });
    expect(validationResult.isValid).toBe(true);
  });
});
//# sourceMappingURL=validate-local-directory.test.js.map