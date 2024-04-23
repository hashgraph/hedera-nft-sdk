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
import { Validator, defaultSchemaVersion } from './validator';
import localValidation from './local-validation';
import { defaultWeights, defaultRiskLevels, calculateRiskScoreFromData, calculateRiskScoreFromTokenId, calculateRiskLevel } from './risk';
import { calculateRarity, calculateRarityFromData, calculateTraitOccurrenceFromData, calculateRarityFromOnChainData } from './rarity';

import { Attribute, Localization, File, Instance, Error, Problem, ValidationResult, Schema } from './types/validator';
import { NFTFile, NFTAttribute, ValueObject, AttributeConfig, RarityResult, TraitOccurrence } from './types/rarity';
import {
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
import type { CSVRow, MetadataObject } from './types/csv';
import type {
  FileValidationResult,
  DetailedFileValidationResult,
  ValidateArrayOfObjectsResult,
  DirectoryValidationResult,
  MetadataError,
  MetadataOnChainObjects,
} from './types/hip412-validator';
import { PrivateKey } from '@hashgraph/sdk';

import { HederaNFTSDK } from './nftSDKFunctions';
import { FeeFactory } from './feeFactory';
import { Hip412Validator } from './hip412-validator';
import { Hip412MetadataBuilder } from './hip412-metadata-builder';
import { NftStorageService } from './services/file-storages/nft-storage/nft-storage-service';
import { PinataService } from './services/file-storages/pinata/pinata-service';
import { AWSService } from './services/file-storages/aws/aws-service';
import { MockStorageService } from './services/file-storages/mock-storage/mock-storage-service';
import { UploadService } from './services/upload-service';
import { convertCSVToMetadataObjects } from './file-management/convert-csv-to-metadata-objects';
import { convertMetadataObjectsToJsonFiles } from './file-management/convert-metadata-objects-to-json-files';
import { prepareMetadataObjectsFromCSVRows } from './file-management/prepare-metadata-objects-from-csv-rows';
import { getHolderAndDuration } from './get-holder-and-duration';

export {
  // validation
  Validator,
  defaultSchemaVersion,

  // local validation
  localValidation,

  // risk score
  defaultWeights,
  defaultRiskLevels,
  calculateRiskScoreFromData,
  calculateRiskScoreFromTokenId,
  calculateRiskLevel,

  // rarity calculation
  calculateRarity,
  calculateRarityFromData,
  calculateTraitOccurrenceFromData,
  calculateRarityFromOnChainData,

  // file management
  convertCSVToMetadataObjects,
  convertMetadataObjectsToJsonFiles,
  prepareMetadataObjectsFromCSVRows,

  // getHolderAndDuration
  getHolderAndDuration,

  // interfaces
  Attribute,
  Localization,
  File,
  Instance,
  Error,
  Problem,
  ValidationResult,
  Schema,
  NFTFile,
  NFTAttribute,
  ValueObject,
  AttributeConfig,
  RarityResult,
  WeightKeys,
  WeightProperties,
  Weights,
  KeyTypes,
  RiskLevels,
  RiskLevel,
  RiskScoreFactors,
  Metadata,
  RiskResult,
  TraitOccurrence,
  MetadataObject,
  CSVRow,
  FileValidationResult,
  ValidateArrayOfObjectsResult,
  DetailedFileValidationResult,
  DirectoryValidationResult,
  MetadataError,
  MetadataOnChainObjects,

  // NFTSDK
  HederaNFTSDK,
  FeeFactory,
  Hip412Validator,
  Hip412MetadataBuilder,

  // Upload Service
  UploadService,

  // Storages
  NftStorageService,
  PinataService,
  AWSService,
  MockStorageService,

  // hashgraph/sdk
  PrivateKey,
};
