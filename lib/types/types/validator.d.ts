export interface Attribute {
    trait_type: string;
    value: string | number;
    display_type?: string;
}
export interface Localization {
    uri: string;
    default: string;
    locales: string[];
}
export interface File {
    uri: string;
    checksum: string;
    type: string;
    is_default_file: boolean;
    metadata: Object;
    metadata_uri: string;
}
export interface Instance {
    name: string;
    creator: string;
    creatorDID: string;
    description: string;
    image: string;
    checksum: string;
    type: string;
    format: string;
    properties: Object;
    files: File[];
    attributes: Attribute[];
    localization: Localization;
}
export interface Error {
    type: string;
    msg: string;
}
export interface Problem {
    type: string;
    msg: string;
    path: string;
}
export interface ValidationResult {
    errors: Error[];
    warnings: Problem[];
}
export interface Schema {
    tag: string;
    schemaObject: Object;
}
//# sourceMappingURL=validator.d.ts.map