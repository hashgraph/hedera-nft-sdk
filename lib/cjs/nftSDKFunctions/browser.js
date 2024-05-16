"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HederaNFTSDK = void 0;
var _createCollection = require("./create-collection");
var _increaseNftSupply = require("./increase-nft-supply");
var _logIn = require("./log-in");
var _mintSharedMetadataFunction = require("./mint-shared-metadata-function");
var _mintUniqueMetadataFunction = require("./mint-unique-metadata-function.browser");
var _estimateNftMintingInHbar = require("./estimate-nft-minting-in-hbar");
var _estimateNftMintingInDollars = require("./estimate-nft-minting-in-dollars");
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

class HederaNFTSDK /** Browser */ {
  constructor(accountId, privateKey, network, localNode, localMirrorNode, mirrorNodeUrl) {
    this.accountId = accountId;
    this.privateKey = privateKey;
    this.client = (0, _logIn.logIn)({
      myAccountId: accountId,
      myPrivateKey: privateKey,
      network: network,
      localNode: localNode,
      localMirrorNode: localMirrorNode
    });
    this.network = network;
    this.mirrorNodeUrl = mirrorNodeUrl;
  }
  createCollection(_ref) {
    let {
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
    } = _ref;
    return (0, _createCollection.createCollectionFunction)({
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
  estimateCreateCollectionInDollars(_) {
    throw new Error('No estimateCreateCollectionInDollars browser implementation');
  }
  estimateCreateCollectionInHbar(_) {
    throw new Error('No estimateCreateCollectionInHbar browser implementation');
  }
  estimateNftMintingInHbar(_ref2) {
    let {
      amountOfNfts
    } = _ref2;
    return (0, _estimateNftMintingInHbar.estimateNftMintingInHbar)({
      amountOfNfts,
      mirrorNodeUrl: this.mirrorNodeUrl,
      network: this.network
    });
  }
  estimateNftMintingInDollars(_ref3) {
    let {
      amountOfNfts
    } = _ref3;
    return (0, _estimateNftMintingInDollars.estimateNftMintingInDollars)({
      amountOfNfts
    });
  }
  mintSharedMetadata(_ref4) {
    let {
      tokenId,
      amount,
      batchSize = 5,
      metaData,
      supplyKey
    } = _ref4;
    return (0, _mintSharedMetadataFunction.mintSharedMetadataFunction)({
      client: this.client,
      tokenId,
      amount,
      batchSize,
      metaData,
      supplyKey: supplyKey ? supplyKey : this.privateKey
    });
  }
  mintUniqueMetadata(_ref5) {
    let {
      tokenId,
      batchSize = 5,
      supplyKey,
      pathToMetadataURIsFile,
      metadata
    } = _ref5;
    return (0, _mintUniqueMetadataFunction.mintUniqueMetadataFunction)({
      client: this.client,
      tokenId,
      batchSize,
      supplyKey: supplyKey,
      pathToMetadataURIsFile,
      metadataArray: metadata
    });
  }
  increaseNFTSupply(_ref6) {
    let {
      nftId,
      amount,
      batchSize = 5,
      supplyKey
    } = _ref6;
    return (0, _increaseNftSupply.increaseNFTSupply)({
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
exports.HederaNFTSDK = HederaNFTSDK;
//# sourceMappingURL=browser.js.map