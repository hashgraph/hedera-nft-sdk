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
import { AccountId, TokenId } from '@hashgraph/sdk';
import { dictionary } from './constants/dictionary';
const MAX_CUSTOM_FEES_NUMBER = 10;
const MAX_BATCH_SIZE_NUMBER = 10;
const MIN_BATCH_SIZE_NUMBER = 1;
const MIN_AMOUNT_NUMBER = 1;
export const validatePropsForSharedNFTMinting = props => {
  validateBatchSize(props.batchSize);
  validTokenId(props.tokenId);
  validateAmount(props.amount);
  validateMetaData(props);
};
export const validatePropsForUniqueNFTMinting = props => {
  validateMetadataForUnique(props);
  validateBatchSize(props.batchSize);
  validTokenId(props.tokenId);
};
export const validatePropsForCreateCollection = props => {
  validateAccountAndPrivateKey(props);
  if (props.treasuryAccount) validAccountId(props.treasuryAccount);
  if (props.treasuryAccountPrivateKey) props.treasuryAccountPrivateKey;
  validateAutoRenewAccount(props);
  if (props.autoRenewAccount) validAccountId(props.autoRenewAccount);
  if (props.autoRenewAccountPrivateKey) props.autoRenewAccountPrivateKey;
  validateCollectionSymbol(props);
  validateCollectionName(props);
  validateCustomFees(props);
};
export const validatePropsForFixedFeeFunction = props => {
  validAccountId(props.collectorAccountId);
  hbarAmountOrAmountAndDenominatingToken(props);
};
export const validatePropsForRoyaltyFeeFunction = props => {
  validAccountId(props.collectorAccountId);
};
export const validatePropsForIncreaseNFTSupply = props => {
  validateBatchSize(props.batchSize);
  validateAmount(props.amount);
};
const hbarAmountOrAmountAndDenominatingToken = props => {
  if (props.hbarAmount && (props.amount || props.denominatingTokenId) || !props.hbarAmount && (!props.amount || !props.denominatingTokenId)) {
    throw new Error(dictionary.createCollection.hbarAmountOrAmountAndDenominatingToken);
  }
};
const validateCustomFees = props => {
  if (Object.prototype.hasOwnProperty.call(props, 'collectionSymbol')) {
    if (props.customFees && props.customFees.length > MAX_CUSTOM_FEES_NUMBER) throw new Error(dictionary.hederaActions.tooManyCustomFees);
  }
};
const validTokenId = tokenId => {
  try {
    TokenId.fromString(tokenId);
  } catch (error) {
    throw new Error(dictionary.hederaActions.cannotParseTokenId);
  }
};
const validAccountId = accountId => {
  if (!accountId) throw new Error(dictionary.hederaActions.cannotParseAccountId);
  try {
    AccountId.fromString(accountId);
  } catch (error) {
    throw new Error(dictionary.hederaActions.cannotParseAccountId);
  }
};
const validateAccountAndPrivateKey = props => {
  if (Object.prototype.hasOwnProperty.call(props, 'treasuryAccount') || Object.prototype.hasOwnProperty.call(props, 'treasuryAccountPrivateKey')) {
    if (props.treasuryAccount && !props.treasuryAccountPrivateKey || !props.treasuryAccount && props.treasuryAccountPrivateKey) {
      throw new Error(dictionary.createCollection.treasuryAccountPrivateKeySignRequired);
    }
  }
};
const validateAutoRenewAccount = props => {
  if (Object.prototype.hasOwnProperty.call(props, 'autoRenewAccount') || Object.prototype.hasOwnProperty.call(props, 'autoRenewAccountPrivateKey')) {
    if (props.autoRenewAccount && !props.autoRenewAccountPrivateKey || !props.autoRenewAccount && props.autoRenewAccountPrivateKey) {
      throw new Error(dictionary.createCollection.autoRenewAccountPrivateKeySignRequired);
    }
  }
};
const validateCollectionSymbol = props => {
  if (!props.collectionSymbol) throw new Error(dictionary.createCollection.collectionSymbolRequired);
};
const validateCollectionName = props => {
  if (!props.collectionName) throw new Error(dictionary.createCollection.collectionNameRequired);
};
const validateBatchSize = batchSize => {
  if (batchSize > MAX_BATCH_SIZE_NUMBER) throw new Error(dictionary.hederaActions.maxBatchSize);
  if (batchSize < MIN_BATCH_SIZE_NUMBER) throw new Error(dictionary.hederaActions.minBatchSize);
};
const validateAmount = amount => {
  if (!amount || amount < MIN_AMOUNT_NUMBER) throw new Error(dictionary.hederaActions.minAmount);
};
const validateMetaData = props => {
  if (Object.prototype.hasOwnProperty.call(props, 'metaData')) {
    if (!props.metaData) throw new Error(dictionary.hederaActions.metadataRequired);
  }
};
const validateMetadataForUnique = props => {
  if ((!Object.prototype.hasOwnProperty.call(props, 'metadataArray') || !props.metadataArray) && (!Object.prototype.hasOwnProperty.call(props, 'pathToMetadataURIsFile') || !props.pathToMetadataURIsFile)) {
    throw new Error(dictionary.mintToken.csvOrArrayRequired);
  }
};
//# sourceMappingURL=validate-props.js.map