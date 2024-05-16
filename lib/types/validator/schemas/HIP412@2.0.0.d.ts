declare const _default: {
    $schema: string;
    type: string;
    version: string;
    additionalProperties: boolean;
    properties: {
        name: {
            type: string;
            description: string;
        };
        creator: {
            type: string;
            description: string;
        };
        creatorDID: {
            type: string;
            format: string;
            description: string;
        };
        description: {
            type: string;
            description: string;
        };
        image: {
            type: string;
            format: string;
            description: string;
        };
        checksum: {
            type: string;
            description: string;
        };
        type: {
            type: string;
            description: string;
        };
        format: {
            type: string;
            default: string;
            description: string;
        };
        properties: {
            type: string;
            description: string;
        };
        files: {
            type: string;
            items: {
                type: string;
                properties: {
                    uri: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    checksum: {
                        type: string;
                        description: string;
                    };
                    type: {
                        type: string;
                        description: string;
                    };
                    is_default_file: {
                        type: string;
                        description: string;
                    };
                    metadata: {
                        type: string;
                        description: string;
                    };
                    metadata_uri: {
                        type: string;
                        format: string;
                        description: string;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
        };
        attributes: {
            type: string;
            items: {
                type: string;
                properties: {
                    trait_type: {
                        type: string;
                        description: string;
                    };
                    display_type: {
                        type: string;
                        description: string;
                    };
                    value: {
                        type: string[];
                        description: string;
                    };
                    max_value: {
                        type: string[];
                        description: string;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
        };
        localization: {
            type: string;
            required: string[];
            properties: {
                uri: {
                    type: string;
                    description: string;
                };
                default: {
                    type: string;
                    description: string;
                };
                locales: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
    };
    required: string[];
};
export default _default;
//# sourceMappingURL=HIP412@2.0.0.d.ts.map