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
import { Client, PrivateKey } from '@hashgraph/sdk';
import { CustomFeeType } from './create-collection.module';

export type sharedMintingValidationProps = {
  batchSize?: number;
  tokenId?: string;
  amount?: number;
  metaData?: string;
  supplyKey?: PrivateKey;
};

export type uniqueMintingValidationProps = {
  batchSize?: number;
  tokenId?: string;
  supplyKey?: PrivateKey;
  pathToMetadataURIsFile?: string;
  metadataArray?: string[];
};

export type increaseNFTSupplyValidationProps = {
  nftId?: NftId;
  batchSize?: number;
  amount?: number;
  supplyKey?: PrivateKey;
};

export type validateCreateCollectionProps = {
  client?: Client;
  collectionName?: string;
  collectionSymbol?: string;
  treasuryAccountPrivateKey?: string;
  treasuryAccount?: string;
  customFees?: CustomFeeType[];
};

export type fixedFeeValidationProps = {
  collectorAccountId?: string;
  hbarAmount?: number;
  amount?: number;
  denominatingTokenId?: string;
};

export type royaltyFeeValidationProps = {
  collectorAccountId?: string;
  numerator: number;
  denominator: number;
};
