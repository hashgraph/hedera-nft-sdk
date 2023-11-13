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
const { calculateRiskScoreFromData, calculateRiskScoreFromTokenId } = require('../../../src/risk');
import no_risk_token from './data/no-risk-token';
import supply_key_token from './data/supply-key-token';
import all_keys_token from './data/all-keys-token';

describe('Risk calculation tests', () => {
  describe('Calculate risk score from data', () => {
    test('it should return zero risk for token with no keys and FINITE supply type', () => {
      // Arrange && Act
      const riskResults = calculateRiskScoreFromData(no_risk_token);

      // Assert
      expect(riskResults.riskScore).toBe(0);
      expect(riskResults.riskLevel).toBe('NORISK');
    });

    test('it should return 20 risk for token with supply key set', () => {
      // Arrange && Act
      const riskResults = calculateRiskScoreFromData(supply_key_token);

      // Assert
      expect(riskResults.riskScore).toBe(20);
      expect(riskResults.riskLevel).toBe('LOW');
    });

    test('it should return 40 risk for token with supply key set and infinite token supply', () => {
      // Arrange
      const token = JSON.parse(JSON.stringify(supply_key_token));
      token.supply_type = 'INFINITE';
        
      // Act
      const riskResults = calculateRiskScoreFromData(token);

      // Assert
      expect(riskResults.riskScore).toBe(40);
      expect(riskResults.riskLevel).toBe('LOW');
    });

    test('it should return HIGH risk (score) for token with supply key set and infinite token supply', () => {
      // Arrange && Act
      const riskResults = calculateRiskScoreFromData(all_keys_token);
      console.log(riskResults)

      // Assert
      expect(riskResults.riskScore).toBe(630);
      expect(riskResults.riskLevel).toBe('HIGH');
    });

    test('it should return NORISK for a token with only a supply key set and FINITE supply where total supply equals max supply', () => {
      // Arrange
      const token = JSON.parse(JSON.stringify(supply_key_token));
      token.max_supply = '1000';
      token.total_supply = '1000';
        
      // Act
      const riskResults = calculateRiskScoreFromData(token);

      // Assert
      expect(riskResults.riskScore).toBe(0);
      expect(riskResults.riskLevel).toBe('NORISK');
    });
  });

  describe('Calculate risk score from token ID', () => {
    test('it should return 20 risk for token with supply key set (ID: 0.0.1270555 on mainnet)', async () => {
      // Arrange && Act
      const riskResults = await calculateRiskScoreFromTokenId('0.0.1270555');

      // Assert
      expect(riskResults.riskScore).toBe(20);
      expect(riskResults.riskLevel).toBe('LOW');
    });
  });
});
