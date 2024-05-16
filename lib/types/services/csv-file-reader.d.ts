import type { CSVRow } from '../types/csv';
type CSVReaderErrorId = 'invalid-headers';
export declare class CSVReaderError extends Error {
    id: CSVReaderErrorId;
    constructor(message: string, id: CSVReaderErrorId);
}
export declare function readCSVFile(absolutePath: string, limit?: number): Promise<CSVRow[]>;
export {};
//# sourceMappingURL=csv-file-reader.d.ts.map