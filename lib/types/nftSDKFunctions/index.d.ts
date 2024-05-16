import { Client, NftId, PrivateKey } from '@hashgraph/sdk';
import { CreateCollectionKeysType, CustomFeeType } from '../types/create-collection';
import { Network } from '../types/mint-token';
import { LocalNode } from '../types/login';
export declare class HederaNFTSDK {
    accountId: string;
    privateKey: PrivateKey;
    client: Client;
    network: Network;
    mirrorNodeUrl?: string;
    constructor(accountId: string, privateKey: PrivateKey, network: Network, localNode?: LocalNode, localMirrorNode?: string, mirrorNodeUrl?: string);
    createCollection({ collectionName, collectionSymbol, treasuryAccountPrivateKey, treasuryAccount, keys, maxSupply, customFees, expirationTime, autoRenewAccount, autoRenewAccountPrivateKey, autoRenewPeriod, memo, }: {
        collectionName: string;
        collectionSymbol: string;
        treasuryAccountPrivateKey?: PrivateKey;
        treasuryAccount?: string;
        keys?: CreateCollectionKeysType;
        maxSupply?: number;
        customFees?: CustomFeeType[];
        expirationTime?: Date;
        autoRenewAccount?: string;
        autoRenewAccountPrivateKey?: PrivateKey;
        autoRenewPeriod?: number;
        memo?: string;
    }): Promise<string>;
    estimateCreateCollectionInDollars({ collectionName, collectionSymbol, treasuryAccountPrivateKey, treasuryAccount, keys, customFees, }: {
        collectionName: string;
        collectionSymbol: string;
        treasuryAccountPrivateKey?: PrivateKey;
        treasuryAccount?: string;
        keys?: CreateCollectionKeysType;
        customFees?: CustomFeeType[];
    }): number;
    estimateCreateCollectionInHbar({ collectionName, collectionSymbol, treasuryAccountPrivateKey, treasuryAccount, keys, customFees, }: {
        collectionName: string;
        collectionSymbol: string;
        treasuryAccountPrivateKey?: PrivateKey;
        treasuryAccount?: string;
        keys?: CreateCollectionKeysType;
        customFees?: CustomFeeType[];
    }): Promise<number>;
    estimateNftMintingInHbar({ amountOfNfts }: {
        amountOfNfts: number;
    }): Promise<number>;
    estimateNftMintingInDollars({ amountOfNfts }: {
        amountOfNfts: number;
    }): Promise<number>;
    mintSharedMetadata({ tokenId, amount, batchSize, metaData, supplyKey, }: {
        tokenId: string;
        amount: number;
        batchSize?: number;
        metaData: string;
        supplyKey?: PrivateKey;
    }): Promise<import("../types/mint-token").MintedNFTType[]>;
    mintUniqueMetadata({ tokenId, batchSize, supplyKey, pathToMetadataURIsFile, metadata, }: {
        tokenId: string;
        batchSize?: number;
        supplyKey: PrivateKey;
        pathToMetadataURIsFile?: string;
        metadata?: string[];
    }): Promise<import("../types/mint-token").MintedNFTType[]>;
    increaseNFTSupply({ nftId, amount, batchSize, supplyKey, }: {
        nftId: NftId;
        amount: number;
        batchSize?: number;
        supplyKey?: PrivateKey;
    }): Promise<import("../types/mint-token").MintedNFTType[]>;
}
//# sourceMappingURL=index.d.ts.map