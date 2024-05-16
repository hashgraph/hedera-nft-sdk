"use strict";

var _consts = require("../__mocks__/consts");
var _e2eConsts = require("./e2e-consts");
var _sdk = require("@hashgraph/sdk");
var _getHolderAndDuration = require("../../get-holder-and-duration");
/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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

afterAll(async () => {
  _e2eConsts.nftSDK.client.close();
});
let tokenId = '';
let baseNFT = [];
beforeAll(async () => {
  tokenId = await _e2eConsts.nftSDK.createCollection({
    collectionName: 'test_name',
    collectionSymbol: 'test_symbol'
  });
  baseNFT = await _e2eConsts.nftSDK.mintUniqueMetadata({
    tokenId,
    batchSize: 10,
    metadata: ['www.youtube.com'],
    supplyKey: _e2eConsts.operatorPrivateKey
  });
  await new Promise(resolve => setTimeout(resolve, _consts.MIRROR_NODE_DELAY));
}, _consts.LONG_E2E_TIMEOUT);
describe('getHolderAndDuration', () => {
  it('should return holder and duration of an NFT that has been minted successfully', async () => {
    const result = await (0, _getHolderAndDuration.getHolderAndDuration)({
      tokenId,
      serialNumber: baseNFT[0].serialNumber,
      network: 'testnet'
    });
    const holderSinceDate = new Date(result.holderSince);
    const today = new Date();
    expect(holderSinceDate.getFullYear()).toEqual(today.getFullYear());
    expect(holderSinceDate.getMonth()).toEqual(today.getMonth());
    expect(holderSinceDate.getDate()).toEqual(today.getDate());
    expect(result).toEqual({
      holder: _e2eConsts.operatorAccountId,
      holderSince: expect.any(String)
    });
  }, _consts.LONG_E2E_TIMEOUT);
  it('should return holder and duration of an NFT that has been transferred to another account successfully', async () => {
    const nftSerial = baseNFT[0].serialNumber;
    const nftId = new _sdk.NftId(_sdk.TokenId.fromString(tokenId), nftSerial);

    // Associate a token to an account
    const associateTransaction = new _sdk.TokenAssociateTransaction().setAccountId(_e2eConsts.secondAccountId).setTokenIds([_sdk.TokenId.fromString(tokenId)]).freezeWith(_e2eConsts.nftSDK.client);
    const associateSignTx = await associateTransaction.sign(_e2eConsts.secondPrivateKey);
    await associateSignTx.execute(_e2eConsts.nftSDK.client);

    // Transfer created NFT from first acc to second acc
    const transaction = new _sdk.TransferTransaction().addNftTransfer(nftId, _sdk.AccountId.fromString(_e2eConsts.operatorAccountId), _sdk.AccountId.fromString(_e2eConsts.secondAccountId)).freezeWith(_e2eConsts.nftSDK.client);
    const signTx = await transaction.sign(_e2eConsts.operatorPrivateKey);
    await signTx.execute(_e2eConsts.nftSDK.client);
    await new Promise(resolve => setTimeout(resolve, _consts.LONG_MIRROR_NODE_DELAY));
    const result = await (0, _getHolderAndDuration.getHolderAndDuration)({
      tokenId,
      serialNumber: nftSerial,
      network: 'testnet'
    });
    const holderSinceDate = new Date(result.holderSince);
    const today = new Date();
    expect(holderSinceDate.getFullYear()).toEqual(today.getFullYear());
    expect(holderSinceDate.getMonth()).toEqual(today.getMonth());
    expect(holderSinceDate.getDate()).toEqual(today.getDate());
    expect(result).toEqual({
      holder: _e2eConsts.secondAccountId,
      holderSince: expect.any(String)
    });
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=get-holder-and-duration-e2e.test.js.map