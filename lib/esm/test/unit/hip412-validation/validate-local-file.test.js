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
import { TokenMetadataValidator } from '../../../token-metadata-validator';
import { dictionary } from '../../../utils/constants/dictionary';
jest.mock('fs');
const mockReadFileSync = fs.readFileSync;
describe('TokenMetadataValidator.validateLocalFile', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should throw errors during file reading without permissions', () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error(dictionary.validation.filePermissionDenied);
    });
    const validationResult = TokenMetadataValidator.validateLocalFile('mockPath.json');
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain(dictionary.validation.filePermissionDenied);
  });
  it('should handle JSON files with formatting errors', () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error(dictionary.validation.fileEmptyOrFormattingError);
    });
    const validationResult = TokenMetadataValidator.validateLocalFile('mockPath.json');
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual([dictionary.validation.fileEmptyOrFormattingError]);
  });
  it('should handle empty or non-existent JSON files', () => {
    mockReadFileSync.mockReturnValue('');
    const validationResult = TokenMetadataValidator.validateLocalFile('path/to/empty.json');
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual([dictionary.validation.fileEmptyOrFormattingError]);
  });
  it('should validate correctly structured JSON file', () => {
    const validJson = JSON.stringify({
      name: 'Example NFT',
      image: 'https://example.com/nft.jpg',
      type: 'image/jpeg'
    });
    mockReadFileSync.mockReturnValue(validJson);
    const validationResult = TokenMetadataValidator.validateLocalFile('path/to/valid.json');
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });
});
//# sourceMappingURL=validate-local-file.test.js.map