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
import { Client, CustomFee, NftId, PrivateKey } from '@hashgraph/sdk';
import { CreateCollectionKeysType } from '../types/create-collection.module';
import { JsonMetadataFromCSVInterface } from '../types/json-metadata-from-csv.module';
import { Network } from '../types/mint-token.module';
import { createCollectionFunction } from './create-collection';
import { createJsonMetadataFromCSV } from './create-json-metadata-from-csv';
import { increaseNFTSupply } from './increase-nft-supply';
import { logIn } from './log-in';
import { mintSharedMetadataFunction } from './mint-shared-metadata-function';
import { mintUniqueMetadataFunction } from './mint-unique-metadata-function';
import { LocalNode } from '../types/login.module';

export class HederaNFTSDK {
  accountId: string;
  privateKey: string;
  client: Client;
  network: Network;

  constructor(accountId: string, privateKey: string, network: Network, localNode?: LocalNode, localMirrorNode?: string) {
    this.accountId = accountId;
    this.privateKey = privateKey;
    this.client = logIn({ myAccountId: accountId, myPrivateKey: privateKey, network: network, localNode: localNode, localMirrorNode: localMirrorNode });
    this.network = network;
  }

  createCollection({
    collectionName,
    collectionSymbol,
    treasuryAccountPrivateKey,
    treasuryAccount,
    keys,
    maxSupply,
    customFees,
  }: {
    collectionName: string;
    collectionSymbol: string;
    treasuryAccountPrivateKey?: string;
    treasuryAccount?: string;
    keys?: CreateCollectionKeysType;
    maxSupply?: number;
    customFees?: CustomFee[];
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
    });
  }

  createJsonMetadataFromCSV({
    savedJsonFilesLocation,
    csvFilePath,
    nftsLimit,
  }: {
    savedJsonFilesLocation: string;
    csvFilePath: string;
    nftsLimit?: number;
  }): Promise<JsonMetadataFromCSVInterface> {
    return createJsonMetadataFromCSV({
      savedJsonFilesLocation,
      csvFilePath,
      nftsLimit,
    });
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
      supplyKey: supplyKey || PrivateKey.fromString(this.privateKey),
    });
  }

  mintUniqueMetadata({
    tokenId,
    batchSize = 5,
    supplyKey,
    pathToMetadataURIsFile,
    metadata,
  }: {
    tokenId: string;
    batchSize?: number;
    supplyKey: PrivateKey;
    pathToMetadataURIsFile?: string;
    metadata?: string[];
  }) {
    return mintUniqueMetadataFunction({
      client: this.client,
      tokenId,
      batchSize,
      supplyKey,
      pathToMetadataURIsFile,
      metadataArray: metadata,
    });
  }

  increaseNFTSupply({
    nftId,
    amount,
    batchSize = 5,
    supplyKey,
    mirrorNodeUrl,
  }: {
    nftId: NftId;
    amount: number;
    batchSize?: number;
    supplyKey?: PrivateKey;
    mirrorNodeUrl?: string;
  }) {
    return increaseNFTSupply({
      client: this.client,
      network: this.network,
      nftId,
      amount,
      batchSize,
      supplyKey: supplyKey || PrivateKey.fromString(this.privateKey),
      mirrorNodeUrl,
    });
  }
}
