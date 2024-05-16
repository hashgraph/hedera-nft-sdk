import type { MimeType } from 'file-type';
export interface BufferFile {
    name: string;
    mimeType: MimeType | 'text/json' | 'application/octet-stream';
    filePath: string;
    isFileEmpty: boolean;
}
//# sourceMappingURL=buffer-file.d.ts.map