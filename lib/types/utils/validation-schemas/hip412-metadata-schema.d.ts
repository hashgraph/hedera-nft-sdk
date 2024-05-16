import type { BufferFile } from '../../types/buffer-file';
import { type ZodTypeAny, z } from 'zod';
export declare const Hip412MetadataCommonSchema: {
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodString>;
    creatorDID: z.ZodOptional<z.ZodString>;
    checksum: z.ZodOptional<z.ZodString>;
    type: z.ZodEffects<z.ZodString, string, string>;
    files: z.ZodOptional<z.ZodArray<z.ZodObject<{
        uri: z.ZodString;
        type: z.ZodEffects<z.ZodString, string, string>;
        metadata: z.ZodOptional<ZodTypeAny>;
        checksum: z.ZodOptional<z.ZodString>;
        is_default_file: z.ZodOptional<z.ZodBoolean>;
        metadata_uri: z.ZodOptional<z.ZodString>;
    }, "strip", ZodTypeAny, {
        uri: string;
        type: string;
        checksum?: string | undefined;
        metadata?: any;
        is_default_file?: boolean | undefined;
        metadata_uri?: string | undefined;
    }, {
        uri: string;
        type: string;
        checksum?: string | undefined;
        metadata?: any;
        is_default_file?: boolean | undefined;
        metadata_uri?: string | undefined;
    }>, "many">>;
    format: z.ZodOptional<z.ZodString>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        trait_type: z.ZodString;
        display_type: z.ZodOptional<z.ZodString>;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
        max_value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "strip", ZodTypeAny, {
        trait_type: string;
        value: string | number | boolean;
        display_type?: string | undefined;
        max_value?: string | number | undefined;
    }, {
        trait_type: string;
        value: string | number | boolean;
        display_type?: string | undefined;
        max_value?: string | number | undefined;
    }>, "many">>;
    localization: z.ZodOptional<z.ZodObject<{
        uri: z.ZodString;
        default: z.ZodString;
        locales: z.ZodArray<z.ZodString, "many">;
    }, "strip", ZodTypeAny, {
        uri: string;
        default: string;
        locales: string[];
    }, {
        uri: string;
        default: string;
        locales: string[];
    }>>;
};
export declare const imageForHip412MetadataSchema: z.ZodEffects<z.ZodType<string | BufferFile | undefined, z.ZodTypeDef, string | BufferFile | undefined>, string | BufferFile | undefined, string | BufferFile | undefined>;
export declare const Hip412MetadataSchema: z.ZodObject<{
    image: z.ZodEffects<z.ZodType<string | BufferFile | undefined, z.ZodTypeDef, string | BufferFile | undefined>, string | BufferFile | undefined, string | BufferFile | undefined>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodString>;
    creatorDID: z.ZodOptional<z.ZodString>;
    checksum: z.ZodOptional<z.ZodString>;
    type: z.ZodEffects<z.ZodString, string, string>;
    files: z.ZodOptional<z.ZodArray<z.ZodObject<{
        uri: z.ZodString;
        type: z.ZodEffects<z.ZodString, string, string>;
        metadata: z.ZodOptional<ZodTypeAny>;
        checksum: z.ZodOptional<z.ZodString>;
        is_default_file: z.ZodOptional<z.ZodBoolean>;
        metadata_uri: z.ZodOptional<z.ZodString>;
    }, "strip", ZodTypeAny, {
        uri: string;
        type: string;
        checksum?: string | undefined;
        metadata?: any;
        is_default_file?: boolean | undefined;
        metadata_uri?: string | undefined;
    }, {
        uri: string;
        type: string;
        checksum?: string | undefined;
        metadata?: any;
        is_default_file?: boolean | undefined;
        metadata_uri?: string | undefined;
    }>, "many">>;
    format: z.ZodOptional<z.ZodString>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        trait_type: z.ZodString;
        display_type: z.ZodOptional<z.ZodString>;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
        max_value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "strip", ZodTypeAny, {
        trait_type: string;
        value: string | number | boolean;
        display_type?: string | undefined;
        max_value?: string | number | undefined;
    }, {
        trait_type: string;
        value: string | number | boolean;
        display_type?: string | undefined;
        max_value?: string | number | undefined;
    }>, "many">>;
    localization: z.ZodOptional<z.ZodObject<{
        uri: z.ZodString;
        default: z.ZodString;
        locales: z.ZodArray<z.ZodString, "many">;
    }, "strip", ZodTypeAny, {
        uri: string;
        default: string;
        locales: string[];
    }, {
        uri: string;
        default: string;
        locales: string[];
    }>>;
}, "strip", ZodTypeAny, {
    type: string;
    name: string;
    localization?: {
        uri: string;
        default: string;
        locales: string[];
    } | undefined;
    checksum?: string | undefined;
    image?: string | BufferFile | undefined;
    attributes?: {
        trait_type: string;
        value: string | number | boolean;
        display_type?: string | undefined;
        max_value?: string | number | undefined;
    }[] | undefined;
    description?: string | undefined;
    creator?: string | undefined;
    creatorDID?: string | undefined;
    files?: {
        uri: string;
        type: string;
        checksum?: string | undefined;
        metadata?: any;
        is_default_file?: boolean | undefined;
        metadata_uri?: string | undefined;
    }[] | undefined;
    format?: string | undefined;
    properties?: Record<string, unknown> | undefined;
}, {
    type: string;
    name: string;
    localization?: {
        uri: string;
        default: string;
        locales: string[];
    } | undefined;
    checksum?: string | undefined;
    image?: string | BufferFile | undefined;
    attributes?: {
        trait_type: string;
        value: string | number | boolean;
        display_type?: string | undefined;
        max_value?: string | number | undefined;
    }[] | undefined;
    description?: string | undefined;
    creator?: string | undefined;
    creatorDID?: string | undefined;
    files?: {
        uri: string;
        type: string;
        checksum?: string | undefined;
        metadata?: any;
        is_default_file?: boolean | undefined;
        metadata_uri?: string | undefined;
    }[] | undefined;
    format?: string | undefined;
    properties?: Record<string, unknown> | undefined;
}>;
//# sourceMappingURL=hip412-metadata-schema.d.ts.map