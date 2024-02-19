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
import { nftSDK, operatorPrivateKey } from './e2e-consts';
import { PrivateKey } from '@hashgraph/sdk';
import { LONG_E2E_TIMEOUT } from '../__mocks__/consts';
import { mintToken } from '../../nftSDKFunctions/mint-token';
import { estimateNftMintingInHbar } from '../../nftSDKFunctions/estimate-nft-minting-in-hbar';
import { AVERAGE_COST_OF_MINT_1_AVERAGE_METADATA_JSON } from '../../utils/constants/minting';

afterAll(async () => {
  nftSDK.client.close();
});

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

        const mintTokenReceipt = await mintToken(
          new Array(amount).fill('www.youtube.com'),
          tokenId,
          PrivateKey.fromString(operatorPrivateKey),
          nftSDK.client
        );
        const exchangeRateInDollars = mintTokenReceipt.exchangeRate!.exchangeRateInCents / 100;

        const estimatedCost = await estimateNftMintingInHbar({
          amountOfNfts: amount,
          network: 'testnet',
        });

        const expectedCost =
          (mintTokenReceipt.totalSupply.toString() * AVERAGE_COST_OF_MINT_1_AVERAGE_METADATA_JSON) / exchangeRateInDollars;

        expect(tokenId).toBeDefined();
        expect(mintTokenReceipt).toBeDefined();
        expect(expectedCost).toEqual(estimatedCost);
      },
      LONG_E2E_TIMEOUT
    );
  });
});
