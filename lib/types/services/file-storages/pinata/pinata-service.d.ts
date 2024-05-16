/// <reference types="node" />
import type { Blob } from 'buffer';
import { FileStorage } from '../../../types/file-storage-service';
export declare class PinataService implements FileStorage {
    private serviceUrl;
    private uploadUrl;
    private instance;
    pinataJwtKey?: string;
    pinataApiKey?: string;
    pinataSecretApiKey?: string;
    constructor(pinataJwtKey?: string, pinataApiKey?: string, pinataSecretApiKey?: string);
    uploadFile(file: Blob): Promise<string>;
}
//# sourceMappingURL=pinata-service.d.ts.map