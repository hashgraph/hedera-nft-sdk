"use strict";

var _risk = require("../../../risk");
var _axios = _interopRequireDefault(require("axios"));
var _exampleMetadata = require("../../__mocks__/exampleMetadata");
var _sdk = require("@hashgraph/sdk");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

jest.mock('axios');
describe('calculateRiskScoreFromTokenId', () => {
  let mockAxios;
  beforeEach(() => {
    mockAxios = _axios.default;
    mockAxios.get.mockClear();
  });
  it('should calculate risk score for a given token ID', async () => {
    mockAxios.get.mockResolvedValueOnce(_exampleMetadata.exampleMetadata);
    const {
      riskScore,
      riskLevel,
      riskScoreFactors
    } = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId: '0.0.123456',
      network: 'testnet'
    });
    expect(riskScore).toBe(20);
    expect(riskLevel).toBe('LOW');
    expect(riskScoreFactors).toEqual({
      supply_key: 20
    });
  });
  it('should calculate risk score for a given token ID with customWeights parameter', async () => {
    mockAxios.get.mockResolvedValueOnce(_exampleMetadata.exampleMetadata);
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
    const {
      riskScore,
      riskLevel,
      riskScoreFactors
    } = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId: '0.0.123456',
      network: 'testnet',
      customWeights
    });
    expect(riskScore).toBe(2);
    expect(riskLevel).toBe('LOW');
    expect(riskScoreFactors).toEqual({
      supply_key: 2
    });
  });
  it('should calculate risk score for a given token ID with customWeights and customRiskLevels parameters', async () => {
    mockAxios.get.mockResolvedValueOnce(_exampleMetadata.exampleMetadata);
    const customWeights = {
      keys: {
        admin_key: 500,
        wipe_key: 500,
        freeze_key: 100,
        supply_key: 250,
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
    const {
      riskScore,
      riskLevel,
      riskScoreFactors
    } = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId: '0.0.123456',
      network: 'testnet',
      customWeights,
      customRiskLevels
    });
    expect(riskScore).toBe(250);
    expect(riskLevel).toBe('HIGH');
    expect(riskScoreFactors).toEqual({
      supply_key: 250
    });
  });
  it('should calculate risk score for a given token ID with admin_key provided', async () => {
    const metadataWithAdminKey = {
      data: {
        ..._exampleMetadata.exampleMetadata.data,
        admin_key: _sdk.PrivateKey.generateED25519()
      }
    };
    mockAxios.get.mockResolvedValueOnce(metadataWithAdminKey);
    const {
      riskScore,
      riskLevel,
      riskScoreFactors
    } = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId: '0.0.123456',
      network: 'testnet'
    });
    expect(riskScore).toBe(220);
    expect(riskLevel).toBe('HIGH');
    expect(riskScoreFactors).toEqual({
      supply_key: 20,
      admin_key: 200
    });
  });
  it('should calculate risk score for a given token ID with max_supply and total_supply equal', async () => {
    const metadataWithAdminKey = {
      data: {
        ..._exampleMetadata.exampleMetadata.data,
        max_supply: 100,
        total_supply: 100,
        admin_key: _sdk.PrivateKey.generateED25519()
      }
    };
    mockAxios.get.mockResolvedValueOnce(metadataWithAdminKey);
    const {
      riskScore,
      riskLevel,
      riskScoreFactors
    } = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId: '0.0.123456',
      network: 'testnet'
    });
    expect(riskScore).toBe(200);
    expect(riskLevel).toBe('HIGH');
    expect(riskScoreFactors).toEqual({
      supply_key: 20,
      admin_key: 200,
      max_supply_equal_to_total_supply: -20
    });
  });
  it('should calculate risk score for a given token ID with all keys provided, customWeights & customRiskLevels parameters', async () => {
    mockAxios.get.mockResolvedValueOnce(_exampleMetadata.metadataWihAllKeysProvided);
    const customWeights = {
      keys: {
        admin_key: 500,
        wipe_key: 500,
        freeze_key: 100,
        supply_key: 250,
        kyc_key: 50,
        pause_key: 50,
        fee_schedule_key: 50
      },
      properties: {
        supply_type_infinite: 200
      }
    };
    const customRiskLevels = {
      NORISK: 20,
      LOW: 100,
      MEDIUM: 500,
      HIGH: 1000
    };
    const {
      riskScore,
      riskLevel,
      riskScoreFactors
    } = await (0, _risk.calculateRiskScoreFromTokenId)({
      tokenId: '0.0.123456',
      network: 'testnet',
      customWeights,
      customRiskLevels
    });
    expect(riskScore).toBe(1500);
    expect(riskLevel).toBe('HIGH');
    expect(riskScoreFactors).toEqual({
      supply_key: 250,
      kyc_key: 50,
      admin_key: 500,
      fee_schedule_key: 50,
      freeze_key: 100,
      pause_key: 50,
      wipe_key: 500
    });
  });
});
//# sourceMappingURL=calculate-risk-score-from-token-id.test.js.map