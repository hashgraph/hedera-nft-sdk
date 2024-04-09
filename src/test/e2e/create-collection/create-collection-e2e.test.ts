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
import { Long, PrivateKey } from '@hashgraph/sdk';
import { nftSDK, secondAccountId, secondPrivateKey } from '../e2e-consts';
import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../../__mocks__/consts';
import { getTokenInfo } from '../../../utils/hedera/get-token-info';
import { add, milliseconds, millisecondsToSeconds } from 'date-fns';

describe('createCollectionFunction e2e', () => {
  it(
    'creates a collection',
    async () => {
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol',
      });

      expect(tokenId).toBeDefined();
    },
    MIRROR_NODE_DELAY
  );

  it(
    'creates a collection with Admin Key',
    async () => {
      const adminKey = PrivateKey.generateED25519();
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_admin',
        collectionSymbol: 'test_symbol_admin',
        keys: {
          admin: adminKey,
        },
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);

      expect(tokenId).toBeDefined();
      expect(tokenInfo.adminKey?.toString()).toEqual(adminKey.publicKey.toStringDer());
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'creates a collection with different treasury account',
    async () => {
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_treasury',
        collectionSymbol: 'test_symbol_treasury',
        treasuryAccountPrivateKey: secondPrivateKey,
        treasuryAccount: secondAccountId,
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);

      expect(tokenId).toBeDefined();
      expect(tokenInfo.treasuryAccountId?.toString()).toEqual(secondAccountId);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'creates a collection with expiration time',
    async () => {
      const expirationTime = add(new Date(), { days: 1 });
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_expiration_time',
        collectionSymbol: 'TNET',
        treasuryAccountPrivateKey: secondPrivateKey,
        treasuryAccount: secondAccountId,
        expirationTime: expirationTime,
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);
      expect(tokenInfo.expirationTime).toBeDefined();
      expect(tokenInfo.expirationTime?.toDate()).toEqual(new Date(expirationTime.setMilliseconds(0)));
    },
    LONG_E2E_TIMEOUT
  );

  //This test is failing because of the issue in the Hedera SDK. When the issue is resolved, this test should be enabled (remove .failing).
  it.failing(
    'creates a collection with auto renew account and period',
    async () => {
      const expectedAutoRenewPeriod = millisecondsToSeconds(milliseconds({ days: 30 }));
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_auto_renew_account_and_period',
        collectionSymbol: 'TNATRAAP',
        treasuryAccountPrivateKey: secondPrivateKey,
        treasuryAccount: secondAccountId,
        autoRenewPeriod: expectedAutoRenewPeriod,
        autoRenewAccount: secondAccountId,
        autoRenewAccountPrivateKey: secondPrivateKey,
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);
      expect(tokenInfo.autoRenewAccountId).toBeDefined();
      expect(tokenInfo.autoRenewAccountId?.toString()).toEqual(secondAccountId);
      expect(tokenInfo.autoRenewPeriod).toBeDefined();
      expect(tokenInfo.autoRenewPeriod?.seconds).toEqual(new Long(expectedAutoRenewPeriod, 0));
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'creates a collection with auto renew period',
    async () => {
      const expectedAutoRenewPeriod = millisecondsToSeconds(milliseconds({ days: 30 }));
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_auto_renew_period',
        collectionSymbol: 'TNARP',
        treasuryAccountPrivateKey: secondPrivateKey,
        treasuryAccount: secondAccountId,
        autoRenewPeriod: expectedAutoRenewPeriod,
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);
      expect(tokenInfo.autoRenewPeriod).toBeDefined();
      expect(tokenInfo.autoRenewPeriod?.seconds).toEqual(new Long(expectedAutoRenewPeriod, 0));
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'creates a collection with memo',
    async () => {
      const expectedMemo = 'test_memo';
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_memo',
        collectionSymbol: 'TNM',
        treasuryAccountPrivateKey: secondPrivateKey,
        treasuryAccount: secondAccountId,
        memo: expectedMemo,
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);
      expect(tokenInfo.tokenMemo).toBeDefined();
      expect(tokenInfo.tokenMemo).toEqual(expectedMemo);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'creates a collection with a specified maxSupply',
    async () => {
      const maxSupply = 10;
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_max_supply',
        collectionSymbol: 'TMAXSUP',
        treasuryAccountPrivateKey: secondPrivateKey,
        treasuryAccount: secondAccountId,
        maxSupply,
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);
      expect(tokenInfo.maxSupply).toBeDefined();
      expect(tokenInfo.maxSupply.toNumber()).toEqual(maxSupply);
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'creates a collection with all types of keys',
    async () => {
      const adminKey = PrivateKey.generateED25519();
      const kycKey = PrivateKey.generateED25519();
      const freezeKey = PrivateKey.generateED25519();
      const wipeKey = PrivateKey.generateED25519();
      const supplyKey = PrivateKey.generateED25519();
      const feeScheduleKey = PrivateKey.generateED25519();
      const pauseKey = PrivateKey.generateED25519();

      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_all_keys',
        collectionSymbol: 'TNALLKEYS',
        treasuryAccountPrivateKey: secondPrivateKey,
        treasuryAccount: secondAccountId,
        keys: {
          admin: adminKey,
          KYC: kycKey,
          freeze: freezeKey,
          wipe: wipeKey,
          supply: supplyKey,
          feeSchedule: feeScheduleKey,
          pause: pauseKey,
        },
      });

      const tokenInfo = await getTokenInfo(tokenId, nftSDK.client);
      expect(tokenInfo.adminKey?.toString()).toEqual(adminKey.publicKey.toStringDer());
      expect(tokenInfo.kycKey?.toString()).toEqual(kycKey.publicKey.toStringDer());
      expect(tokenInfo.freezeKey?.toString()).toEqual(freezeKey.publicKey.toStringDer());
      expect(tokenInfo.wipeKey?.toString()).toEqual(wipeKey.publicKey.toStringDer());
      expect(tokenInfo.supplyKey?.toString()).toEqual(supplyKey.publicKey.toStringDer());
      expect(tokenInfo.feeScheduleKey?.toString()).toEqual(feeScheduleKey.publicKey.toStringDer());
      expect(tokenInfo.pauseKey?.toString()).toEqual(pauseKey.publicKey.toStringDer());
    },
    LONG_E2E_TIMEOUT
  );
});
