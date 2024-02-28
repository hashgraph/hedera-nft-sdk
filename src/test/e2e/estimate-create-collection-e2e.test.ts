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
import { nftSDK, operatorAccountId, operatorPrivateKey } from './e2e-consts';
import { estimateCreateCollectionInHbar } from '../../nftSDKFunctions/estimate-create-collection-in-hbar';
import { Hbar, PrivateKey, TokenCreateTransaction, TokenType } from '@hashgraph/sdk';

const ACCEPTABLE_DIFFERENCE_PERCENT = 0.01;

const toFixedWithoutRounding = (number: number, precision: number) => {
  const scale = Math.pow(10, precision);
  return Math.floor(number * scale) / scale;
};

const isWithinThreePercent = (estimatedHbarsValue: number, transactionFeeHbars: number): boolean => {
  const difference = Math.abs(transactionFeeHbars - estimatedHbarsValue);
  const acceptableDifference = Math.abs(transactionFeeHbars * ACCEPTABLE_DIFFERENCE_PERCENT);

  return difference <= acceptableDifference;
};

afterAll(async () => {
  nftSDK.client.close();
});

describe('estimateCreateCollectionInHbarE2E', () => {
  it('should work properly with default values', async () => {
    const name = 'test';
    const symbol = 'test2';

    const estimatedHbarNumber = await estimateCreateCollectionInHbar({
      collectionName: name,
      network: 'testnet',
      collectionSymbol: symbol,
    });

    const estimatedHbars = new Hbar(toFixedWithoutRounding(estimatedHbarNumber, 6));

    const createToken = new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setSupplyKey(PrivateKey.fromString(operatorPrivateKey))
      .setTreasuryAccountId(operatorAccountId);
    const txResponse = await createToken.execute(nftSDK.client);
    const record = await txResponse.getRecord(nftSDK.client);

    expect(record.transactionId).toBeDefined();
    expect(record.transactionFee).toBeDefined();

    const transactionFeeHbars = record.transactionFee.toTinybars().toNumber();
    const estimatedHbarsValue = estimatedHbars.toTinybars().toNumber();

    expect(isWithinThreePercent(estimatedHbarsValue, transactionFeeHbars)).toBe(true);
  });
});
