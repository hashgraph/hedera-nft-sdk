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

import { LONG_E2E_TIMEOUT, LONG_MIRROR_NODE_DELAY, MIRROR_NODE_DELAY } from '../__mocks__/consts';
import { nftSDK, operatorAccountId, operatorPrivateKey, secondAccountId, secondPrivateKey } from './e2e-consts';
import { AccountId, NftId, TokenAssociateTransaction, TokenId, TransferTransaction } from '@hashgraph/sdk';
import { getHolderAndDuration } from '../../get-holder-and-duration';
afterAll(async () => {
  nftSDK.client.close();
});
let tokenId = '';
let baseNFT = [];
beforeAll(async () => {
  tokenId = await nftSDK.createCollection({
    collectionName: 'test_name',
    collectionSymbol: 'test_symbol'
  });
  baseNFT = await nftSDK.mintUniqueMetadata({
    tokenId,
    batchSize: 10,
    metadata: ['www.youtube.com'],
    supplyKey: operatorPrivateKey
  });
  await new Promise(resolve => setTimeout(resolve, MIRROR_NODE_DELAY));
}, LONG_E2E_TIMEOUT);
describe('getHolderAndDuration', () => {
  it('should return holder and duration of an NFT that has been minted successfully', async () => {
    const result = await getHolderAndDuration({
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
      holder: operatorAccountId,
      holderSince: expect.any(String)
    });
  }, LONG_E2E_TIMEOUT);
  it('should return holder and duration of an NFT that has been transferred to another account successfully', async () => {
    const nftSerial = baseNFT[0].serialNumber;
    const nftId = new NftId(TokenId.fromString(tokenId), nftSerial);

    // Associate a token to an account
    const associateTransaction = new TokenAssociateTransaction().setAccountId(secondAccountId).setTokenIds([TokenId.fromString(tokenId)]).freezeWith(nftSDK.client);
    const associateSignTx = await associateTransaction.sign(secondPrivateKey);
    await associateSignTx.execute(nftSDK.client);

    // Transfer created NFT from first acc to second acc
    const transaction = new TransferTransaction().addNftTransfer(nftId, AccountId.fromString(operatorAccountId), AccountId.fromString(secondAccountId)).freezeWith(nftSDK.client);
    const signTx = await transaction.sign(operatorPrivateKey);
    await signTx.execute(nftSDK.client);
    await new Promise(resolve => setTimeout(resolve, LONG_MIRROR_NODE_DELAY));
    const result = await getHolderAndDuration({
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
      holder: secondAccountId,
      holderSince: expect.any(String)
    });
  }, LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=get-holder-and-duration-e2e.test.js.map