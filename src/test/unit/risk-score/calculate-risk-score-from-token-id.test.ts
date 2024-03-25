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
import { calculateRiskScoreFromTokenId } from '../../../risk';
import axios from 'axios';
import { exampleMetadata, metadataWihAllKeysProvided } from '../../__mocks__/exampleMetadata';
import { RiskLevels, Weights } from '../../../types/risk';

jest.mock('axios');

describe('calculateRiskScoreFromTokenId', () => {
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.get.mockClear();
  });

  it('should calculate risk score for a given token ID', async () => {
    mockAxios.get.mockResolvedValueOnce(exampleMetadata);

    const riskResults = await calculateRiskScoreFromTokenId({ tokenId: '0.0.123456', network: 'testnet' });

    expect(riskResults.riskScore).toBe(20);
    expect(riskResults.riskLevel).toBe('LOW');
  });

  it('should calculate risk score for a given token ID with customWeights parameter', async () => {
    mockAxios.get.mockResolvedValueOnce(exampleMetadata);

    const customWeights: Weights = {
      keys: {
        admin_key: 20,
        wipe_key: 20,
        freeze_key: 5,
        supply_key: 2,
        kyc_key: 5,
        pause_key: 5,
        fee_schedule_key: 4,
      },
      properties: {
        supply_type_infinite: 20,
      },
    };

    const riskResults = await calculateRiskScoreFromTokenId({ tokenId: '0.0.123456', network: 'testnet', customWeights });
    expect(riskResults.riskScore).toBe(2);
    expect(riskResults.riskLevel).toBe('LOW');
  });

  it('should calculate risk score for a given token ID with customWeights and customRiskLevels parameters', async () => {
    mockAxios.get.mockResolvedValueOnce(exampleMetadata);

    const customWeights: Weights = {
      keys: {
        admin_key: 500,
        wipe_key: 500,
        freeze_key: 100,
        supply_key: 250,
        kyc_key: 50,
        pause_key: 50,
        fee_schedule_key: 40,
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

    const riskResults = await calculateRiskScoreFromTokenId({
      tokenId: '0.0.123456',
      network: 'testnet',
      customWeights,
      customRiskLevels,
    });

    expect(riskResults.riskScore).toBe(250);
    expect(riskResults.riskLevel).toBe('HIGH');
  });

  it('should calculate risk score for a given token ID with admin_key provided', async () => {
    const metadataWithAdminKey = {
      ...exampleMetadata,
      data: { admin_key: { _type: 'ED25519', key: '49efa5f54192470706914df50f17472f6f2310b8476293822e0d49b313ca2875' } },
    };
    mockAxios.get.mockResolvedValueOnce(metadataWithAdminKey);

    const riskResults = await calculateRiskScoreFromTokenId({ tokenId: '0.0.123456', network: 'testnet' });

    expect(riskResults.riskScore).toBe(200);
    expect(riskResults.riskLevel).toBe('HIGH');
  });

  it('should calculate risk score for a given token ID with all keys provided, customWeights & customRiskLevels parameters', async () => {
    mockAxios.get.mockResolvedValueOnce(metadataWihAllKeysProvided);

    const customWeights: Weights = {
      keys: {
        admin_key: 500,
        wipe_key: 500,
        freeze_key: 100,
        supply_key: 250,
        kyc_key: 50,
        pause_key: 50,
        fee_schedule_key: 50,
      },
      properties: {
        supply_type_infinite: 200,
      },
    };

    const customRiskLevels: RiskLevels = {
      NORISK: 20,
      LOW: 100,
      MEDIUM: 500,
      HIGH: 1000,
    };

    const riskResults = await calculateRiskScoreFromTokenId({ tokenId: '0.0.123456', network: 'testnet', customWeights, customRiskLevels });
    expect(riskResults.riskScore).toBe(1500);
    expect(riskResults.riskLevel).toBe('HIGH');
  });
});
