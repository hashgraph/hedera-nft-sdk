"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCollectionFunction = void 0;
var _sdk = require("@hashgraph/sdk");
var _dictionary = require("../utils/constants/dictionary");
var _validateProps = require("../utils/validate-props");
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

const createCollectionFunction = async _ref => {
  let {
    client,
    myPrivateKey,
    collectionName,
    collectionSymbol,
    keys,
    treasuryAccount,
    treasuryAccountPrivateKey,
    maxSupply,
    customFees,
    expirationTime,
    autoRenewAccount,
    autoRenewAccountPrivateKey,
    autoRenewPeriod,
    memo
  } = _ref;
  (0, _validateProps.validatePropsForCreateCollection)({
    collectionName,
    collectionSymbol,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees,
    expirationTime,
    autoRenewAccount,
    autoRenewAccountPrivateKey,
    autoRenewPeriod,
    memo
  });
  const treasuryAccountId = treasuryAccount ? treasuryAccount : client.getOperator().accountId;
  const treasuryAccountPrivateKeyId = treasuryAccountPrivateKey ? treasuryAccountPrivateKey : myPrivateKey;
  let transaction = new _sdk.TokenCreateTransaction().setTokenName(collectionName).setTokenSymbol(collectionSymbol).setTokenType(_sdk.TokenType.NonFungibleUnique).setSupplyKey(keys?.supply || myPrivateKey).setTreasuryAccountId(treasuryAccountId);
  if (keys?.admin) {
    transaction = transaction.setAdminKey(keys?.admin);
  }
  if (keys?.KYC) {
    transaction = transaction.setKycKey(keys?.KYC);
  }
  if (keys?.freeze) {
    transaction = transaction.setFreezeKey(keys?.freeze);
  }
  if (keys?.wipe) {
    transaction = transaction.setWipeKey(keys?.wipe);
  }
  if (keys?.feeSchedule) {
    transaction = transaction.setFeeScheduleKey(keys?.feeSchedule);
  }
  if (keys?.pause) {
    transaction = transaction.setPauseKey(keys?.pause);
  }
  if (maxSupply) {
    transaction = transaction.setSupplyType(_sdk.TokenSupplyType.Finite);
    transaction = transaction.setMaxSupply(maxSupply);
  }
  if (customFees) {
    transaction = transaction.setCustomFees(customFees);
  }
  if (expirationTime) {
    transaction = transaction.setExpirationTime(expirationTime);
  }
  if (autoRenewAccount) {
    transaction = transaction.setAutoRenewAccountId(_sdk.AccountId.fromString(autoRenewAccount));
  }
  if (autoRenewPeriod) {
    transaction = transaction.setAutoRenewPeriod(autoRenewPeriod);
  }
  if (memo) {
    transaction = transaction.setTokenMemo(memo);
  }
  transaction = transaction.freezeWith(client);
  let signTx = await transaction.sign(treasuryAccountPrivateKeyId);
  if (keys?.admin) {
    signTx = await transaction.sign(keys?.admin);
  }
  if (autoRenewAccountPrivateKey) {
    signTx = await transaction.sign(autoRenewAccountPrivateKey);
  }
  const txResponse = await signTx.execute(client);
  const receipt = await txResponse.getReceipt(client);
  if (!receipt.tokenId) {
    throw new Error(_dictionary.dictionary.createCollection.collectionNotCreated);
  }
  return receipt.tokenId.toString();
};
exports.createCollectionFunction = createCollectionFunction;
//# sourceMappingURL=create-collection.js.map