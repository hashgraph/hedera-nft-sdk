/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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
export type { Validator } from './validator';
export { defaultSchemaVersion } from './validator';
/**
 * Function below is not browser supported
 * @browserUnsupported
 */
export { localValidation } from './local-validation';
export { defaultWeights, defaultRiskLevels, calculateRiskScoreFromData, calculateRiskScoreFromTokenId, calculateRiskLevel } from './risk';
export { calculateRarity, calculateRarityFromData, calculateTraitOccurrenceFromData, calculateRarityFromOnChainData } from './rarity';

export type { Attribute, Localization, File, Instance, Error, Problem, ValidationResult, Schema } from './types/validator';
export type { NFTFile, NFTAttribute, ValueObject, AttributeConfig, RarityResult, TraitOccurrence } from './types/rarity';
export type {
  WeightKeys,
  WeightProperties,
  Weights,
  KeyTypes,
  RiskLevels,
  RiskLevel,
  Metadata,
  RiskResult,
  RiskScoreFactors,
} from './types/risk';
export type { CSVRow, MetadataObject } from './types/csv';
export type {
  FileValidationResult,
  DetailedFileValidationResult,
  ValidateArrayOfObjectsResult,
  DirectoryValidationResult,
  MetadataError,
  MetadataOnChainObjects,
} from './types/hip412-validator';
export { PrivateKey } from '@hashgraph/sdk';

export { HederaNFTSDK } from './nftSDKFunctions';
export { FeeFactory } from './feeFactory';
export { TokenMetadataValidator } from './token-metadata-validator';
export { Hip412MetadataBuilder } from './hip412-metadata-builder';
export { NftStorageService } from './services/file-storages/nft-storage/nft-storage-service';
export { PinataService } from './services/file-storages/pinata/pinata-service';
export { AWSService } from './services/file-storages/aws/aws-service';
export { MockStorageService } from './services/file-storages/mock-storage/mock-storage-service';
export { UploadService } from './services/upload-service';
/**
 * Function below is not browser supported
 * @browserUnsupported
*/
// export { convertCSVToMetadataObjects } from './file-management/convert-csv-to-metadata-objects';
/**
 * Function below is not browser supported
 * @browserUnsupported
*/
// export { convertMetadataObjectsToJsonFiles } from './file-management/convert-metadata-objects-to-json-files';
export { prepareMetadataObjectsFromCSVRows } from './file-management/prepare-metadata-objects-from-csv-rows';
export { getHolderAndDuration } from './get-holder-and-duration';

