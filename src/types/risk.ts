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
export interface WeightKeys {
  admin_key: number;
  wipe_key: number;
  freeze_key: number;
  supply_key: number;
  kyc_key: number;
  pause_key: number;
  fee_schedule_key: number;
}

export interface WeightProperties {
  supply_type_infinite: number;
}

export interface Weights {
  keys: WeightKeys;
  properties: WeightProperties;
}

export type KeyTypes = keyof WeightKeys;

export type RiskLevel = 'NORISK' | 'LOW' | 'MEDIUM' | 'HIGH';
export interface RiskLevels {
  NORISK: number;
  LOW: number;
  MEDIUM: number;
  HIGH: number;
}

export type RiskLevelTypes = keyof RiskLevels;

export type RiskScoreFactors = {
  [key in KeyTypes]?: number;
} & {
  supply_type_infinite_and_supply_key_defined?: number;
  max_supply_equal_to_total_supply?: number;
};

export type Metadata = {
  [key in KeyTypes]?: boolean | string;
} & {
  supply_type?: 'INFINITE' | 'FINITE';
  max_supply: string;
  total_supply: string;
};

export interface RiskResult {
  riskScore: number;
  riskLevel: RiskLevel;
  riskScoreFactors: RiskScoreFactors;
}
