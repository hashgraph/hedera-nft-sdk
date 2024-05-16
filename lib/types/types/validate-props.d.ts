import { PrivateKey } from '@hashgraph/sdk';
import { CustomFeeType } from './create-collection';
export type sharedMintingValidationProps = {
    batchSize: number;
    tokenId: string;
    amount: number;
    metaData: string;
    supplyKey: PrivateKey;
};
export type uniqueMintingValidationProps = {
    batchSize: number;
    tokenId: string;
    supplyKey: PrivateKey;
    pathToMetadataURIsFile?: string;
    metadataArray?: string[];
};
export type increaseNFTSupplyValidationProps = {
    batchSize: number;
    amount: number;
};
export type validateCreateCollectionProps = {
    collectionName: string;
    collectionSymbol: string;
    treasuryAccountPrivateKey?: PrivateKey;
    treasuryAccount?: string;
    customFees?: CustomFeeType[];
    expirationTime?: Date;
    autoRenewAccount?: string;
    autoRenewAccountPrivateKey?: PrivateKey;
    autoRenewPeriod?: number;
    memo?: string;
};
export type fixedFeeValidationProps = {
    collectorAccountId: string;
    hbarAmount?: number;
    amount?: number;
    denominatingTokenId?: string;
};
export type royaltyFeeValidationProps = {
    collectorAccountId: string;
    numerator: number;
    denominator: number;
};
//# sourceMappingURL=validate-props.d.ts.map