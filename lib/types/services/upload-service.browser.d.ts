import { BufferFile } from '../types/buffer-file';
import { NFTMetadata } from '../types/nft-metadata';
import { FileStorage } from '../types/file-storage-service';
export type FileStorageURL = `https://${string}/`;
export type FileStorageUploadUrl = string;
type UploadServiceReturn = {
    content: Blob | BufferFile;
    url: string;
};
export declare class UploadService {
    private service;
    constructor(service: FileStorage);
    uploadFilesFromPath(_: string[]): Promise<UploadServiceReturn[]>;
    uploadBlobFiles(_: (Blob | BufferFile)[]): Promise<UploadServiceReturn[]>;
    handleBlobUpload(metadata: Partial<NFTMetadata> | NFTMetadata): Promise<UploadServiceReturn | null>;
    uploadMetadataList(metadatas: NFTMetadata[]): Promise<UploadServiceReturn[]>;
}
export {};
//# sourceMappingURL=upload-service.browser.d.ts.map