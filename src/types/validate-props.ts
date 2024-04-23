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
import { PrivateKey } from '@hashgraph/sdk';
import { CustomFeeType } from './create-collection';

export type sharedMintingValidationProps = {
  batchSize: number;
  tokenId: string;
  amount: number;
  metaData: string;
  supplyKey: PrivateKey;
};

export type uniqueMintingValidationProps = {
  batchSize: number;
  tokenId: string;
  supplyKey: PrivateKey;
  pathToMetadataURIsFile?: string;
  metadataArray?: string[];
};

export type increaseNFTSupplyValidationProps = {
  batchSize: number;
  amount: number;
};

export type validateCreateCollectionProps = {
  collectionName: string;
  collectionSymbol: string;
  treasuryAccountPrivateKey?: PrivateKey;
  treasuryAccount?: string;
  customFees?: CustomFeeType[];
  expirationTime?: Date;
  autoRenewAccount?: string;
  autoRenewAccountPrivateKey?: PrivateKey;
  autoRenewPeriod?: number;
  memo?: string;
};

export type fixedFeeValidationProps = {
  collectorAccountId: string;
  hbarAmount?: number;
  amount?: number;
  denominatingTokenId?: string;
};

export type royaltyFeeValidationProps = {
  collectorAccountId: string;
  numerator: number;
  denominator: number;
};
