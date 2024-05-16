import { Instance } from './validator';
export interface NFTFile {
    filedata: Instance;
    filename: string;
}
export interface NFTAttribute {
    trait_type: string;
    value: string;
}
export interface ValueObject {
    value: string;
    count: number;
}
export interface AttributeConfig {
    trait_type: string;
    values: ValueObject[];
}
export interface RarityResult {
    attributeContributions: {
        trait: string;
        value: string | number;
        contribution: string;
    }[];
    totalRarity: string;
    NFT: number;
    filename?: string;
}
export interface TraitOccurrence {
    trait: string;
    values: {
        value: string;
        occurence: string;
    }[];
}
//# sourceMappingURL=rarity.d.ts.map