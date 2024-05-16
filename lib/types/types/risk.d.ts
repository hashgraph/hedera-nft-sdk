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
export type RiskLevel = 'NO RISK' | 'LOW' | 'MEDIUM' | 'HIGH';
export interface RiskLevels {
    NORISK: number;
    LOW: number;
    MEDIUM: number;
    HIGH: number;
}
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
//# sourceMappingURL=risk.d.ts.map