import { Client, NftId, PrivateKey } from '@hashgraph/sdk';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
export type MintUniqueTokenType = {
    client: Client;
    tokenId: string;
    batchSize?: number;
    supplyKey: PrivateKey;
    pathToMetadataURIsFile?: string;
    metadataArray?: string[];
};
export type MintTokenType = {
    client: Client;
    tokenId: string;
    amount: number;
    batchSize: number;
    metaData: string;
    supplyKey: PrivateKey;
};
export type IncreaseNFTSupplyType = {
    client: Client;
    network: Network;
    nftId: NftId;
    amount: number;
    batchSize: number;
    supplyKey: PrivateKey;
    mirrorNodeUrl?: string;
};
export type MintedNFTType = {
    serialNumber: number;
    content: string;
};
export type Network = NetworkName | 'localnode';
//# sourceMappingURL=mint-token.d.ts.map