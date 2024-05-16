import { NftId } from '@hashgraph/sdk';
import { NFTDetails, NFTTransactions } from '../types/nfts';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
import { MetadataObject } from '../types/csv';
import { NFTMetadata } from '../types/nft-metadata';
export type MetadataFromMirrorNode = {
    isSuccessful: boolean;
    metadata?: MetadataObject | NFTMetadata;
    serialNumber: number;
    error?: string;
};
export declare const getMetaDataFromMirrorNode: (network: NetworkName, nftId: NftId, mirrorNodeUrl?: string) => Promise<string>;
export declare const getLastOwnershipTransferForNft: (network: NetworkName, tokenId: string, serialNumber: number, mirrorNodeUrl?: string) => Promise<NFTTransactions | undefined>;
export declare function getNFTsFromToken(network: NetworkName, tokenId: string, limit?: number): Promise<NFTDetails[]>;
export declare function getSingleNFTDetails(network: NetworkName, tokenId: string, serialNumber: number): Promise<NFTDetails>;
export declare function getMetadataObjectsForValidation(url: string, serialNumber: number): Promise<MetadataFromMirrorNode>;
//# sourceMappingURL=mirror-node.d.ts.map