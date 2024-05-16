export interface FileMetadata {
    uri: string;
    type: string;
    metadata?: NFTMetadata;
    checksum?: string;
    is_default_file?: boolean;
    metadata_uri?: string;
}
export interface Property {
    [k: string]: string | number | boolean | object;
}
export type HIP412Format = 'HIP412@2.0.0';
export interface Attribute {
    trait_type: string;
    value: string;
    display_type?: string;
    max_value?: string | number;
}
export interface Localization {
    uri: string;
    default: string;
    locales: string[];
}
export interface NFTMetadata {
    name: string;
    image: string;
    type: string;
    description?: string;
    creator?: string;
    creatorDID?: string;
    checksum?: string;
    files?: FileMetadata[];
    format?: HIP412Format;
    properties?: Property;
    attributes?: Attribute[];
    localization?: Localization;
}
//# sourceMappingURL=nft-metadata.d.ts.map