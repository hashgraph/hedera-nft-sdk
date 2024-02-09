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
import { PropsType, validateCreateCollectionProps, uniqueMintingValidationProps } from '../types/validate-props.module';
import { dictionary } from './constants/dictionary';

export const validateProps = (props: PropsType) => {
  validateSupplyKey(props);
  validateBatchSize(props);
  validateTokenId(props);
  validateAmount(props);
  validateMetaData(props);
};

export const validatePropsForUniqueNFTMinting = (props: uniqueMintingValidationProps) => {
  validateMetadataForUnique(props);
  validateBatchSize(props);
  validateTokenId(props);
  validateSupplyKey(props);
};

export const validatePropsForCreateCollection = (props: validateCreateCollectionProps) => {
  validateAccountAndPrivateKey(props);
  validateCollectionSymbol(props);
  validateCollectionName(props);
  validateClient(props);
};

const validateAccountAndPrivateKey = (props: validateCreateCollectionProps) => {
  if (
    Object.prototype.hasOwnProperty.call(props, 'treasuryAccount') ||
    Object.prototype.hasOwnProperty.call(props, 'treasuryAccountPrivateKey')
  ) {
    if ((props.treasuryAccount && !props.treasuryAccountPrivateKey) || (!props.treasuryAccount && props.treasuryAccountPrivateKey)) {
      throw new Error(dictionary.hederaActions.treasuryAccountPrivateKeySignRequired);
    }
  }
};

const validateCollectionSymbol = (props: validateCreateCollectionProps) => {
  if (Object.prototype.hasOwnProperty.call(props, 'collectionSymbol')) {
    if (!props.collectionSymbol) throw new Error(dictionary.hederaActions.collectionSymbolRequired);
  }
};

const validateCollectionName = (props: validateCreateCollectionProps) => {
  if (Object.prototype.hasOwnProperty.call(props, 'collectionName')) {
    if (!props.collectionName) throw new Error(dictionary.hederaActions.collectionNameRequired);
  }
};

const validateClient = (props: validateCreateCollectionProps) => {
  if (Object.prototype.hasOwnProperty.call(props, 'client')) {
    if (!props.client) throw new Error(dictionary.hederaActions.clientRequired);
  }
};

const validateSupplyKey = (props: PropsType) => {
  if (Object.prototype.hasOwnProperty.call(props, 'supplyKey')) {
    if (!props.supplyKey) throw new Error(dictionary.hederaActions.supplyKeyRequired);
  }
};

const validateBatchSize = (props: PropsType) => {
  if (Object.prototype.hasOwnProperty.call(props, 'batchSize')) {
    if (!props.batchSize) throw new Error(dictionary.mintToken.batchSizeUndefined);
    if (props.batchSize > 10) throw new Error(dictionary.hederaActions.maxBatchSize);
    if (props.batchSize < 1) throw new Error(dictionary.hederaActions.minBatchSize);
  }
};

const validateTokenId = (props: PropsType) => {
  if (Object.prototype.hasOwnProperty.call(props, 'tokenId')) {
    if (!props.tokenId) throw new Error(dictionary.hederaActions.tokenIdRequired);
  }
};

const validateAmount = (props: PropsType) => {
  if (Object.prototype.hasOwnProperty.call(props, 'amount')) {
    if (!props.amount || props.amount < 1) throw new Error(dictionary.hederaActions.minAmount);
  }
};

const validateMetaData = (props: PropsType) => {
  if (Object.prototype.hasOwnProperty.call(props, 'metaData')) {
    if (!props.metaData) throw new Error(dictionary.hederaActions.metadataRequired);
  }
};

const validateMetadataForUnique = (props: uniqueMintingValidationProps) => {
  if (
    (!Object.prototype.hasOwnProperty.call(props, 'metadataArray') || !props.metadataArray) &&
    (!Object.prototype.hasOwnProperty.call(props, 'pathToMetadataURIsFile') || !props.pathToMetadataURIsFile)
  ) {
    throw new Error(dictionary.mintToken.csvOrArrayRequired);
  }
};
