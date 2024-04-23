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
import { dictionary } from '../../utils/constants/dictionary';
import { TokenMetadataValidator } from '../../token-metadata-validator';
import { EMPTY_JSON_EXAMPLE_PATH, CORRECT_EXAMPLE_PATH } from '../__mocks__/consts';

describe('TokenMetadataValidator.validateLocalFile integration tests', () => {
  it('should return an error if the file is empty', () => {
    const validationResult = TokenMetadataValidator.validateLocalFile(EMPTY_JSON_EXAMPLE_PATH);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toContain(dictionary.validation.fileEmptyOrFormattingError);
  });

  it('should validate correctly structured JSON file', () => {
    const validationResult = TokenMetadataValidator.validateLocalFile(CORRECT_EXAMPLE_PATH);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors.length).toBe(0);
  });
});
