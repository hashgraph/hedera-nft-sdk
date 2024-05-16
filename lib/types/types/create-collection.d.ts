import { Client, CustomFixedFee, CustomRoyaltyFee, Key, PrivateKey } from '@hashgraph/sdk';
export type CustomFeeType = CustomFixedFee | CustomRoyaltyFee;
export type CreateCollectionKeysType = {
    admin?: PrivateKey;
    KYC?: Key;
    freeze?: Key;
    wipe?: Key;
    supply?: Key;
    feeSchedule?: Key;
    pause?: Key;
};
export type CreateCollectionType = {
    client: Client;
    myPrivateKey: PrivateKey;
    collectionName: string;
    collectionSymbol: string;
    keys?: CreateCollectionKeysType;
    treasuryAccount?: string;
    treasuryAccountPrivateKey?: PrivateKey;
    maxSupply?: number;
    customFees?: CustomFeeType[];
    expirationTime?: Date;
    autoRenewAccount?: string;
    autoRenewAccountPrivateKey?: PrivateKey;
    autoRenewPeriod?: number;
    memo?: string;
};
//# sourceMappingURL=create-collection.d.ts.map