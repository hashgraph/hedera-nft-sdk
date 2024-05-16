/// <reference types="node" />
import type { Blob } from 'buffer';
import { FileStorageUploadUrl, FileStorageURL } from '../../upload-service';
import { FileStorage } from '../../../types/file-storage-service';
export declare class NftStorageService implements FileStorage {
    serviceUrl: FileStorageURL;
    uploadUrl: FileStorageUploadUrl;
    private instance;
    apiKeysList: string[];
    constructor(serviceUrl: FileStorageURL, uploadUrl: FileStorageUploadUrl, apiKeysList: string[]);
    uploadFile(file: Blob): Promise<string>;
}
//# sourceMappingURL=nft-storage-service.d.ts.map