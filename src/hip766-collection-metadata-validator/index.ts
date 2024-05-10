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
import axios from 'axios';
import { decodeMetadataURL } from '../helpers/decode-metadata-url';
import { CollectionMetadataSchema } from '../utils/validation-schemas/hip766-collection-metadata-schema';
import { validateObjectWithSchema, validationMetadataErrorOptions } from '../helpers/validate-object-with-schema';
import { ValidationError } from '../utils/validation-error';
import { errorToMessage } from '../helpers/error-to-message';

export const validateCollectionMetadata = async (
  metadataURL: string,
  ipfsGateway?: string
): Promise<{ errors: string[]; isValid: boolean }> => {
  const errors: string[] = [];

  if (metadataURL.length === 0) {
    errors.push('URI is required');
    return { errors, isValid: false };
  }

  const decodedUri = decodeMetadataURL(metadataURL, ipfsGateway);

  try {
    const response = await axios.get(decodedUri, { responseType: 'json' });
    const metadata = response.data;

    try {
      validateObjectWithSchema(CollectionMetadataSchema, metadata, validationMetadataErrorOptions);
    } catch (error) {
      if (error instanceof ValidationError) {
        errors.push(...error.errors);
      } else {
        errors.push(errorToMessage(error));
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      errors.push(`Failed to fetch metadata: ${error.message}`);
    } else {
      errors.push('An unknown error occurred during metadata fetch.');
    }
  }

  return { errors, isValid: errors.length === 0 };
};
