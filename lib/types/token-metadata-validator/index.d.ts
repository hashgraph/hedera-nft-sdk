import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
import { MetadataObject } from '../types/csv';
import { MetadataFromMirrorNode } from '../api/mirror-node';
import { NFTMetadata } from '../types/nft-metadata';
import { FileValidationResult, ValidateArrayOfObjectsResult, DirectoryValidationResult } from '../types/hip412-validator';
export declare class TokenMetadataValidator {
    static validateSingleMetadataObject(object: MetadataObject | NFTMetadata): FileValidationResult;
    static validateArrayOfObjects(metadataObjects: MetadataObject[]): ValidateArrayOfObjectsResult;
    static validateLocalFile(filePath: string): FileValidationResult;
    static validateLocalDirectory(directoryPath: string): DirectoryValidationResult;
    static validateOnChainArrayOfObjects: (metadataObjects: Awaited<MetadataFromMirrorNode>[]) => {
        isValid: boolean;
        errors: Array<{
            serialNumber: number;
            message: string[];
        }>;
    };
    static validateMetadataFromOnChainCollection(network: NetworkName, tokenId: string, ipfsGateway?: string, limit?: number): Promise<{
        isValid: boolean;
        errors: {
            serialNumber: number;
            message: string[];
        }[];
    }>;
    static validateSingleOnChainNFTMetadata(network: NetworkName, tokenId: string, serialNumber: number, ipfsGateway?: string): Promise<FileValidationResult | {
        isValid: boolean;
        errors: {
            general: (string | undefined)[];
            missingAttributes: never[];
        };
    }>;
}
//# sourceMappingURL=index.d.ts.map