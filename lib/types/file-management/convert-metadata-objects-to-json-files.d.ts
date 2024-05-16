import { JsonMetadataFromCSVInterface } from '../types/json-metadata-from-csv';
import { MetadataObject } from '../types/csv';
export declare const convertMetadataObjectsToJsonFiles: ({ metadataObjects, savedJsonFilesLocation, limit, }: {
    metadataObjects: MetadataObject[];
    savedJsonFilesLocation: string;
    limit?: number;
}) => Promise<JsonMetadataFromCSVInterface>;
//# sourceMappingURL=convert-metadata-objects-to-json-files.d.ts.map