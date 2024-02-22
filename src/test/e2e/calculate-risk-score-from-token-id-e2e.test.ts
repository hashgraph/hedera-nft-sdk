/*-
 *
 * Hedera NFT Utilities
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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
import { calculateRiskScoreFromTokenId } from '../../risk';
import { PrivateKey } from '@hashgraph/sdk';
import { nftSDK } from './e2e-consts';
import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../__mocks__/consts';

describe('calculateRiskScoreFromTokenIdE2E', () => {
  it(
    'should calculate risk score for a given token ID',
    async () => {
      const supplyKey = PrivateKey.generateED25519();
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name_admin',
        collectionSymbol: 'test_symbol_admin',
        keys: {
          supply: supplyKey,
        },
      });

      // Wait for the token to be created and metadata to be available. Otherwise, it will throw 404
      await new Promise((resolve) => setTimeout(resolve, MIRROR_NODE_DELAY));
      const riskResults = await calculateRiskScoreFromTokenId({ tokenId, network: 'testnet' });

      expect(riskResults.riskScore).toBe(40);
      expect(riskResults.riskLevel).toBe('LOW');
    },
    LONG_E2E_TIMEOUT
  );
});
