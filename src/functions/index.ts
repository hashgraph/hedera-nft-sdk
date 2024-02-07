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
import { CreateCollectionKeysType } from '../types/create-collection.module';
import { createCollectionFunction } from './create-collection';
import { logIn } from './log-in';
import { createJsonMetadataFromCSV } from './create-json-metadata-from-csv';
import { mintSharedMetadataFunction } from './mint-shared-metadata-function';
import { JsonMetadataFromCSVInterface } from '../types/json-metadata-from-csv.module';

export class HederaNFTSDK {
  accountId: string;
  privateKey: string;
  client: Client;

  constructor(accountId: string, privateKey: string) {
    this.accountId = accountId;
    this.privateKey = privateKey;
    this.client = logIn({ myAccountId: accountId, myPrivateKey: privateKey });
  }

  createCollection(
    collectionName: string,
    collectionSymbol: string,
    treasuryAccountPrivateKey?: string,
    treasuryAccount?: string,
    keys?: CreateCollectionKeysType,
    maxSupply?: number
  ) {
    return createCollectionFunction({
      client: this.client,
      collectionName,
      collectionSymbol,
      keys,
      myPrivateKey: this.privateKey,
      treasuryAccount,
      treasuryAccountPrivateKey,
      maxSupply,
    });
  }

  createJsonMetadataFromCSV(
    savedJsonFilesLocation: string,
    csvFilePath: string,
    nftsLimit?: number
  ): Promise<JsonMetadataFromCSVInterface> {
    return createJsonMetadataFromCSV({
      savedJsonFilesLocation,
      csvFilePath,
      nftsLimit,
    });
  }

  mintSharedMetadata(tokenId: string, amount: number, batchSize: number = 5, metaData: string, supplyKey?: PrivateKey) {
    return mintSharedMetadataFunction({
      client: this.client,
      tokenId,
      amount,
      batchSize,
      metaData,
      supplyKey: supplyKey || PrivateKey.fromString(this.privateKey),
    });
  }
}
