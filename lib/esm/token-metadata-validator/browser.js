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

import { Hip412MetadataSchema } from '../utils/validation-schemas/hip412-metadata-schema';
import { validateObjectWithSchema, validationMetadataErrorOptions } from '../helpers/validate-object-with-schema';
import { errorToMessage } from '../helpers/error-to-message';
import { getMetadataObjectsForValidation, getSingleNFTDetails } from '../api/mirror-node';
import { uriDecoder } from '../helpers/uri-decoder';
import { ValidationError } from '../utils/validation-error';
import { getNftMetadataFromCollection } from '../helpers/get-nft-metadatas-from-collection';
export class TokenMetadataValidator {
  static validateSingleMetadataObject(object) {
    const errors = [];
    try {
      validateObjectWithSchema(Hip412MetadataSchema, object, validationMetadataErrorOptions);
    } catch (err) {
      if (err instanceof ValidationError) {
        errors.push(...err.errors);
      } else {
        errors.push(errorToMessage(err));
      }
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  static validateArrayOfObjects(metadataObjects) {
    const results = {};
    let allObjectsValid = true;
    metadataObjects.forEach((metadataObject, index) => {
      const errors = [];
      try {
        validateObjectWithSchema(Hip412MetadataSchema, metadataObject, validationMetadataErrorOptions);
      } catch (e) {
        allObjectsValid = false;
        const errorMessage = errorToMessage(e);
        if (e instanceof ValidationError) {
          errors.push(...e.errors);
        } else {
          errors.push(errorMessage);
        }
      }
      results[index] = {
        isValid: errors.length === 0,
        errorsCount: errors.length,
        errors: errors.map(error => error)
      };
    });
    return {
      allObjectsValid,
      results
    };
  }
  static validateLocalFile(_) {
    throw new Error("No available in browser");
  }
  static validateLocalDirectory(_) {
    throw new Error('No available in browser');
  }
  static validateOnChainArrayOfObjects = metadataObjects => {
    const errors = [];
    metadataObjects.forEach(obj => {
      if (obj.error) {
        errors.push({
          serialNumber: obj.serialNumber,
          message: [obj.error]
        });
      } else if (obj.metadata) {
        try {
          validateObjectWithSchema(Hip412MetadataSchema, obj.metadata, validationMetadataErrorOptions);
        } catch (e) {
          errors.push({
            serialNumber: obj.serialNumber,
            message: [errorToMessage(e)]
          });
        }
      }
    });
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  static async validateMetadataFromOnChainCollection(network, tokenId, ipfsGateway, limit = 100) {
    const metadataObjects = await getNftMetadataFromCollection(network, tokenId, limit, ipfsGateway);
    return TokenMetadataValidator.validateOnChainArrayOfObjects(metadataObjects);
  }
  static async validateSingleOnChainNFTMetadata(network, tokenId, serialNumber, ipfsGateway) {
    const nft = await getSingleNFTDetails(network, tokenId, serialNumber);
    const decodedNFTMetadataURL = uriDecoder(nft, ipfsGateway);
    const metadataObject = await getMetadataObjectsForValidation(decodedNFTMetadataURL[0].metadata, decodedNFTMetadataURL[0].serialNumber);
    if (!metadataObject.metadata) {
      return {
        isValid: false,
        errors: {
          general: [metadataObject.error],
          missingAttributes: []
        }
      };
    }
    return TokenMetadataValidator.validateSingleMetadataObject(metadataObject.metadata);
  }
}
//# sourceMappingURL=browser.js.map