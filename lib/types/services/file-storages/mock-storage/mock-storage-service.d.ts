import { FileStorage } from '../../../types/file-storage-service';
import { FileStorageURL } from '../../upload-service';
export declare class MockStorageService implements FileStorage {
    serviceUrl: string;
    constructor(serviceUrl: FileStorageURL);
    uploadFile(): Promise<string>;
}
//# sourceMappingURL=mock-storage-service.d.ts.map