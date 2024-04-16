/*
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

import axios from 'axios';
import { Metadata, RiskResult, Weights, KeyTypes, RiskLevels, RiskLevel, RiskScoreFactors } from '../types/risk';
import { getMirrorNodeUrlForNetwork } from '../utils/hedera/get-mirror-node-url-for-network';

type Network = 'mainnet' | 'testnet' | 'previewnet' | 'localNode';

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
const defaultRiskLevels: RiskLevels = {
  NORISK: 0,
  LOW: 40,
  MEDIUM: 199,
  HIGH: 200,
};

const calculateRiskScoreFromData = ({
  metadata,
  customWeights,
  customRiskLevels,
}: {
  metadata: Metadata;
  customWeights?: Weights;
  customRiskLevels?: RiskLevels;
}): RiskResult => {
  const { riskScore, riskScoreFactors } = calculateRiskScore(metadata, customWeights);
  const riskLevel = calculateRiskLevel({ score: riskScore, customRiskLevels });

  return {
    riskScore,
    riskLevel,
    riskScoreFactors,
  };
};

const calculateRiskScoreFromTokenId = async ({
  tokenId,
  network = 'mainnet',
  localNodeURL,
  customWeights,
  customRiskLevels,
}: {
  tokenId: string;
  network?: Network;
  localNodeURL?: string;
  customWeights?: Weights;
  customRiskLevels?: RiskLevels;
}): Promise<RiskResult> => {
  let uri = '';

  switch (network) {
    case 'mainnet':
      uri = `${getMirrorNodeUrlForNetwork('mainnet')}/tokens/${tokenId}/`;
      break;
    case 'testnet':
      uri = `${getMirrorNodeUrlForNetwork('testnet')}/tokens/${tokenId}/`;
      break;
    case 'previewnet':
      uri = `${getMirrorNodeUrlForNetwork('previewnet')}/tokens/${tokenId}/`;
      break;
    case 'localNode':
      if (!localNodeURL) {
        throw new Error('localNodeURL is required for local node network');
      }
      uri = `${localNodeURL}/api/v1/tokens/${tokenId}/`;
      break;
    default:
      throw new Error('Invalid network');
  }

  const { data: metadata } = await axios.get<Metadata>(uri);

  const { riskScore, riskScoreFactors } = calculateRiskScore(metadata, customWeights);
  const riskLevel = calculateRiskLevel({ score: riskScore, customRiskLevels });

  return {
    riskScore,
    riskLevel,
    riskScoreFactors,
  };
};

const calculateRiskScore = (metadata: Metadata, customWeights?: Weights): { riskScore: number; riskScoreFactors: RiskScoreFactors } => {
  const weights = customWeights ? customWeights : defaultWeights;
  let riskScore = 0;
  const riskScoreFactors: RiskScoreFactors = {};

  // Iterate through the properties of the object
  for (const key in metadata) {
    const typedKey = key as KeyTypes;

    // Check if the property is present in the weights object and not null
    if (metadata[typedKey] && (typedKey as KeyTypes) in weights.keys) {
      // If it is, add the associated risk weight to the risk score
      riskScore += weights.keys[typedKey as KeyTypes];
      riskScoreFactors[typedKey as KeyTypes] = weights.keys[typedKey as KeyTypes];
    }
  }

  if (metadata.supply_type === 'INFINITE' && metadata.supply_key) {
    riskScore += weights.properties.supply_type_infinite;
    riskScoreFactors['supply_type_infinite_and_supply_key_defined'] = weights.properties.supply_type_infinite;
  }

  if (metadata.supply_type === 'FINITE' && Number(metadata.max_supply) == Number(metadata.total_supply)) {
    riskScore -= weights.keys.supply_key;
    riskScoreFactors['max_supply_equal_to_total_supply'] = -weights.keys.supply_key;
  }

  return { riskScore, riskScoreFactors };
};

const calculateRiskLevel = ({ score, customRiskLevels }: { score: number; customRiskLevels?: RiskLevels }): RiskLevel => {
  const riskLevels = customRiskLevels || defaultRiskLevels;

  if (score <= riskLevels.NORISK) {
    return 'NORISK';
  } else if (score <= riskLevels.LOW) {
    return 'LOW';
  } else if (score <= riskLevels.MEDIUM) {
    return 'MEDIUM';
  } else {
    return 'HIGH';
  }
};

export {
  defaultWeights,
  defaultRiskLevels,
  calculateRiskScoreFromData,
  calculateRiskScoreFromTokenId,
  calculateRiskLevel, // built-in in "calculateRiskScore" functions
};
