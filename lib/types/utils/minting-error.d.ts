import { MintedNFTType } from '../types/mint-token';
export declare class MintingError extends Error {
    mintedNFTs: MintedNFTType[];
    constructor(message: string, successfulStates: MintedNFTType[]);
}
//# sourceMappingURL=minting-error.d.ts.map