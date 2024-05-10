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
import { TokenMetadataValidator } from '../../../token-metadata-validator';
import {
  nftSDK,
  operatorPrivateKey,
  NETWORK,
  IPFS_GATEWAY,
  LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
  AMOUNT_OF_NFTS_TO_MINT,
  BATCH_SIZE,
} from '../e2e-consts';
import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../../__mocks__/consts';

describe('E2E test for validating shared NFT Collection Metadata Against HIP412 schema', () => {
  let tokenId: string;

  beforeAll(async () => {
    tokenId = await nftSDK.createCollection({
      collectionName: 'valid_test_collection',
      collectionSymbol: 'VTC',
    });

    await nftSDK.mintSharedMetadata({
      tokenId,
      amount: AMOUNT_OF_NFTS_TO_MINT,
      batchSize: BATCH_SIZE,
      metaData: LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
      supplyKey: operatorPrivateKey,
    });

    await new Promise((resolve) => setTimeout(resolve, MIRROR_NODE_DELAY));
  }, LONG_E2E_TIMEOUT);

  it(
    'should successfully validate the previously created NFT collection metadata against the HIP412 schema',
    async () => {
      const validationResponse = await TokenMetadataValidator.validateMetadataFromOnChainCollection(NETWORK, tokenId, IPFS_GATEWAY);

      expect(validationResponse.isValid).toBe(true);
      expect(validationResponse.errors).toHaveLength(0);
    },
    LONG_E2E_TIMEOUT
  );
});
