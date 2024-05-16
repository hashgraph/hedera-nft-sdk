import type { BufferFile } from './buffer-file';
export interface CSVRow {
    [key: string]: string;
}
type AttributeObjectFromCSVFile = Record<string, string | number | boolean | undefined>[];
type PropertyFromCSVFile = Record<string, string>;
export interface MetadataObject {
    [key: string]: string | AttributeObjectFromCSVFile | PropertyFromCSVFile | undefined | BufferFile;
}
export {};
//# sourceMappingURL=csv.d.ts.map