/*-
 *
 * Hedera NFT Utilities
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
import path from 'path';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
import { Hip412MetadataCSVSchema, Hip412MetadataSchema } from '../utils/validation-schemas/hip412-metadata-schema';
import { validateObjectWithSchema, validationMetadataErrorOptions } from '../helpers/validate-object-with-schema';
import { errorToMessage } from '../helpers/error-to-message';
import { MetadataObject } from '../types/csv';
import { dictionary } from '../utils/constants/dictionary';
import { REQUIRED } from '../utils/constants/nfts-limit-error';
import { getMetadataObjectsForValidation, getNFTsFromToken, getSingleNFTDetails } from '../api/mirror-node';
import { uriDecoder } from '../helpers/uri-decoder';
import { ValidationError } from '../utils/validation-error';

interface FileValidationResult {
  isValid: boolean;
  fileName?: string;
  errors: string[];
}

interface DirectoryValidationResult {
  isValid: boolean;
  errors: MetadataError[];
}

interface MetadataError {
  fileName?: string;
  general: string[];
}

interface MetadataOnChainObjects {
  metadata?: MetadataObject;
  serialNumber: number;
  error?: string;
}

export class Hip412Validator {
  static validateSingleMetadataObject(object: MetadataObject): FileValidationResult {
    const errors: string[] = [];

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
      errors,
    };
  }

  static validateArrayOfObjects = (metadataObjects: MetadataObject[], filePath?: string): FileValidationResult => {
    const errors: string[] = [];

    for (const [index, metadataObject] of metadataObjects.entries()) {
      try {
        validateObjectWithSchema(Hip412MetadataCSVSchema, metadataObject, validationMetadataErrorOptions);
      } catch (e) {
        errors.push(
          dictionary.validation.arrayOfObjectsValidationError(
            filePath || `object ${index + 1}`,
            errorToMessage(errorToMessage(e) === REQUIRED ? dictionary.validation.requiredFieldMissing : e)
          )
        );
      }
    }
    return { isValid: errors.length === 0, errors };
  };

  static validateLocalFile(filePath: string): FileValidationResult {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const object: MetadataObject = JSON.parse(fileContent);
      return this.validateSingleMetadataObject(object);
    } catch (error) {
      return {
        isValid: false,
        errors: [errorToMessage(error)],
      };
    }
  }

  static validateLocalDirectory(directoryPath: string): DirectoryValidationResult {
    const errors: MetadataError[] = [];

    const filesForValidation = fs
      .readdirSync(directoryPath)
      .filter((file) => file.endsWith('.json') || file.endsWith('.txt'))
      // Sorts the file names numerically ensuring that files are ordered naturally (e.g., '1', '2', '10' instead of '1', '10', '2').
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] ?? '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] ?? '0', 10);
        return numA - numB;
      });
    if (filesForValidation.length === 0) {
      return {
        isValid: false,
        errors: [
          {
            general: [dictionary.validation.directoryIsEmpty],
          },
        ],
      };
    }

    for (const file of filesForValidation) {
      const filePath = path.join(directoryPath, file);
      const validationResult = this.validateLocalFile(filePath);

      if (!validationResult.isValid) {
        errors.push({
          fileName: file,
          general: validationResult.errors,
        });
      }
    }

    return { isValid: errors.length === 0, errors };
  }

  static validateOnChainArrayOfObjects = (
    metadataObjects: MetadataOnChainObjects[]
  ): { isValid: boolean; errors: Array<{ serialNumber: number; message: string[] }> } => {
    const errors: Array<{ serialNumber: number; message: string[] }> = [];

    metadataObjects.forEach((obj) => {
      if (obj.error) {
        errors.push({
          serialNumber: obj.serialNumber,
          message: [obj.error],
        });
      } else if (obj.metadata) {
        try {
          validateObjectWithSchema(Hip412MetadataCSVSchema, obj.metadata, validationMetadataErrorOptions);
        } catch (e) {
          errors.push({
            serialNumber: obj.serialNumber,
            message: [errorToMessage(e)],
          });
        }
      }
    });

    return { isValid: errors.length === 0, errors };
  };

  static async validateMetadataFromOnChainCollection(network: NetworkName, tokenId: string, ipfsGateway?: string, limit: number = 100) {
    const nfts = await getNFTsFromToken(network, tokenId, limit);
    const decodedMetadataArray = uriDecoder(nfts, ipfsGateway);

    const metadataObjects = await Promise.all(
      decodedMetadataArray.map(async ({ metadata, serialNumber }) => {
        return getMetadataObjectsForValidation(metadata, serialNumber);
      })
    );

    const validationResponse = Hip412Validator.validateOnChainArrayOfObjects(metadataObjects);
    return validationResponse;
  }

  static async validateSingleOnChainNFTMetadata(network: NetworkName, tokenId: string, serialNumber: number, ipfsGateway?: string) {
    const nft = await getSingleNFTDetails(network, tokenId, serialNumber);
    const decodedNFTMetadataURL = uriDecoder(nft, ipfsGateway);

    const metadataObject = await getMetadataObjectsForValidation(decodedNFTMetadataURL[0].metadata, decodedNFTMetadataURL[0].serialNumber);

    if (!metadataObject.metadata) {
      return {
        isValid: false,
        errors: {
          general: [metadataObject.error],
          missingAttributes: [],
        },
      };
    }
    const validationResponse = Hip412Validator.validateSingleMetadataObject(metadataObject.metadata);

    return validationResponse;
  }
}
