export declare const dictionary: {
    readonly errors: {
        readonly nftDeleted: "NFT has been deleted.";
        readonly nftNoTransactions: "NFT has not any transactions yet";
        readonly privateKeyRequired: "Private key is required";
        readonly privateKeyInvalid: "Invalid private key string. Please provide a valid private key string.";
        readonly unhandledError: "Unknown error.";
        readonly pinataError: "Cannot create Pinata provider. Please pass pinataJwtKey OR (pinataApiKey AND pinataSecretApiKey).";
        readonly awsUploadIssue: "Error encountered using AWS SDK. Please restart the app and try again.";
        readonly awsUploadingError: (message: string) => string;
        readonly noApiKeys: "Please provide at least one API key to use \"NFT.storage\".";
        readonly uploadService: {
            readonly noFiles: "No files to upload.";
            readonly noMetadata: "No metadata to upload.";
        };
        readonly rarity: {
            readonly attributeTypeNotFound: (trait_type: string) => string;
            readonly attributeNotFoundInFile: (fileName: string) => string;
            readonly attributeNotFoundInObject: (object: string) => string;
        };
        readonly cannotFetchHbarExchangeRate: "Can not fetch Hbar exchange rate.";
        readonly ipfsGatewayRequired: "IPFS gateway is required when metadata contains IPFS links.";
        readonly ipfsFailedToFetch: "Failed to fetch metadata using IPFS gateway";
        readonly tooManyRequests: (statusText: string, status: number) => string;
        readonly unknownErrorWhileFetching: (serialNumber: number) => string;
        readonly localization: {
            readonly defaultLocaleTwoLetterLanguageCode: "Default locale should be two-letter language code, got";
            readonly localeTwoLetterLanguageCode: "Locale should be two-letter language code, got";
            readonly defaultLocaleShouldNotAppear: "Default locale should not appear in 'localization.locales'";
            readonly wrongUriFormat: "URI should be of format <protocol>://<hash>/{locale}.json";
        };
        readonly metadataBuilder: {
            readonly fieldAlreadySet: (field: string) => string;
            readonly uriAndTypeRequired: "URI and Type are required for adding a file";
            readonly localizationAlreadySet: "Localization can only be set once";
            readonly localizatonFieldsMissing: "Localization uri, default locale, and locales array are required.";
        };
    };
    readonly createCollection: {
        readonly myPrivateKeyRequired: "myPrivateKey is required";
        readonly collectionNameRequired: "collectionName is required";
        readonly collectionSymbolRequired: "collectionSymbol is required";
        readonly myAccountIdRequired: "myAccountId is required";
        readonly treasuryAccountPrivateKeySignRequired: "If you want to use treasuryAccount to sign, you need to pass the treasuryAccountPrivateKey also";
        readonly collectionNotCreated: "Something went wrong while creating the collection";
        readonly autoRenewAccountPrivateKeySignRequired: "If you want to use autoRenewAccount to sign, you need to pass the autoRenewAccountPrivateKey also";
        readonly hbarAmountOrAmountAndDenominatingToken: "Either hbarAmount should be set and both amount and denominatingTokenId should not be set, or amount and denominatingTokenId should be set and hbarAmount should not be set.";
    };
    readonly validation: {
        readonly errorInCellWithHeader: (line: number, column: number) => string;
        readonly invalidKeysDetected: (keys: string[]) => string;
        readonly csvFileIsEmpty: (path?: string) => string;
        readonly errorInRow: (line: number | string, error: string) => string;
        readonly missingAttributesInRow: (csvFilePath: string, row: number) => string;
        readonly imageForNftNotFound: "Image for NFT not found. The name of the image file should match its corresponding metadata file name (ex: 1.jpg with 1.json) or specify directly the \"image\" property.";
        readonly mediaFileNotSupported: "Media file is not supported.";
        readonly arrayOfObjectsValidationError: (fileName: string, error: string) => string;
        readonly unsupportedImageMimeType: "Unsupported image MIME type.";
        readonly requiredFieldMissing: "Required field is missing";
        readonly requiredTypeFieldIsMissing: "The required \"type\" field is missing.";
        readonly requiredAttributeFieldMissing: "The required \"attributes\" field is missing.";
        readonly filePermissionDenied: "Permission denied";
        readonly fileEmptyOrFormattingError: "Unexpected end of JSON input";
        readonly directoryIsEmpty: "Directory is empty";
    };
    readonly hederaActions: {
        readonly mintingError: "There was an error while minting the NFT.";
        readonly maxBatchSize: "Max Buffer exceeded. Use batchSize smaller of equal to 10";
        readonly minBatchSize: "Min Buffer exceeded. Use batchSize greater than 0";
        readonly cannotParseTokenId: "Cannot parse tokenId";
        readonly cannotParsePrivateKey: "Cannot parse privateKey";
        readonly minAmount: "Amount needs to be greater than 0";
        readonly metadataRequired: "metadata is required";
        readonly tooManyCustomFees: "You can define up to 10 custom fees";
        readonly cannotParseAccountId: "Cannot parse accountId";
        readonly pathToMetadataURIsFileNotSupportedInBrowser: "The \"pathToMetadataURIsFile\" property is not supported in browser while trying to mint unique metadata. It is required to pass an array of the metadata.";
    };
    readonly mintToken: {
        readonly pathRequired: "Path to File required";
        readonly batchSizeUndefined: "batchSize can't be undefined";
        readonly csvOrArrayRequired: "Either pass a path to file(pathToMetadataURIsFile) or an array of strings(metadata)";
        readonly tooLongCID: "One of the CIDs is longer than 100 characters";
    };
};
//# sourceMappingURL=dictionary.d.ts.map