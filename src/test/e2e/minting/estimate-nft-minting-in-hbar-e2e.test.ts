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
import { nftSDK } from '../e2e-consts';
import { Hbar, TokenMintTransaction } from '@hashgraph/sdk';
import { LONG_E2E_TIMEOUT } from '../../__mocks__/consts';
import { estimateNftMintingInHbar } from '../../../nftSDKFunctions/estimate-nft-minting-in-hbar';
import { mintingMaxTransactionFee } from '../../../utils/const';
import { roundToPrecision } from '../../helpers/round-to-precision';
import { isWithinAcceptableDifference } from '../../helpers/is-within-acceptable-difference';

describe('mintSharedMetadata function e2e', () => {
  const testCases = [{ amount: 1 }, { amount: 3 }, { amount: 10 }];

  testCases.forEach(({ amount }) => {
    it(
      `Creating a token and minting ${amount} NFTs into it. Then checking estimated cost`,
      async () => {
        const tokenId = await nftSDK.createCollection({
          collectionName: 'test_name',
          collectionSymbol: 'test_symbol',
        });

        const metaData = new Array(amount).fill('www.youtube.com');
        const CIDs = metaData.map((metaData) => Buffer.from(metaData));

        const transaction = new TokenMintTransaction()
          .setTokenId(tokenId)
          .setMaxTransactionFee(new Hbar(mintingMaxTransactionFee))
          .setMetadata(CIDs)
          .freezeWith(nftSDK.client);

        const txResponse = await transaction.execute(nftSDK.client);
        const record = await txResponse.getRecord(nftSDK.client);

        const estimatedHbarNumber = await estimateNftMintingInHbar({
          amountOfNfts: amount,
          network: 'testnet',
        });
        const estimatedHbars = new Hbar(roundToPrecision(estimatedHbarNumber, 6));

        const transactionFeeHbars = record.transactionFee.toTinybars().toNumber();
        const estimatedHbarsValue = estimatedHbars.toTinybars().toNumber();

        expect(tokenId).toBeDefined();
        expect(record.transactionId).toBeDefined();
        expect(record.transactionFee).toBeDefined();
        expect(isWithinAcceptableDifference(estimatedHbarsValue, transactionFeeHbars)).toBe(true);
      },
      LONG_E2E_TIMEOUT
    );
  });
});
