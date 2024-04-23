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
import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../../__mocks__/consts';
import { nftSDK, operatorPrivateKey } from '../e2e-consts';
import { NftId, TokenId, TokenNftInfoQuery } from '@hashgraph/sdk';

describe('increaseNFTSupply function e2e', () => {
  const testCases = [{ amount: 1 }, { amount: 3 }, { amount: 10 }];

  testCases.forEach(({ amount }) => {
    it(
      `Increasing a token supply by ${amount}`,
      async () => {
        const tokenId = await nftSDK.createCollection({
          collectionName: 'test_name',
          collectionSymbol: 'test_symbol',
        });
        const baseNFT = await nftSDK.mintUniqueMetadata({
          tokenId,
          batchSize: 10,
          metadata: ['www.youtube.com'],
          supplyKey: operatorPrivateKey,
        });
        const nftInfo = await new TokenNftInfoQuery()
          .setNftId(new NftId(TokenId.fromString(tokenId), baseNFT[0].serialNumber))
          .execute(nftSDK.client);

        //wait for the collection and nfts to be available on mirror node
        await new Promise((r) => setTimeout(r, MIRROR_NODE_DELAY));

        const increaseSupplyResult = await nftSDK.increaseNFTSupply({
          nftId: nftInfo[0].nftId,
          amount,
          batchSize: 10,
          supplyKey: operatorPrivateKey,
        });

        for (const mintedNft of increaseSupplyResult) {
          const nftInfos = await new TokenNftInfoQuery()
            .setNftId(new NftId(TokenId.fromString(tokenId), mintedNft.serialNumber))
            .execute(nftSDK.client);

          expect(nftInfos[0].metadata!.toString()).toEqual(baseNFT[0].content);
        }
      },
      LONG_E2E_TIMEOUT
    );
  });
});
