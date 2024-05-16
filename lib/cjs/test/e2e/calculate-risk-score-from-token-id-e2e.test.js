"use strict";

var _risk = require("../../risk");
var _sdk = require("@hashgraph/sdk");
var _e2eConsts = require("./e2e-consts");
var _consts = require("../__mocks__/consts");
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

describe('calculateRiskScoreFromTokenIdE2E', () => {
  let supplyKey;
  let tokenId;
  beforeAll(async () => {
    supplyKey = _sdk.PrivateKey.generateED25519();
    tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name_admin',
      collectionSymbol: 'test_symbol_admin',
      keys: {
        supply: supplyKey
      }
    });
    await new Promise(resolve => setTimeout(resolve, _consts.MIRROR_NODE_DELAY));
  }, _consts.LONG_E2E_TIMEOUT);
  it('should calculate risk score for a given token ID', async () => {
    const riskResults = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId,
      network: 'testnet'
    });
    expect(riskResults.riskScore).toBe(40);
    expect(riskResults.riskLevel).toBe('LOW');
  }, _consts.LONG_E2E_TIMEOUT);
  it('should calculate risk score for a given token ID with customWeights parameter', async () => {
    const customWeights = {
      keys: {
        admin_key: 20,
        wipe_key: 20,
        freeze_key: 5,
        supply_key: 2,
        kyc_key: 5,
        pause_key: 5,
        fee_schedule_key: 4
      },
      properties: {
        supply_type_infinite: 20
      }
    };
    const riskResults = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId,
      network: 'testnet',
      customWeights
    });
    expect(riskResults.riskScore).toBe(22);
    expect(riskResults.riskLevel).toBe('LOW');
  }, _consts.LONG_E2E_TIMEOUT);
  it('should calculate risk score for a given token ID with customWeights and customRiskLevels parameters', async () => {
    const customWeights = {
      keys: {
        admin_key: 200,
        wipe_key: 200,
        freeze_key: 50,
        supply_key: 20,
        kyc_key: 50,
        pause_key: 50,
        fee_schedule_key: 40
      },
      properties: {
        supply_type_infinite: 200
      }
    };
    const customRiskLevels = {
      NORISK: 5,
      LOW: 60,
      MEDIUM: 100,
      HIGH: 200
    };
    const riskResults = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId,
      network: 'testnet',
      customWeights,
      customRiskLevels
    });
    expect(riskResults.riskScore).toBe(220);
    expect(riskResults.riskLevel).toBe('HIGH');
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=calculate-risk-score-from-token-id-e2e.test.js.map