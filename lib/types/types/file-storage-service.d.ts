/// <reference types="node" />
import type { Blob } from 'buffer';
export interface FileStorage {
    uploadFile(file: Blob): Promise<string>;
}
//# sourceMappingURL=file-storage-service.d.ts.map