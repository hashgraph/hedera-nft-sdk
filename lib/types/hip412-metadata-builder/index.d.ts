import { Attribute, FileMetadata, Localization, NFTMetadata } from '../types/nft-metadata';
import { FileValidationResult } from '../types/hip412-validator';
interface Hip412MetadataBuilderResult {
    metadata: NFTMetadata;
    validationResult: FileValidationResult;
}
export declare class Hip412MetadataBuilder {
    private metadataObject;
    constructor();
    private setProperty;
    setName(name: string): Hip412MetadataBuilder;
    setImage(image: string): Hip412MetadataBuilder;
    setType(type: string): Hip412MetadataBuilder;
    setCreator(creator: string): Hip412MetadataBuilder;
    setCreatorDID(creatorDID: string): Hip412MetadataBuilder;
    setDescription(description: string): Hip412MetadataBuilder;
    setChecksum(checksum: string): Hip412MetadataBuilder;
    addAttribute({ trait_type, value, display_type, max_value }: Attribute): Hip412MetadataBuilder;
    addFile({ uri, type, checksum, is_default_file, metadata, metadata_uri }: FileMetadata): Hip412MetadataBuilder;
    addProperty({ key, value }: {
        key: string;
        value: string | number | boolean | object;
    }): Hip412MetadataBuilder;
    setLocalization({ uri, default: defaultLocale, locales }: Localization): Hip412MetadataBuilder;
    build(): Hip412MetadataBuilderResult;
}
export {};
//# sourceMappingURL=index.d.ts.map