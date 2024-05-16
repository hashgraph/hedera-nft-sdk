import { MetadataObject } from './csv';
export interface FileValidationResult {
    isValid: boolean;
    fileName?: string;
    errors: string[];
}
export interface DetailedFileValidationResult {
    isValid: boolean;
    errors: string[];
    errorsCount: number;
}
export interface ValidateArrayOfObjectsResult {
    results: {
        [index: number]: DetailedFileValidationResult;
    };
    allObjectsValid: boolean;
}
export interface DirectoryValidationResult {
    isValid: boolean;
    errors: MetadataError[];
}
export interface MetadataError {
    fileName?: string;
    general: string[];
}
export interface MetadataOnChainObjects {
    metadata?: MetadataObject;
    serialNumber: number;
    error?: string;
}
//# sourceMappingURL=hip412-validator.d.ts.map