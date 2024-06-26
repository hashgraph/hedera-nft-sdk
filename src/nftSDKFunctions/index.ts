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
import { Client, NftId, PrivateKey } from '@hashgraph/sdk';
import { CreateCollectionKeysType, CustomFeeType } from '../types/create-collection';
import { Network } from '../types/mint-token';
import { createCollectionFunction } from './create-collection';
import { increaseNFTSupply } from './increase-nft-supply';
import { logIn } from './log-in';
import { mintSharedMetadataFunction } from './mint-shared-metadata-function';
/**
 * Function below is not fully browser supported
 * @browserUnsupported
 */
import { mintUniqueMetadataFunction } from './mint-unique-metadata-function';
import { LocalNode } from '../types/login';
import { estimateNftMintingInHbar } from './estimate-nft-minting-in-hbar';
import { estimateNftMintingInDollars } from './estimate-nft-minting-in-dollars';
/**
 * Package below is not browser supported
 * @browserUnsupported
 */
import { estimateCreateCollectionInDollars } from './estimate-create-collection-in-dollars';
/**
 * Package below is not browser supported
 * @browserUnsupported
 */
import { estimateCreateCollectionInHbar } from './estimate-create-collection-in-hbar';

export class HederaNFTSDK {
  accountId: string;
  privateKey: PrivateKey;
  client: Client;
  network: Network;
  mirrorNodeUrl?: string;

  constructor(
    accountId: string,
    privateKey: PrivateKey,
    network: Network,
    localNode?: LocalNode,
    localMirrorNode?: string,
    mirrorNodeUrl?: string
  ) {
    this.accountId = accountId;
    this.privateKey = privateKey;
    this.client = logIn({
      myAccountId: accountId,
      myPrivateKey: privateKey,
      network: network,
      localNode: localNode,
      localMirrorNode: localMirrorNode,
    });
    this.network = network;
    this.mirrorNodeUrl = mirrorNodeUrl;
  }

  createCollection({
    collectionName,
    collectionSymbol,
    treasuryAccountPrivateKey,
    treasuryAccount,
    keys,
    maxSupply,
    customFees,
    expirationTime,
    autoRenewAccount,
    autoRenewAccountPrivateKey,
    autoRenewPeriod,
    memo,
    metadata,
  }: {
    collectionName: string;
    collectionSymbol: string;
    treasuryAccountPrivateKey?: PrivateKey;
    treasuryAccount?: string;
    keys?: CreateCollectionKeysType;
    maxSupply?: number;
    customFees?: CustomFeeType[];
    expirationTime?: Date;
    autoRenewAccount?: string;
    autoRenewAccountPrivateKey?: PrivateKey;
    autoRenewPeriod?: number;
    memo?: string;
    metadata?: string;
  }) {
    return createCollectionFunction({
      client: this.client,
      collectionName,
      collectionSymbol,
      keys,
      myPrivateKey: this.privateKey,
      treasuryAccount,
      treasuryAccountPrivateKey,
      maxSupply,
      customFees,
      expirationTime,
      autoRenewAccount,
      autoRenewAccountPrivateKey,
      autoRenewPeriod,
      memo,
      metadata,
    });
  }

  estimateCreateCollectionInDollars({
    collectionName,
    collectionSymbol,
    treasuryAccountPrivateKey,
    treasuryAccount,
    keys,
    customFees,
  }: {
    collectionName: string;
    collectionSymbol: string;
    treasuryAccountPrivateKey?: PrivateKey;
    treasuryAccount?: string;
    keys?: CreateCollectionKeysType;
    customFees?: CustomFeeType[];
  }) {
    return estimateCreateCollectionInDollars({
      collectionName,
      collectionSymbol,
      keys,
      treasuryAccount,
      treasuryAccountPrivateKey,
      customFees,
    });
  }

  estimateCreateCollectionInHbar({
    collectionName,
    collectionSymbol,
    treasuryAccountPrivateKey,
    treasuryAccount,
    keys,
    customFees,
  }: {
    collectionName: string;
    collectionSymbol: string;
    treasuryAccountPrivateKey?: PrivateKey;
    treasuryAccount?: string;
    keys?: CreateCollectionKeysType;
    customFees?: CustomFeeType[];
  }) {
    return estimateCreateCollectionInHbar({
      collectionName,
      collectionSymbol,
      keys,
      treasuryAccount,
      treasuryAccountPrivateKey,
      customFees,
      network: this.network,
      mirrorNodeUrl: this.mirrorNodeUrl,
    });
  }

  estimateNftMintingInHbar({ amountOfNfts }: { amountOfNfts: number }) {
    return estimateNftMintingInHbar({ amountOfNfts, mirrorNodeUrl: this.mirrorNodeUrl, network: this.network });
  }

  estimateNftMintingInDollars({ amountOfNfts }: { amountOfNfts: number }) {
    return estimateNftMintingInDollars({ amountOfNfts });
  }

  mintSharedMetadata({
    tokenId,
    amount,
    batchSize = 5,
    metaData,
    supplyKey,
  }: {
    tokenId: string;
    amount: number;
    batchSize?: number;
    metaData: string;
    supplyKey?: PrivateKey;
  }) {
    return mintSharedMetadataFunction({
      client: this.client,
      tokenId,
      amount,
      batchSize,
      metaData,
      supplyKey: supplyKey ? supplyKey : this.privateKey,
    });
  }

  mintUniqueMetadata({
    tokenId,
    batchSize = 5,
    supplyKey,
    metadata,
  }: {
    tokenId: string;
    batchSize?: number;
    supplyKey: PrivateKey;
    metadata: string[];
  }) {
    return mintUniqueMetadataFunction({
      client: this.client,
      tokenId,
      batchSize,
      supplyKey: supplyKey,
      metadataArray: metadata,
    });
  }

  increaseNFTSupply({
    nftId,
    amount,
    batchSize = 5,
    supplyKey,
  }: {
    nftId: NftId;
    amount: number;
    batchSize?: number;
    supplyKey?: PrivateKey;
  }) {
    return increaseNFTSupply({
      client: this.client,
      network: this.network,
      nftId,
      amount,
      batchSize,
      supplyKey: supplyKey ? supplyKey : this.privateKey,
      mirrorNodeUrl: this.mirrorNodeUrl,
    });
  }
}
