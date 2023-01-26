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
const { calculateRiskScoreFromData, calculateRiskScoreFromTokenId } = require('../../risk');
const no_risk_token = require('./data/no-risk-token.json');
const supply_key_token = require('./data/supply-key-token.json');
const all_keys_token = require('./data/all-keys-token.json');

describe("Risk calculation tests", () => {
  describe("Calculate risk score from data", () => {
    test("it should return zero risk for token with no keys and FINITE supply type", () => {
        // Arrange && Act
        const riskResults = calculateRiskScoreFromData(no_risk_token);

        // Assert
        expect(riskResults.riskScore).toBe(0);
        expect(riskResults.riskLevel).toBe("NORISK");
    });

    test("it should return 20 risk for token with supply key set", () => {
        // Arrange && Act
        const riskResults = calculateRiskScoreFromData(supply_key_token);

        // Assert
        expect(riskResults.riskScore).toBe(20);
        expect(riskResults.riskLevel).toBe("LOW");
    });

    test("it should return 40 risk for token with supply key set and infinite token supply", () => {
        // Arrange
        let supply_key_infinite_token = JSON.parse(JSON.stringify(supply_key_token));
        supply_key_infinite_token.supply_type = "INFINITE";
        
        // Act
        const riskResults = calculateRiskScoreFromData(supply_key_infinite_token);

        // Assert
        expect(riskResults.riskScore).toBe(40);
        expect(riskResults.riskLevel).toBe("LOW");
    });

    test("it should return HIGH risk (score ) for token with supply key set and infinite token supply", () => {
        // Arrange && Act
        const riskResults = calculateRiskScoreFromData(all_keys_token);

        // Assert
        expect(riskResults.riskScore).toBe(630);
        expect(riskResults.riskLevel).toBe("HIGH");
    });
  });

  describe("Calculate risk score from token ID", () => {
    test("it should return 20 risk for token with supply key set (ID: 0.0.1270555 on mainnet)", async () => {
        // Arrange && Act
        const riskResults = await calculateRiskScoreFromTokenId("0.0.1270555");

        // Assert
        expect(riskResults.riskScore).toBe(20);
        expect(riskResults.riskLevel).toBe("LOW");
    });
  });
});
