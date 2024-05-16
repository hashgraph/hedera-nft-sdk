export interface JsonMetadataFromCSVInterface {
    isValid: boolean;
    errors: Array<{
        objectIndex: number;
        errors: string[];
    }>;
    savedJsonFilesLocation: string;
}
//# sourceMappingURL=json-metadata-from-csv.d.ts.map