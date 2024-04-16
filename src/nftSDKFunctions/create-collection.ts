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
import { AccountId, PrivateKey, TokenCreateTransaction, TokenSupplyType, TokenType } from '@hashgraph/sdk';
import { dictionary } from '../utils/constants/dictionary';
import { CreateCollectionType } from '../types/create-collection';
import { validatePropsForCreateCollection } from '../utils/validate-props';
import { getPrivateKeyFromString } from '../helpers/get-private-key-from-string';

export const createCollectionFunction = async ({
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
  memo,
}: CreateCollectionType): Promise<string> => {
  validatePropsForCreateCollection({
    collectionName,
    collectionSymbol,
    treasuryAccount,
    treasuryAccountPrivateKey,
    customFees,
    expirationTime,
    autoRenewAccount,
    autoRenewAccountPrivateKey,
    autoRenewPeriod,
    memo,
  });

  const treasuryAccountId = treasuryAccount ? AccountId.fromString(treasuryAccount) : client.getOperator()!.accountId;
  const treasuryAccountPrivateKeyId = treasuryAccountPrivateKey
    ? getPrivateKeyFromString(treasuryAccountPrivateKey)
    : getPrivateKeyFromString(myPrivateKey);

  let transaction = new TokenCreateTransaction()
    .setTokenName(collectionName)
    .setTokenSymbol(collectionSymbol)
    .setTokenType(TokenType.NonFungibleUnique)
    .setSupplyKey(keys?.supply || getPrivateKeyFromString(myPrivateKey))
    .setTreasuryAccountId(treasuryAccountId);

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
    transaction = transaction.setSupplyType(TokenSupplyType.Finite);
    transaction = transaction.setMaxSupply(maxSupply);
  }

  if (customFees) {
    transaction = transaction.setCustomFees(customFees);
  }

  if (expirationTime) {
    transaction = transaction.setExpirationTime(expirationTime);
  }

  if (autoRenewAccount) {
    transaction = transaction.setAutoRenewAccountId(AccountId.fromString(autoRenewAccount));
  }

  if (autoRenewPeriod) {
    transaction = transaction.setAutoRenewPeriod(autoRenewPeriod);
  }

  if (memo) {
    transaction = transaction.setTokenMemo(memo);
  }

  transaction = transaction.freezeWith(client);

  let signTx = await transaction.sign(<PrivateKey>treasuryAccountPrivateKeyId);

  if (keys?.admin) {
    signTx = await transaction.sign(<PrivateKey>keys?.admin);
  }

  if (autoRenewAccountPrivateKey) {
    signTx = await transaction.sign(getPrivateKeyFromString(autoRenewAccountPrivateKey));
  }

  const txResponse = await signTx.execute(client);

  const receipt = await txResponse.getReceipt(client);

  if (!receipt.tokenId) {
    throw new Error(dictionary.createCollection.collectionNotCreated);
  }

  return receipt.tokenId.toString();
};
