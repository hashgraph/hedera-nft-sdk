"use strict";

var _sdk = require("@hashgraph/sdk");
var _e2eConsts = require("../e2e-consts");
var _consts = require("../../__mocks__/consts");
var _getTokenInfo = require("../../../utils/hedera/get-token-info");
var _dateFns = require("date-fns");
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

describe('createCollectionFunction e2e', () => {
  it('creates a collection', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol'
    });
    expect(tokenId).toBeDefined();
  }, _consts.MIRROR_NODE_DELAY);
  it('creates a collection with Admin Key', async () => {
    const adminKey = _sdk.PrivateKey.generateED25519();
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_admin',
      collectionSymbol: 'test_symbol_admin',
      keys: {
        admin: adminKey
      }
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenId).toBeDefined();
    expect(tokenInfo.adminKey?.toString()).toEqual(adminKey.publicKey.toStringDer());
  }, _consts.LONG_E2E_TIMEOUT);
  it('creates a collection with different treasury account', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_treasury',
      collectionSymbol: 'test_symbol_treasury',
      treasuryAccountPrivateKey: _e2eConsts.secondPrivateKey,
      treasuryAccount: _e2eConsts.secondAccountId
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenId).toBeDefined();
    expect(tokenInfo.treasuryAccountId?.toString()).toEqual(_e2eConsts.secondAccountId);
  }, _consts.LONG_E2E_TIMEOUT);
  it('creates a collection with expiration time', async () => {
    const expirationTime = (0, _dateFns.add)(new Date(), {
      days: 1
    });
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_expiration_time',
      collectionSymbol: 'TNET',
      treasuryAccountPrivateKey: _e2eConsts.secondPrivateKey,
      treasuryAccount: _e2eConsts.secondAccountId,
      expirationTime: expirationTime
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenInfo.expirationTime).toBeDefined();
    expect(tokenInfo.expirationTime?.toDate()).toEqual(new Date(expirationTime.setMilliseconds(0)));
  }, _consts.LONG_E2E_TIMEOUT);

  //This test is failing because of the issue in the Hedera SDK. When the issue is resolved, this test should be enabled (remove .failing).
  it.failing('creates a collection with auto renew account and period', async () => {
    const expectedAutoRenewPeriod = (0, _dateFns.millisecondsToSeconds)((0, _dateFns.milliseconds)({
      days: 30
    }));
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_auto_renew_account_and_period',
      collectionSymbol: 'TNATRAAP',
      treasuryAccountPrivateKey: _e2eConsts.secondPrivateKey,
      treasuryAccount: _e2eConsts.secondAccountId,
      autoRenewPeriod: expectedAutoRenewPeriod,
      autoRenewAccount: _e2eConsts.secondAccountId,
      autoRenewAccountPrivateKey: _e2eConsts.secondPrivateKey
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenInfo.autoRenewAccountId).toBeDefined();
    expect(tokenInfo.autoRenewAccountId?.toString()).toEqual(_e2eConsts.secondAccountId);
    expect(tokenInfo.autoRenewPeriod).toBeDefined();
    expect(tokenInfo.autoRenewPeriod?.seconds).toEqual(new _sdk.Long(expectedAutoRenewPeriod, 0));
  }, _consts.LONG_E2E_TIMEOUT);
  it('creates a collection with auto renew period', async () => {
    const expectedAutoRenewPeriod = (0, _dateFns.millisecondsToSeconds)((0, _dateFns.milliseconds)({
      days: 30
    }));
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_auto_renew_period',
      collectionSymbol: 'TNARP',
      treasuryAccountPrivateKey: _e2eConsts.secondPrivateKey,
      treasuryAccount: _e2eConsts.secondAccountId,
      autoRenewPeriod: expectedAutoRenewPeriod
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenInfo.autoRenewPeriod).toBeDefined();
    expect(tokenInfo.autoRenewPeriod?.seconds).toEqual(new _sdk.Long(expectedAutoRenewPeriod, 0));
  }, _consts.LONG_E2E_TIMEOUT);
  it('creates a collection with memo', async () => {
    const expectedMemo = 'test_memo';
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_memo',
      collectionSymbol: 'TNM',
      treasuryAccountPrivateKey: _e2eConsts.secondPrivateKey,
      treasuryAccount: _e2eConsts.secondAccountId,
      memo: expectedMemo
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenInfo.tokenMemo).toBeDefined();
    expect(tokenInfo.tokenMemo).toEqual(expectedMemo);
  }, _consts.LONG_E2E_TIMEOUT);
  it('creates a collection with a specified maxSupply', async () => {
    const maxSupply = 10;
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_max_supply',
      collectionSymbol: 'TMAXSUP',
      treasuryAccountPrivateKey: _e2eConsts.secondPrivateKey,
      treasuryAccount: _e2eConsts.secondAccountId,
      maxSupply
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenInfo.maxSupply).toBeDefined();
    expect(tokenInfo.maxSupply.toNumber()).toEqual(maxSupply);
  }, _consts.LONG_E2E_TIMEOUT);
  it('creates a collection with all types of keys', async () => {
    const adminKey = _sdk.PrivateKey.generateED25519();
    const kycKey = _sdk.PrivateKey.generateED25519();
    const freezeKey = _sdk.PrivateKey.generateED25519();
    const wipeKey = _sdk.PrivateKey.generateED25519();
    const supplyKey = _sdk.PrivateKey.generateED25519();
    const feeScheduleKey = _sdk.PrivateKey.generateED25519();
    const pauseKey = _sdk.PrivateKey.generateED25519();
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_all_keys',
      collectionSymbol: 'TNALLKEYS',
      treasuryAccountPrivateKey: _e2eConsts.secondPrivateKey,
      treasuryAccount: _e2eConsts.secondAccountId,
      keys: {
        admin: adminKey,
        KYC: kycKey,
        freeze: freezeKey,
        wipe: wipeKey,
        supply: supplyKey,
        feeSchedule: feeScheduleKey,
        pause: pauseKey
      }
    });
    const tokenInfo = await (0, _getTokenInfo.getTokenInfo)(tokenId, _e2eConsts.nftSDK.client);
    expect(tokenInfo.adminKey?.toString()).toEqual(adminKey.publicKey.toStringDer());
    expect(tokenInfo.kycKey?.toString()).toEqual(kycKey.publicKey.toStringDer());
    expect(tokenInfo.freezeKey?.toString()).toEqual(freezeKey.publicKey.toStringDer());
    expect(tokenInfo.wipeKey?.toString()).toEqual(wipeKey.publicKey.toStringDer());
    expect(tokenInfo.supplyKey?.toString()).toEqual(supplyKey.publicKey.toStringDer());
    expect(tokenInfo.feeScheduleKey?.toString()).toEqual(feeScheduleKey.publicKey.toStringDer());
    expect(tokenInfo.pauseKey?.toString()).toEqual(pauseKey.publicKey.toStringDer());
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=create-collection-e2e.test.js.map