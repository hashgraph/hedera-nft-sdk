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
import { PrivateKey } from '@hashgraph/sdk';
import { nftSDK, secondAccountId, secondPrivateKey } from './e2e-consts';
import { HederaNFTSDK } from '../../index';
import { myAccountId, myPrivateKey } from '../__mocks__/consts';
import { getTokenInfo } from '../../utils/hedera/get-token-info';

beforeEach(async () => {
  new HederaNFTSDK(myAccountId, myPrivateKey);
});

afterAll(async () => {
  nftSDK.client.close();
});

describe('createCollectionFunction e2e', () => {
  it('creates a collection', async () => {
    const tokenId = await nftSDK.createCollection('test_name', 'test_symbol');

    expect(tokenId).toBeDefined();
  });

  it('creates a collection with Admin Key', async () => {
    const adminKey = PrivateKey.generateED25519();
    const tokenId = await nftSDK.createCollection('test_name_admin', 'test_symbol_admin', undefined, undefined, {
      admin: adminKey,
    });

    const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);

    expect(tokenId).toBeDefined();
    expect(tokenInfo.adminKey?.toString()).toEqual(adminKey.publicKey.toStringDer());
  });

  it('creates a collection with different treasury account', async () => {
    const tokenId = await nftSDK.createCollection('test_name_treasury', 'test_symbol_treasury', secondPrivateKey, secondAccountId);

    const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);

    expect(tokenId).toBeDefined();
    expect(tokenInfo.treasuryAccountId?.toString()).toEqual(secondAccountId);
  });
});
