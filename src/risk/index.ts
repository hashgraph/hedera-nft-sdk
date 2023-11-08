/*
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

import axios from 'axios';
import {
  Metadata,
  RiskResult,
  Weights,
  KeyTypes,
  RiskLevelTypes,
} from '../types/risk.module';

// Default weights for risk score calculation
const defaultWeights: Weights = {
  keys: {
    admin_key: 200,
    wipe_key: 200,
    freeze_key: 50,
    supply_key: 20,
    kyc_key: 50,
    pause_key: 50,
    fee_schedule_key: 40,
  },
  properties: {
    supply_type_infinite: 20,
  },
};

// Default thresholds for risk level calculation
const defaultRiskLevels = {
  NORISK: 0,
  LOW: 40,
  MEDIUM: 199,
  HIGH: 200,
};

const calculateRiskScoreFromData = (metadata: Metadata): RiskResult => {
  const riskScore = calculateRiskScore(metadata);
  const riskLevel = calculateRiskLevel(riskScore);

  return {
    riskScore,
    riskLevel,
  };
};

const calculateRiskScoreFromTokenId = async (
  tokenId: string,
  network: string = 'mainnet'
): Promise<RiskResult> => {
  const uri =
    network === 'mainnet'
      ? `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${tokenId}/`
      : `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/`;

  const { data: metadata } = await axios.get<Metadata>(uri);

  const riskScore = calculateRiskScore(metadata);
  const riskLevel = calculateRiskLevel(riskScore);

  return {
    riskScore,
    riskLevel,
  };
};

const calculateRiskScore = (metadata: Metadata): number => {
  let riskScore = 0;

  // Iterate through the properties of the object
  for (const key in metadata) {
    // Check if the property is present in the weights object and not null
    if (metadata[key] && (key as KeyTypes) in defaultWeights.keys) {
      // If it is, add the associated risk weight to the risk score
      riskScore += defaultWeights.keys[key as KeyTypes];
    }
  }

  if (metadata.supply_type === 'INFINITE' && metadata.supply_key) {
    riskScore += defaultWeights.properties.supply_type_infinite;
  }

  if (
    metadata.supply_type === 'FINITE' &&
    Number(metadata.max_supply) == Number(metadata.total_supply)
  ) {
    riskScore -= defaultWeights.keys.supply_key;
  }

  return riskScore;
};

const calculateRiskLevel = (score: number): string => {
  let riskLevel = '';

  for (const key in defaultRiskLevels) {
    if (score <= defaultRiskLevels[key as RiskLevelTypes]) {
      riskLevel = key;
      break;
    }
  }

  return riskLevel;
};

export {
  defaultWeights,
  defaultRiskLevels,
  calculateRiskScoreFromData,
  calculateRiskScoreFromTokenId,
  calculateRiskLevel, // built-in in "calculateRiskScore" functions
};
