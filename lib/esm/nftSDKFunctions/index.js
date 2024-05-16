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

import { createCollectionFunction } from './create-collection';
import { increaseNFTSupply } from './increase-nft-supply';
import { logIn } from './log-in';
import { mintSharedMetadataFunction } from './mint-shared-metadata-function';
import { mintUniqueMetadataFunction } from './mint-unique-metadata-function';
import { estimateNftMintingInHbar } from './estimate-nft-minting-in-hbar';
import { estimateNftMintingInDollars } from './estimate-nft-minting-in-dollars';
import { estimateCreateCollectionInDollars } from './estimate-create-collection-in-dollars';
import { estimateCreateCollectionInHbar } from './estimate-create-collection-in-hbar';
export class HederaNFTSDK {
  constructor(accountId, privateKey, network, localNode, localMirrorNode, mirrorNodeUrl) {
    this.accountId = accountId;
    this.privateKey = privateKey;
    this.client = logIn({
      myAccountId: accountId,
      myPrivateKey: privateKey,
      network: network,
      localNode: localNode,
      localMirrorNode: localMirrorNode
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
    memo
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
      memo
    });
  }
  estimateCreateCollectionInDollars({
    collectionName,
    collectionSymbol,
    treasuryAccountPrivateKey,
    treasuryAccount,
    keys,
    customFees
  }) {
    return estimateCreateCollectionInDollars({
      collectionName,
      collectionSymbol,
      keys,
      treasuryAccount,
      treasuryAccountPrivateKey,
      customFees
    });
  }
  estimateCreateCollectionInHbar({
    collectionName,
    collectionSymbol,
    treasuryAccountPrivateKey,
    treasuryAccount,
    keys,
    customFees
  }) {
    return estimateCreateCollectionInHbar({
      collectionName,
      collectionSymbol,
      keys,
      treasuryAccount,
      treasuryAccountPrivateKey,
      customFees,
      network: this.network,
      mirrorNodeUrl: this.mirrorNodeUrl
    });
  }
  estimateNftMintingInHbar({
    amountOfNfts
  }) {
    return estimateNftMintingInHbar({
      amountOfNfts,
      mirrorNodeUrl: this.mirrorNodeUrl,
      network: this.network
    });
  }
  estimateNftMintingInDollars({
    amountOfNfts
  }) {
    return estimateNftMintingInDollars({
      amountOfNfts
    });
  }
  mintSharedMetadata({
    tokenId,
    amount,
    batchSize = 5,
    metaData,
    supplyKey
  }) {
    return mintSharedMetadataFunction({
      client: this.client,
      tokenId,
      amount,
      batchSize,
      metaData,
      supplyKey: supplyKey ? supplyKey : this.privateKey
    });
  }
  mintUniqueMetadata({
    tokenId,
    batchSize = 5,
    supplyKey,
    pathToMetadataURIsFile,
    metadata
  }) {
    return mintUniqueMetadataFunction({
      client: this.client,
      tokenId,
      batchSize,
      supplyKey: supplyKey,
      pathToMetadataURIsFile,
      metadataArray: metadata
    });
  }
  increaseNFTSupply({
    nftId,
    amount,
    batchSize = 5,
    supplyKey
  }) {
    return increaseNFTSupply({
      client: this.client,
      network: this.network,
      nftId,
      amount,
      batchSize,
      supplyKey: supplyKey ? supplyKey : this.privateKey,
      mirrorNodeUrl: this.mirrorNodeUrl
    });
  }
}
//# sourceMappingURL=index.js.map