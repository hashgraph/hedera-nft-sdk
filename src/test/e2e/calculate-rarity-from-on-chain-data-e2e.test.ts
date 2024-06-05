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
import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../__mocks__/consts';
import { calculateRarityFromOnChainData } from '../../rarity';
import { LINK_TO_JSON_OBJECT_WITHOUT_ERRORS, nftSDK, operatorPrivateKey } from './e2e-consts';
import { LINK_TO_JSON_OBJECT_WITHOUT_ERRORS_ATTRIBUTES } from '../__mocks__/linkToJsonObjectWithoutErrorsAttributes';

describe('calculateRarityFromTokenIdE2E', () => {
  it(
    'should calculate rarity for a given token ID',
    async () => {
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol',
      });

      await nftSDK.mintSharedMetadata({
        tokenId,
        amount: 5,
        batchSize: 2,
        metaData: LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
        supplyKey: operatorPrivateKey,
      });
      await new Promise((resolve) => setTimeout(resolve, MIRROR_NODE_DELAY));
      const response = await calculateRarityFromOnChainData('testnet', tokenId, 'https://gateway.pinata.cloud/ipfs');

      expect(response).toStrictEqual(LINK_TO_JSON_OBJECT_WITHOUT_ERRORS_ATTRIBUTES);
    },
    LONG_E2E_TIMEOUT
  );
});
