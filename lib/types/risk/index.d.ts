import { Metadata, RiskResult, Weights, RiskLevels, RiskLevel } from '../types/risk';
type Network = 'mainnet' | 'testnet' | 'previewnet' | 'localNode';
declare const defaultWeights: Weights;
declare const defaultRiskLevels: RiskLevels;
declare const calculateRiskScoreFromData: ({ metadata, customWeights, customRiskLevels, }: {
    metadata: Metadata;
    customWeights?: Weights;
    customRiskLevels?: RiskLevels;
}) => RiskResult;
declare const calculateRiskScoreFromTokenId: ({ tokenId, network, localNodeURL, customWeights, customRiskLevels, }: {
    tokenId: string;
    network?: Network;
    localNodeURL?: string;
    customWeights?: Weights;
    customRiskLevels?: RiskLevels;
}) => Promise<RiskResult>;
declare const calculateRiskLevel: ({ score, customRiskLevels }: {
    score: number;
    customRiskLevels?: RiskLevels;
}) => RiskLevel;
export { defaultWeights, defaultRiskLevels, calculateRiskScoreFromData, calculateRiskScoreFromTokenId, calculateRiskLevel, };
//# sourceMappingURL=index.d.ts.map