/*-
 *
 * Hedera NFT Utilities
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
import { calculateRiskScoreFromData } from '../../../risk';
import { Metadata, RiskLevels, Weights } from '../../../types/risk';

const metadata: Metadata = {
  supply_type: 'testSupply',
  supply_key: 'testKey',
  max_supply: 'testMaxSupply',
  total_supply: 'testTotalSupply',
};

const customRiskLevels: RiskLevels = {
  NORISK: 0,
  LOW: 10,
  MEDIUM: 400,
  HIGH: 500,
};

const customWeights: Weights = {
  keys: {
    admin_key: 200,
    wipe_key: 200,
    freeze_key: 200,
    supply_key: 200,
    kyc_key: 200,
    pause_key: 200,
    fee_schedule_key: 200,
  },
  properties: {
    supply_type_infinite: 200,
  },
};

describe('CalculateRiskScoreFromData', () => {
  it('should calculate risk score with default metadata object', () => {
    const metadataWithDifferentSupplyType: Metadata = {
      ...metadata,
    };
    const { riskScore, riskLevel } = calculateRiskScoreFromData({ metadata: metadataWithDifferentSupplyType });

    expect(riskScore).toBe(20);
    expect(riskLevel).toBe('LOW');
  });

  it('should calculate risk score when fee_schedule_key is extra provided', () => {
    const metadataWithDifferentSupplyKey: Metadata = {
      ...metadata,
      fee_schedule_key: 'fee_schedule_key',
    };
    const { riskScore, riskLevel } = calculateRiskScoreFromData({ metadata: metadataWithDifferentSupplyKey });

    expect(riskScore).toBe(60);
    expect(riskLevel).toBe('MEDIUM');
  });

  it('should calculate risk score when pause_key is extra provided', () => {
    const metadataWithDifferentSupplyKey: Metadata = {
      ...metadata,
      pause_key: 'pause_key',
    };
    const { riskScore, riskLevel } = calculateRiskScoreFromData({ metadata: metadataWithDifferentSupplyKey });

    expect(riskScore).toBe(70);
    expect(riskLevel).toBe('MEDIUM');
  });

  it('should calculate risk score when admin_key is extra provided', () => {
    const metadataWithDifferentSupplyKey: Metadata = {
      ...metadata,
      admin_key: 'admin_key',
    };
    const { riskScore, riskLevel } = calculateRiskScoreFromData({ metadata: metadataWithDifferentSupplyKey });

    expect(riskScore).toBe(220);
    expect(riskLevel).toBe('HIGH');
  });

  it('should calculate risk score with custom weights and custom risk levels', () => {
    const metadataWithDifferentSupplyKey: Metadata = {
      ...metadata,
      kyc_key: 'kyc_key',
    };
    const { riskScore, riskLevel } = calculateRiskScoreFromData({
      metadata: metadataWithDifferentSupplyKey,
      customWeights,
      customRiskLevels,
    });

    expect(riskScore).toBe(400);
    expect(riskLevel).toBe('MEDIUM');
  });

  it('should calculate risk score with custom weights ', () => {
    const metadataWithDifferentSupplyKey: Metadata = {
      ...metadata,
      kyc_key: 'kyc_key',
    };
    const { riskScore, riskLevel } = calculateRiskScoreFromData({
      metadata: metadataWithDifferentSupplyKey,
      customWeights,
    });

    expect(riskScore).toBe(400);
    expect(riskLevel).toBe('HIGH');
  });

  it('should calculate risk score with custom risk levels ', () => {
    const metadataWithDifferentSupplyKey: Metadata = {
      ...metadata,
      kyc_key: 'kyc_key',
    };
    const { riskScore, riskLevel } = calculateRiskScoreFromData({
      metadata: metadataWithDifferentSupplyKey,
      customRiskLevels,
    });

    expect(riskScore).toBe(70);
    expect(riskLevel).toBe('MEDIUM');
  });
});
