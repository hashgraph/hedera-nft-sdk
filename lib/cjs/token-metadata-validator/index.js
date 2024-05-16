"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenMetadataValidator = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _hip412MetadataSchema = require("../utils/validation-schemas/hip412-metadata-schema");
var _validateObjectWithSchema = require("../helpers/validate-object-with-schema");
var _errorToMessage = require("../helpers/error-to-message");
var _dictionary = require("../utils/constants/dictionary");
var _mirrorNode = require("../api/mirror-node");
var _uriDecoder = require("../helpers/uri-decoder");
var _validationError = require("../utils/validation-error");
var _getNftMetadatasFromCollection = require("../helpers/get-nft-metadatas-from-collection");
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

class TokenMetadataValidator {
  static validateSingleMetadataObject(object) {
    const errors = [];
    try {
      (0, _validateObjectWithSchema.validateObjectWithSchema)(_hip412MetadataSchema.Hip412MetadataSchema, object, _validateObjectWithSchema.validationMetadataErrorOptions);
    } catch (err) {
      if (err instanceof _validationError.ValidationError) {
        errors.push(...err.errors);
      } else {
        errors.push((0, _errorToMessage.errorToMessage)(err));
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
        (0, _validateObjectWithSchema.validateObjectWithSchema)(_hip412MetadataSchema.Hip412MetadataSchema, metadataObject, _validateObjectWithSchema.validationMetadataErrorOptions);
      } catch (e) {
        allObjectsValid = false;
        const errorMessage = (0, _errorToMessage.errorToMessage)(e);
        if (e instanceof _validationError.ValidationError) {
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
  static validateLocalFile(filePath) {
    try {
      const fileContent = _fs.default.readFileSync(filePath, 'utf8');
      const object = JSON.parse(fileContent);
      return this.validateSingleMetadataObject(object);
    } catch (error) {
      return {
        isValid: false,
        errors: [(0, _errorToMessage.errorToMessage)(error)]
      };
    }
  }
  static validateLocalDirectory(directoryPath) {
    const errors = [];
    const filesForValidation = _fs.default.readdirSync(directoryPath).filter(file => file.endsWith('.json') || file.endsWith('.txt'))
    // Sorts the file names numerically ensuring that files are ordered naturally (e.g., '1', '2', '10' instead of '1', '10', '2').
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] ?? '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] ?? '0', 10);
      return numA - numB;
    });
    if (filesForValidation.length === 0) {
      return {
        isValid: false,
        errors: [{
          general: [_dictionary.dictionary.validation.directoryIsEmpty]
        }]
      };
    }
    for (const file of filesForValidation) {
      const filePath = _path.default.join(directoryPath, file);
      const validationResult = this.validateLocalFile(filePath);
      if (!validationResult.isValid) {
        errors.push({
          fileName: file,
          general: validationResult.errors
        });
      }
    }
    return {
      isValid: errors.length === 0,
      errors
    };
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
          (0, _validateObjectWithSchema.validateObjectWithSchema)(_hip412MetadataSchema.Hip412MetadataSchema, obj.metadata, _validateObjectWithSchema.validationMetadataErrorOptions);
        } catch (e) {
          errors.push({
            serialNumber: obj.serialNumber,
            message: [(0, _errorToMessage.errorToMessage)(e)]
          });
        }
      }
    });
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  static async validateMetadataFromOnChainCollection(network, tokenId, ipfsGateway) {
    let limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
    const metadataObjects = await (0, _getNftMetadatasFromCollection.getNftMetadataFromCollection)(network, tokenId, limit, ipfsGateway);
    return TokenMetadataValidator.validateOnChainArrayOfObjects(metadataObjects);
  }
  static async validateSingleOnChainNFTMetadata(network, tokenId, serialNumber, ipfsGateway) {
    const nft = await (0, _mirrorNode.getSingleNFTDetails)(network, tokenId, serialNumber);
    const decodedNFTMetadataURL = (0, _uriDecoder.uriDecoder)(nft, ipfsGateway);
    const metadataObject = await (0, _mirrorNode.getMetadataObjectsForValidation)(decodedNFTMetadataURL[0].metadata, decodedNFTMetadataURL[0].serialNumber);
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
exports.TokenMetadataValidator = TokenMetadataValidator;
//# sourceMappingURL=index.js.map