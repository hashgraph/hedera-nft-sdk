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
import { validateCollectionMetadata } from '../../hip766-collection-metadata-validator';
import { IPFS_GATEWAY } from '../e2e/e2e-consts';
import { LONG_E2E_TIMEOUT } from '../__mocks__/consts';
import { dictionary } from '../../utils/constants/dictionary';

describe('E2E Tests for validateCollectionMetadata function', () => {
  const VALID_FULL_METADATA_CID = 'QmVhtyR69V1KZ39gA59HuQRDvMirWdge1XHeQCJ1EuHWCA';
  const VALID_PARTIAL_METADATA_CID = 'QmTgnqu9MRdCvmkBYdNzWH8Nmo9pKfDy6pZtvvJ5RTD7Nk';
  const INVALID_REDUNDANT_KEYS_CID = 'QmNmZbfDnUCfQjiUMjiMReDqLFVxYUCLMeEDm7ngnbi19P';
  const INVALID_SOCIALS_CID = 'QmdV6Vq9tDgW2LTTxGSkn8nNKakqSc9ajuDL7dN9SJyDwp';

  it(
    'validates a full metadata object with no errors expected',
    async () => {
      const validationResult = await validateCollectionMetadata(VALID_FULL_METADATA_CID, IPFS_GATEWAY);

      expect(validationResult.isValid).toBe(true);
      expect(validationResult.errors).toHaveLength(0);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'validates a partially filled metadata object with no errors expected',
    async () => {
      const validationResult = await validateCollectionMetadata(VALID_PARTIAL_METADATA_CID, IPFS_GATEWAY);

      expect(validationResult.isValid).toBe(true);
      expect(validationResult.errors).toHaveLength(0);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'identifies errors in a metadata object with missing required fields in the socials array',
    async () => {
      const validationResult = await validateCollectionMetadata(INVALID_SOCIALS_CID, IPFS_GATEWAY);

      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toHaveLength(2);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'identifies errors in a metadata object with redundant keys',
    async () => {
      const validationResult = await validateCollectionMetadata(INVALID_REDUNDANT_KEYS_CID, IPFS_GATEWAY);

      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toHaveLength(1);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'throws an error when CID will be provided without an IPFS gateway',
    async () => {
      const errors: string[] = [];
      try {
        await validateCollectionMetadata(INVALID_REDUNDANT_KEYS_CID, '');
      } catch (error: unknown) {
        if (error instanceof Error) {
          errors.push(error.message);
        }
      }
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatch(dictionary.errors.ipfsGatewayRequired);
    },
    LONG_E2E_TIMEOUT
  );
});
