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
import { Client, CustomFixedFee, CustomRoyaltyFee, Key, PrivateKey } from '@hashgraph/sdk';

export type CustomFeeType = CustomFixedFee | CustomRoyaltyFee;

export type CreateCollectionKeysType = {
  admin?: PrivateKey;
  KYC?: Key;
  freeze?: Key;
  wipe?: Key;
  supply?: Key;
  feeSchedule?: Key;
  pause?: Key;
  metadataKey?: Key;
};

export interface SocialLink {
  url: string;
  label: string;
  info?: string;
}

export type CreateCollectionType = {
  client: Client;
  myPrivateKey: PrivateKey;
  collectionName: string;
  collectionSymbol: string;
  keys?: CreateCollectionKeysType;
  treasuryAccount?: string;
  treasuryAccountPrivateKey?: PrivateKey;
  maxSupply?: number;
  customFees?: CustomFeeType[];
  expirationTime?: Date;
  autoRenewAccount?: string;
  autoRenewAccountPrivateKey?: PrivateKey;
  autoRenewPeriod?: number;
  memo?: string;
  metadata?: string;
};
