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
import { CreateCollectionKeysType, CustomFeeType } from './create-collection';

export type UsageComponents = 'node' | 'network' | 'service';
export type UsageKeys = 'constant' | 'bpt' | 'vpt' | 'rbh' | 'sbh' | 'gas' | 'bpr' | 'sbpr' | 'min' | 'max';
export type HederaUsage = Record<UsageComponents, Partial<Record<UsageKeys, number>>>;
export type Formulae = Record<UsageComponents, Partial<Record<UsageKeys, string>>>;

export type EstimateCreateCollectionType = {
  collectionName: string;
  collectionSymbol: string;
  keys?: CreateCollectionKeysType;
  treasuryAccount?: string;
  treasuryAccountPrivateKey?: PrivateKey;
  customFees?: CustomFeeType[];
};

export type EstimateCreateCollectionInHbarsType = EstimateCreateCollectionType & {
  mirrorNodeUrl?: string;
  network: string;
};

export interface TokenCreateUsage {
  numSigsPayer: number;
  numSigsTotal: number;
  numAdminKeys: number;
  numKycKeys: number;
  numWipeKeys: number;
  numSupplyKeys: number;
  numPauseKeys: number;
  numFreezeKeys: number;
  expirationHours: number;
  tokenNameSize: number;
  tokenSymbolSize: number;
  memoSize: number;
  isAutoRenewAccountSet: boolean | number;
}

export interface TokenCreateWithFeesUsage extends TokenCreateUsage {
  numFixedHbarCustomFees: number;
  numFixedHtsCustomFees: number;
  numRoyaltyNoFallbackCustomFees: number;
  numRoyaltyHbarFallbackCustomFees: number;
  numRoyaltyHtsFallbackCustomFees: number;
}

export type Usage = TokenCreateUsage | TokenCreateWithFeesUsage;

export interface TokenCreateUsageProps {
  collectionName: string;
  collectionSymbol: string;
  treasuryAccount?: string;
  keys?: CreateCollectionKeysType;
}

export interface FeeToolConfig {
  formulae: Formulae;
  feeSchedules: HederaUsage;
}

export interface HbarPrice {
  priceInDollars: number;
  timestamp: string;
}

interface Rate {
  cent_equivalent: number;
  expiration_time: number;
  hbar_equivalent: number;
}

export interface HbarExchangeRate {
  current_rate: Rate;
  next_rate: Rate;
  timestamp: string;
}
