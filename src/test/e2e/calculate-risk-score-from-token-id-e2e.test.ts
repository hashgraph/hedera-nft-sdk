/*-
 *
 * Hedera NFT SDK
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
import { PrivateKey, PublicKey } from '@hashgraph/sdk';
import { nftSDK } from './e2e-consts';
import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../__mocks__/consts';
import { RiskLevels, Weights } from '../../types/risk';
import { ZERO_ADDRESS_HEX } from '../../utils/const';

describe('calculateRiskScoreFromTokenIdE2E', () => {
  let supplyKey: PrivateKey;
  let tokenId: string;
  beforeAll(async () => {
    supplyKey = PrivateKey.generateED25519();
    tokenId = await nftSDK.createCollection({
      collectionName: 'test_name_admin',
      collectionSymbol: 'test_symbol_admin',
      keys: {
        supply: supplyKey,
        freeze: PublicKey.fromStringED25519(ZERO_ADDRESS_HEX),
      },
    });

    await new Promise((resolve) => setTimeout(resolve, MIRROR_NODE_DELAY));
  }, LONG_E2E_TIMEOUT);

  it(
    'should calculate risk score for a given token ID',
    async () => {
      const riskResults = await calculateRiskScoreFromTokenId({ tokenId, network: 'testnet' });
      expect(riskResults.riskScore).toBe(40);
      expect(riskResults.riskLevel).toBe('LOW');
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should calculate risk score for a given token ID with customWeights parameter',
    async () => {
      const customWeights: Weights = {
        keys: {
          admin_key: 20,
          wipe_key: 20,
          freeze_key: 5,
          supply_key: 2,
          kyc_key: 5,
          pause_key: 5,
          fee_schedule_key: 4,
          metadata_key: 0,
        },
        properties: {
          supply_type_infinite: 20,
        },
      };

      const riskResults = await calculateRiskScoreFromTokenId({ tokenId, network: 'testnet', customWeights });
      expect(riskResults.riskScore).toBe(22);
      expect(riskResults.riskLevel).toBe('LOW');
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should calculate risk score for a given token ID with customWeights and customRiskLevels parameters',
    async () => {
      const customWeights: Weights = {
        keys: {
          admin_key: 200,
          wipe_key: 200,
          freeze_key: 50,
          supply_key: 20,
          kyc_key: 50,
          pause_key: 50,
          fee_schedule_key: 40,
          metadata_key: 100,
        },
        properties: {
          supply_type_infinite: 200,
        },
      };

      const customRiskLevels: RiskLevels = {
        NORISK: 5,
        LOW: 60,
        MEDIUM: 100,
        HIGH: 200,
      };

      const riskResults = await calculateRiskScoreFromTokenId({ tokenId, network: 'testnet', customWeights, customRiskLevels });
      expect(riskResults.riskScore).toBe(220);
      expect(riskResults.riskLevel).toBe('HIGH');
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'should not include zero address freeze key in risk score calculations',
    async () => {
      const riskResults = await calculateRiskScoreFromTokenId({ tokenId, network: 'testnet' });
      expect(riskResults.riskScore).toBe(40);
      expect(riskResults.riskLevel).toBe('LOW');
      expect(riskResults.riskScoreFactors.freeze_key).toBeUndefined();
    },
    LONG_E2E_TIMEOUT
  );
});
