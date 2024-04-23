<div align="center">

# Hedera NFT SDK

[![License](https://img.shields.io/badge/license-apache2-blue.svg)](LICENSE)

</div>

This package includes all sorts of tooling for the Hedera NFT ecosystem, including:

1. **Local token metadata validator:** Verify your metadata locally against the [token metadata schema](https://docs.hedera.com/hedera/tutorials/token/structure-your-token-metadata-using-json-schema-v2) for NFTs, which returns errors and warnings against the standard. You can also define your own token metadata standard and add it to the package to use this schema for validation.
2. **Local metadata validator:** Verify a local folder containing multiple JSON metadata files against the token metadata schema before publishing the NFT collection on the Hedera network.
3. **Risk score calculation:** Calculate a risk score for an NFT collection from the token information or by passing a token ID of an NFT on the Hedera testnet or mainnet.
4. **Rarity score calculation:** Calculate the rarity scores for a local folder containing multiple JSON metadata files for an NFT collection.
5. **Trait occurrence calculation:** Calculate how often different values for a given trait occur in a collection, percentage-based.
6. **NFT SDK methods:** A wrapper around the Hedera NFT API to create a new NFT collection, mint NFTs, and transfer NFTs.
7. **Royalty Fee Creator:** A factory to define the fees for the Hedera NFT API when creating an NFT collection.
8. **Metadata Validator:** A tool for validating metadata objects according to [token metadata schema](https://docs.hedera.com/hedera/tutorials/token/structure-your-token-metadata-using-json-schema-v2), providing comprehensive verification of metadata compliance with the selected standard.
9. **Metadata Builder:** Enables the creation and assembly of NFT metadata objects in a structured format and conducts instant validation within its build method, ensuring adherence to [token metadata schema](https://docs.hedera.com/hedera/tutorials/token/structure-your-token-metadata-using-json-schema-v2) prior to deployment.
10. **Convert CSV To Metadata Objects:** Facilitates the conversion of CSV file data into structured metadata objects, streamlining the initial stages of NFT metadata preparation.
11. **Convert Metadata Objects to JSON Files:** Transforms validated metadata objects into JSON files, ensuring that NFT metadata is properly formatted and stored for deployment.
12. **Prepare Metadata Objects From CSV Rows:** Processes rows of CSV data into ready to validate metadata objects, bridging the gap between raw data collection and NFT metadata standardization.
13. **Upload Service:** Provides tools for uploading files to your chosen file storage service, including:
    - **uploadFilesFromPath:** Uploads all files from given directory paths or specific files to the configured storage service and returns URLs to the uploaded files.
    - **uploadBlobFiles:** Handles the upload of blob files or buffer files and returns URLs to these files, ensuring that files are not empty before upload.
    - **handleBlobUpload:** Specifically designed for uploading NFT metadata as JSON blobs, generating a URL where the metadata is stored.
    - **uploadMetadataList:** Allows for batch uploading of NFT metadata, handling each metadata item individually and compiling the resulting URLs.
14. **File Storage Services:** Implements various file storage services to handle the storage and retrieval of NFT-related files. This includes:
    - **AWSService:** Uploads files to AWS S3 with public read access and content type handling. It supports multipart uploads and provides error handling for failed uploads.
    - **PinataService:** Utilizes Pinata Cloud to pin files to IPFS, providing an `ipfs://` URL upon successful upload. Includes metadata and options customization.
    - **NftStorageService:** Integrates with the NFT.storage API to upload files directly to IPFS and returns an `ipfs://` URL. It supports dynamic API key usage based on a provided list.
    - **MockStorageService:** A mock storage service for testing purposes, returning predefined URLs.

## Table of Contents

- **How to build the package**
- **Package: [Local token metadata validator](#local-token-metadata-validator)**
- **Package: [Local metadata validator](#local-validator)**
- **Package: [Risk score calculation](#risk-score-calculation)**
- **Package: [Rarity score calculation](#rarity-score-calculation)**
- **Package: [Trait occurrence calculation](#trait-occurrence-calculation)**
- **Package: [NFT SDK Methods](#nft-sdk-methods)**
- **Package: [Royalty Fee Creator](#royalty-fee-creator)**
- **Package: [Metadata Validator](#metadata-validator)**
- **Package: [Metadata Builder](#metadata-builder)**
- **Package: [Convert CSV To Metadata Objects](#convert-csv-to-metadata-objects)**
- **Package: [Convert Metadata Objects to JSON Files](#convert-metadata-objects-to-json-files)**
- **Package: [Prepare Metadata Objects From CSV Rows](#prepare-metadata-objects-from-csv-rows)**
- **Package: [Upload Service](#upload-service)**
- **Package: [File Storage Services](#file-storage-services)**
- **[Questions, contact us, or improvement proposals?](#questions-or-improvement-proposals)**
- **[Support](#Support)**
- **[Contributing](#Contributing)**
- **[Code of Conduct](#Code-of-Conduct)**
- **[License](#License)**

## How to build the package?

To build this package, run the below command:

```sh
npm run build
```

This command will produce a `dist` folder containing the outputted JavaScript files.

---

## Local token metadata validator

Verify your metadata against the [token metadata schema](https://docs.hedera.com/hedera/tutorials/token/structure-your-token-metadata-using-json-schema-v2) for NFTs which returns errors and warnings against the standard.

### Usage

Install the package:

```bash
npm i -s @hashgraph/hedera-nft-sdk
```

Import the package into your project. You can import the `Validator` class and the default schema version for token metadata with `defaultSchemaVersion`.

```js
const { Validator, defaultSchemaVersion } = require('@hashgraph/hedera-nft-sdk');
```

You can use the `Validator` like below.

1. The first parameter is the JSON object you want to verify against a JSON schema
2. The second parameter is the version of the token metadata schema against which you want to validate your metadata instance. The default value is `2.0.0` (V2). In the future, new functionality might be added, releasing new version numbers.

```js
const metadata = {
  attributes: [{ trait_type: 'Background', value: 'Yellow' }],
  creator: 'NFT artist',
};
const version = '2.0.0';

const validator = new Validator();
const issues = validator.validate(metadata, version);
```

### Interface

The output interface for issues contains `errors` and `warnings`.

```json
{
  "errors": [
    {
      "type": "Indicates which validator created the error. Possible values: schema, attribute, localization, and SHA256.",
      "msg": "Indicates the specific error explanation to be displayed to the user",
      "path": "Indicates the path of the property for which the error is returned"
    }
  ],
  "warnings": [
    {
      "type": "schema",
      "msg": "is not allowed to have the additional property 'someAdditionalProperty'",
      "path": "Indicates the path of the property for which the error is returned"
    }
  ]
}
```

Here's an example:

```json
{
  "errors": [
    {
      "type": "attribute",
      "msg": "Trait stamina of type 'percentage' must be between [0-100], found 157",
      "path": "instance.attributes[0]"
    }
  ],
  "warnings": [
    {
      "type": "schema",
      "msg": "is not allowed to have the additional property 'imagePreview'",
      "path": "instance"
    }
  ]
}
```

### Examples

See: **[/examples/token-metadata-validator](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/token-metadata-validator)**

### Add custom schema versions

#### Method 1: Use Validator constructor to pass custom schemas

The easiest approach to adding new schemas is using the constructor of the `Validator` class. It accepts an array of JSON objects, each containing a JSON schema and tag for the schema. The tag is used to refer to the schema when validating metadata instances.

Therefore, each tag needs to be unqiue. The following tags can't be used as they are already occupied:

- `1.0.0` -> Refers to token metadata JSON schema V1 (HIP10)
- `2.0.0` -> Refers to token metadata JSON schema V2 (HIP412), which is the latest schema

You can add your custom schema like this:

```js
const { Validator } = require('@hashgraph/hedera-nft-sdk');

// Define your schema
const customSchema = {
  title: 'Token Metadata',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      description: 'Identifies the asset to which this token represents.',
    },
  },
  required: ['name'],
};

// Create Validator instance with custom schema labeled "custom-v1"
const validator = new Validator([{ schemaObject: customSchema, tag: 'custom-v1' }]);

// Verify metadata against custom schema
const results = validator.validate(metadataInstance, 'custom-v1');
console.log(results);
```

**Examples:** See: [/examples/token-metadata-calculation](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/token-metadata-calculation/custom-schema-valid-metadata.js)

#### Method 2: Rebuilding package

> ⚠️ Warning: **This approach requires you to rebuild the package.**

You can add custom JSON schemas to the `/schemas` folder.

You can then add the version to the `schemaMap` in `/schema/index.js` using the following code:

```js
const token_metadata_2_0_0 = require('./HIP412@2.0.0.json');
const myCustomSchema = require('./myschema.json'); // import your schema

const schemaMap = new Map();
schemaMap.set('2.0.0', token_metadata_2_0_0);
schemaMap.set('<version>', myCustomSchema); // Add your schema to the map
```

When you've added your schema to the map, you can validate against your schema version by passing your version to the `validator()` function.

### Add custom validation rules

Set custom validation rules by importing new validators from the `/validators` folder into the `index.js` file. You can then add them to the `validate()` function. Stick to the `issues` format of errors and warnings (see section "Issues format" for the detailed description).

```js
const { myCustomValidator, schemaValidator } = require('./validators');

const validate = (instance, schemaVersion = defaultSchemaVersion) => {
  let errors = [];
  let warnings = [];

  const schema = this.getSchema(schemaVersion);

  // When errors against the schema are found, you don't want to continue verifying the NFT
  // Warnings don't matter because they only contain "additional property" warnings that don't break the other validators
  const schemaProblems = schemaValidator(instance, schema);
  warnings.push(...schemaProblems.warnings);
  if (schemaProblems.errors.length > 0) {
    errors.push(...schemaProblems.errors);

    return {
      errors,
      warnings,
    };
  }

  const customErrors = myCustomValidator(instance);
  errors.push(...customErrors);

  return {
    errors,
    warnings,
  };
};
```

---

## Local validator

Verify a local folder containing multiple JSON metadata files against the token metadata schema before publishing the NFT collection on the Hedera network.

### Usage

Install the package:

```bash
npm i -s @hashgraph/hedera-nft-sdk
```

Import the package into your project and get the `localValidation` function.

```js
const { localValidation } = require('@hashgraph/hedera-nft-sdk');
```

The `localValidation` expects an absolute path to your metadata files to verify them. The function prints the warnings and errors for all JSON files it finds in the provided folder path. It also returns the validation results as an object in case you want to use the results in your code.

```js
localValidation('/Users/projects/nft/files');
```

This package uses the `Validator` class explained in the [previous section](#token-metadata-validator).

### Interface

The output interface for this function looks like this.

```json
{
    "filename.json": {
        "errors": [
            {
                "type": "Indicates which validator created the error. Possible values: schema, attribute, localization, and SHA256.",
                "msg": "Indicates the specific error explanation to be displayed to the user",
                "path": "Indicates the path of the property for which the error is returned"
            }
        ],
        "warnings": [
            {
                "type": "schema",
                "msg": "is not allowed to have the additional property 'someAdditionalProperty'",
                "path": "Indicates the path of the property for which the error is returned"
            }
        ]
    },
    "filename2.json": ...
}
```

### Examples

See: **[/examples/local-metadata-validator/index.js](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/local-metadata-validator)**

## Risk score calculation

Calculate risk score for a token from the token information or by passing a token ID of an NFT on the Hedera testnet or mainnet.

The total risk score is calculated based on the presence of certain `keys` for the token or the presence of an `INFINITE` `supply_type` in combination with a `supply_key`. Each key or property has an associated weight.

```js
const defaultWeights = {
  keys: {
    admin_key: 200,
    wipe_key: 200,
    freeze_key: 50,
    supply_key: 20,
    kyc_key: 50,
    pause_key: 50,
    fee_schedule_key: 40,
  },
  properties: {
    supply_type_infinite: 20,
  },
};
```

However, there's one edge case where the 20 weight for the supply key is not counted. When the supply type is set to `FINITE` and the total supply equals the max supply, there's no risk the supply key can further dilute the project because the project's minting limit has been reached.

To determine the risk level, there are four categories each with an attached score. If the score is lower than or equal to a risk level, it will get that risk level. E.g. a token with a risk score of 200 will get a `HIGH` risk level.

```js
const defaultRiskLevels = {
  NORISK: 0,
  LOW: 40,
  MEDIUM: 199,
  HIGH: 200,
};
```

### Usage

Install the package:

```bash
npm i -s @hashgraph/hedera-nft-sdk
```

Import the package into your project and get the `calculateRiskScoreFromData` or `calculateRiskScoreFromTokenId` functions.

```js
const { calculateRiskScoreFromData, calculateRiskScoreFromTokenId } = require('@hashgraph/hedera-nft-sdk');
```

The `calculateRiskScoreFromData` expects a token information JSON object as returned by the [/api/v1/tokens/<token-id> endpoint](https://docs.hedera.com/hedera/docs/mirror-node-api/rest-api#response-details-6) (here's an [example of token data](https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/0.0.1270555/)).

```js
const tokenInformation = {
        "admin_key": null,
        "auto_renew_account": "0.0.784037", "auto_renew_period": 7776000,
        "freeze_key": null,
        ...
}

const results = calculateRiskScoreFromData({ metadata: tokenInformation });
```

Alternatively, use the `calculateRiskScoreFromTokenId` to retrieve risk information about a token by entering a token ID. This asynchronous function looks up the token information from the mirror node and returns the risk information.

```js
const results = await calculateRiskScoreFromTokenId({ tokenId: '0.0.1270555' });
```

### Custom weights and risk levels

Use custom weights and risk levels by passing them as the second and third parameter to the `calculateRiskScoreFromData` function.

```js
const metadata: Metadata = {
  supply_type: 'testSupply',
  supply_key: 'testKey',
  max_supply: 'testMaxSupply',
  total_supply: 'testTotalSupply',
};

const customWeights: Weights = {
  keys: {
    admin_key: 200,
    wipe_key: 200,
    freeze_key: 50,
    supply_key: 20,
    kyc_key: 50,
    pause_key: 50,
    fee_schedule_key: 40,
  },
  properties: {
    supply_type_infinite: 20,
  },
};

const customRiskLevels: RiskLevels = {
  NORISK: 0,
  LOW: 40,
  MEDIUM: 199,
  HIGH: 200,
};

const results = calculateRiskScoreFromData({ metadata, customWeights, customRiskLevels });
```

### Interface

The output interface for this function looks like this.

```json
{
  "riskScore": "number representing total risk score",
  "riskLevel": "<string: ENUM(NO RISK, LOW, MEDIUM, HIGH)>"
}
```

### Examples

See: **[/examples/risk-score-calculation](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/risk-score-calculation)**

---

## Rarity score calculation

Calculate the rarity for a local folder containing multiple JSON metadata files for an NFT collection. This package uses the trait normalization rarity scoring model because it's the fairest model to calculate rarity.
The model works by dividing the number one by the division of the number of NFTs with a specific trait value and the number of NFTs with the most common trait value for that trait. Here's the formula:

```
1 / (# of NFTs with trait value / # of NFTs with most common trait value)
```

This model outputs a score for each NFT. By sorting the NFTs, you'll get a ranking based on this scoring model.

### Usage

Install the package:

```bash
npm i -s @hashgraph/hedera-nft-sdk
```

Import the package into your project and get `calculateRarity` function. Next, you need to pass an absolute path to a folder containing metadata JSON files.

```js
const { calculateRarity } = require('@hashgraph/hedera-nft-sdk');

const absolutePathToFiles = '/Users/myUser/hedera-nft-sdk/examples/rarity-score-calculation/files';
const results = calculateRarity(absolutePathToFiles);
console.log(results);
```

You can also avoid having to load data from files by using the `calculateRarityFromData` function.

```js
const NFTdata = [
  {
    name: 'HANGRY BARBOON #2343',
    image: 'ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png',
    type: 'image/png',
    attributes: [
      { trait_type: 'Background', value: 'Yellow' },
      { trait_type: 'Fur', value: 'Silver' },
      { trait_type: 'Clothing', value: 'Herbal Jacket' },
      { trait_type: 'Mouth', value: 'Smile' },
      { trait_type: 'Sing', value: 'Sing' },
    ],
  },
];

const results = calculateRarityFromData(NFTdata);
```

According to token metadata schema, the `calculateRarity` function only looks at objects in the `attributes` property that use the following format:

```
{ "trait_type": "Background", "value": "Yellow" }
```

It does not take into account attributes with the `display_type` property set, like this:

```
{ "trait_type": "Background", "value": 10, "display_type": "percentage" }
```

### Interface

The output interface for this function looks like this.

```json
[
    { "rarity": "<string> rarity score", "NFT": "<nubmer> NFT number", "filename": "<string optional>" },
    ...
]
```

Here's a sample output. The total sum of the individual attributes is always 100%.

```
[
    {
        "attributeContributions": [
            {
                "trait": "Background",
                "value": "Yellow",
                "contribution": "18.18"
            },
            {
                "trait": "Fur",
                "value": "Gold",
                "contribution": "18.18"
            },
            {
                "trait": "Clothing",
                "value": "Floral Jacket",
                "contribution": "18.18"
            },
            {
                "trait": "Mouth",
                "value": "Tongue",
                "contribution": "27.27"
            },
            {
                "trait": "Sing",
                "value": "None",
                "contribution": "18.18"
            }
        ],
        "totalRarity": "5.50",
        "NFT": 1,
        "filename": "nft1.json"
    },
    ...
]
```

### Examples

See:

- **[/examples/rarity-score-calculation/rarity-from-files.js](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/rarity-score-calculation)**
- **[/examples/rarity-score-calculation/rarity-from-data.js](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/rarity-score-calculation)**

## Trait occurrence calculation

Calculate how often different values for a given trait occur in a collection, percentage-based.

### Usage

Install the package:

```bash
npm i -s @hashgraph/hedera-nft-sdk
```

Import the package into your project and get `calculateTraitOccurrenceFromData` function. Next, you need to pass a JSON array containing NFT collection metadata to the function.

```js
const NFTdata = [
    {
        "creator": "HANGRY BARBOONS",
        "description": "HANGRY BARBOONS are 4,444 unique citizens from the United Hashgraph of Planet Earth. Designed and illustrated by President HANGRY.",
        "format": "none",
        "name": "HANGRY BARBOON #2343",
        "image": "ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png",
        "type": "image/png",
        "properties": { "edition": 2343 },
        "attributes": [
          { "trait_type": "Background", "value": "Yellow" },
          { "trait_type": "Mouth", "value": "Nose" }
        ]
    },
    ...
  ]

  const results = calculateTraitOccurrenceFromData(NFTdata);
```

### Interface

The output interface for this function looks like this.

```json
[
    {
        "trait": "<string> trait name",
        "values": [
            {
                "value": "<string> single value for trait",
                "occurrence": "<string> percentage based occurrence with 2 digits after comma"
            },
            ...
        ]
    },
    ...
]
```

Here's a sample output that shows the percentage of each value's occurrence for a given trait.

```
[
    {
        "trait": "Background",
        "values": [
            {
                "value": "Yellow",
                "occurence": "60.00"
            },
            {
                "value": "Green",
                "occurence": "40.00"
            }
        ]
    },
    {
        "trait": "Mouth",
        "values": [
            {
                "value": "Nose",
                "occurence": "20.00"
            },
            {
                "value": "Tongue",
                "occurence": "20.00"
            },
            {
                "value": "Smile",
                "occurence": "60.00"
            }
        ]
    }
]
```

### Examples

See:

- **[/examples/rarity-score-calculation/trait-occurrence-from-data.js](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/rarity-score-calculation)**

---

## NFT SDK methods

Each of HederaNFTSDK function are methods in class `HederaNFTSDK` which is a wrapper around the native Hedera SDK. The class is used to create a new NFT collection, mint NFTs, and transfer NFTs.

### Usage

Install the package:

```bash
npm i -s @hashgraph/hedera-nft-sdk
```

Create new instance of `HederaNFTSDK` class by passing the operator account ID, operator private key, and network to the constructor.
HederaNFTSDK class has login function in constructor which logs in the operator account and sets the operator account ID and operator private key.
You should create this instance only once. Every exported function will be automatically logged in with the operator account.

```js
new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');
```

### Parameters

Create new instance of `HederaNFTSDK` in the following parameters:

```typescript
type HederaNFTSDKType = {
  accountId: string;
  privateKey: string;
  network: Network;
  localNode?: LocalNode;
  localMirrorNode?: string;
  mirrorNodeUrl?: string;
};
```

- `accountId`: The account ID of the operator account.
- `privateKey`: The private key of the operator account.
- `network`: The network to use (mainnet, testnet, previewnet or loocalNode).
- `localNode`: The local node to use.
- `localMirrorNode`: The local mirror node to use.
- `mirrorNodeUrl`: The mirror node URL to use.

---

## NFT SDK Create Collection

The `create-collection` method is used to create a new NFT collection. This method takes in a collection name and collection symbol and returns a promise that resolves when the collection is successfully created.

### Usage

Create instance of `HederaNFTSDK` class and call `createCollection` method by passing proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

const tokenId = await HederaNFTSDK.createCollection({
  collectionName: 'test_name',
  collectionSymbol: 'test_symbol',
});
```

### Parameters

Create collection method takes in the following parameters:

```typescript
type CreateCollectionType = {
  collectionName: string;
  collectionSymbol: string;
  treasuryAccountPrivateKey?: string;
  treasuryAccount?: string;
  keys?: CreateCollectionKeysType;
  maxSupply?: number;
  customFees?: CustomFeeType[];
  expirationTime?: Date;
  autoRenewAccount?: string;
  autoRenewAccountPrivateKey?: string;
  autoRenewPeriod?: number;
  memo?: string;
};
```

- `collectionName`: The name of the NFT collection.
- `collectionSymbol`: The symbol of the NFT collection.
- `treasuryAccountPrivateKey`: The private key of the treasury account. If not provided, the operator account will be used.
- `treasuryAccount`: The treasury account ID. If not provided, the operator account will be used.
- `keys`: The keys for the collection.
- `maxSupply`: The maximum supply of the collection.
- `customFees`: The custom fees for the collection.
- `expirationTime`: The expiration time of the collection.
- `autoRenewAccount`: The auto-renew account for the collection.
- `autoRenewAccountPrivateKey`: The private key of the auto-renew account.
- `autoRenewPeriod`: The auto-renew period for the collection.
- `memo`: The memo for the collection.

### Output

Method return string which is the token ID of the newly created NFT collection.

### Examples

See: **[/examples/local-metadata-validator/index.js](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/local-metadata-validator)**

---

## NFT SDK Estimate create collection cost in Dollars

The `estimateCreateCollectionInDollars` method is used to estimate the cost of creating a new NFT collection. This method takes in a collection name and collection symbol and returns a promise that resolves when the cost is successfully estimated.

### Usage

Create instance of `HederaNFTSDK` class and call `estimateCreateCollectionInDollars` method by passing the proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

const estimatedDollars = estimateCreateCollectionInDollars({
  collectionName: 'test',
  collectionSymbol: 'test2',
});
```

### Parameters

Estimate create collection in dollars method takes in the following parameters:

```typescript
type EstimateCreateCollectionInDollarsType = {
  collectionName: string;
  collectionSymbol: string;
  treasuryAccountPrivateKey?: string;
  treasuryAccount?: string;
  keys?: CreateCollectionKeysType;
  customFees?: CustomFeeType[];
};
```

- `collectionName`: The name of the NFT collection.
- `collectionSymbol`: The symbol of the NFT collection.
- `treasuryAccountPrivateKey`: The private key of the treasury account. If not provided, the operator account will be used.
- `treasuryAccount`: The treasury account ID. If not provided, the operator account will be used.
- `keys`: The keys for the collection.
- `customFees`: The custom fees for the collection.

### Output

Method return number which is the estimated cost of creating a new NFT collection in dollars.

### Examples

See: **[/examples/local-metadata-validator/index.js](https://github.com/hashgraph/hedera-nft-sdk/tree/main/examples/local-metadata-validator)**

## NFT SDK Estimate create collection cost in Hbar

The `estimateCreateCollectionInHbar` method is used to estimate the cost of creating a new NFT collection. This method takes in a collection name and collection symbol and returns a promise that resolves when the cost is successfully estimated.

### Usage

Create instance of `HederaNFTSDK` class and call `estimateCreateCollectionInHbar` method by passing the proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

const estimatedDollars = estimateCreateCollectionInHbar({
  collectionName: 'test',
  collectionSymbol: 'test2',
});
```

### Parameters

Estimate create collection in hbar method takes in the following parameters:

```ts
type EstimateCreateCollectionInDollarsType = {
  collectionName: string;
  collectionSymbol: string;
  treasuryAccountPrivateKey?: string;
  treasuryAccount?: string;
  keys?: CreateCollectionKeysType;
  customFees?: CustomFeeType[];
};
```

- `collectionName`: The name of the NFT collection.
- `collectionSymbol`: The symbol of the NFT collection.
- `treasuryAccountPrivateKey`: The private key of the treasury account. If not provided, the operator account will be used.
- `treasuryAccount`: The treasury account ID. If not provided, the operator account will be used.
- `keys`: The keys for the collection.
- `customFees`: The custom fees for the collection.

### Output

Method return number which is the estimated cost of creating a new NFT collection in hbars.

---

## NFT SDK Mint Shared Metadata

The `mintSharedMetadata` method is used to mint NFTs with shared metadata. This method takes in a tokenId, supplyKey, amount, and metadata object, and returns a promise that resolves when the NFTs are successfully minted.

This function supports bulk minting. The number of NFTs minted is determined by the amount parameter.

### Usage

Create instance of `HederaNFTSDK` class and call `mintSharedMetadata` method by passing the proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

const mintedMetadata = await HederaNFTSDK.mintSharedMetadata({
  tokenId,
  amount,
  metaData: 'ipfs://bafkreiaghprbybrlrpvjvzqurwmjgfgxp6beo6jhwfarte76qra2xcei3u',
  batchSize: 2,
  supplyKey,
});
```

### Parameters

Mint shared metadata method takes in the following parameters:

```typescript
type MintSharedType = {
  tokenId: string;
  amount: number;
  metaData: string;
  batchSize?: number;
  supplyKey?: string;
};
```

- `tokenId`: The token ID of the NFT collection.
- `amount`: The amount of NFTs to mint.
- `metaData`: The metadata of the NFTs.
- `batchSize`: The amount of NFTs minted in a single on-chain transaction (defaults to 5).
- `supplyKey`: The supply key of the NFTs.

### Output

Method returns an array of objects containing the token ID and the serial number of the minted NFTs.

```typescript
type MintedNFTType = { serialNumber: number; content: string };
```

---

## NFT SDK Mint Unique Metadata

The `mintUniqueMetadata` method is used to mint NFTs with unique metadata. This method takes in a tokenId, supplyKey, and an array of NFT metadata or path to metadata object file and returns a promise that resolves when the NFTs are successfully minted.

This function supports bulk minting. The number of NFTs minted is determined by the length of metadata array, just as in regular SDK, but it's not limited to 10 elements.

### Usage

Create instance of `HederaNFTSDK` class and call `mintUniqueMetadata` method by passing the proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

// Pass the metadata as an array
const mintedMetadata = await HederaNFTSDK.mintUniqueMetadata({
  tokenId,
  supplyKey,
  batchSize: 2,
  metadata: [
    'ipfs://bafkreiaghprbybrlrpvjvzqurwmjgfgxp6beo6jhwfarte76qra2xcei3u',
    'ipfs://bafkreibqfchoan4gt4qz34ztfmrzo7lksf465ihb6czofz4t2z4dmbxnc4',
  ],
});

// Pass the path to the metadata file
const mintedMetadata = await HederaNFTSDK.mintUniqueMetadata({
  tokenId,
  supplyKey,
  batchSize: 2,
  pathToMetadataURIsFile: pathToOneLineCSV,
});
```

### Parameters

Mint unique metadata method takes in the following parameters:

```typescript
type MintUniqueType = {
  tokenId: string;
  supplyKey: string;
  batchSize?: number;
  pathToMetadataURIsFile?: string;
  metadata?: string[];
};
```

- `tokenId`: The token ID of the NFT collection.
- `supplyKey`: The supply key of the NFTs.
- `batchSize`: The amount of NFTs minted in a single on-chain transaction (defaults to 5).
- `pathToMetadataURIsFile`: The path to the file containing the metadata URIs.
- `metadata`: The metadata URIs of the NFTs.

### Output

Method returns an array of objects containing the token ID and the serial number of the minted NFTs.

```typescript
type MintedNFTType = { serialNumber: number; content: string };
```

---

## NFT SDK Estimate minting cost in Dollars

The `estimateNftMintingInDollars` method is used to estimate the cost of minting NFTs. This method takes in a nft amount and returns a promise that resolves when the cost is successfully estimated.

### Usage

Create instance of `HederaNFTSDK` class and call `estimateNftMintingInDollars` method by passing the proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');
const nfts = ['1', '2', '3', '4', '5'];

const result = await HederaNFTSDK.estimateNftMintingInDollars({ amountOfNfts: nfts.length });
```

### Parameters

Estimate mint metadata in dollars method takes in the following parameters:

```typescript
type EstimateMintDollarsType = {
  amountOfNfts: number;
};
```

- `amountOfNfts`: The amount of NFTs to mint.

### Output

Method return number which is the estimated cost of minting NFTs in dollars.

---

## NFT SDK Estimate minting cost in Hbar

The `estimateNftMintingInHbar` method is used to estimate the cost of minting NFTs. This method takes in a nft amount and returns a promise that resolves when the cost is successfully estimated.

### Usage

Create instance of `HederaNFTSDK` class and call `estimateNftMintingInHbar` method by passing the proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');
const nfts = ['1', '2', '3', '4', '5'];

const result = await HederaNFTSDK.estimateNftMintingInHbar({ amountOfNfts: nfts.length });
```

### Parameters

Estimate mint metadata in hbar method takes in the following parameters:

```typescript
type EstimateMintHbarType = {
  amountOfNfts: number;
};
```

- `amountOfNfts`: The amount of NFTs to mint.

### Output

Method return number which is the estimated cost of minting NFTs in hbar.

---

## NFT SDK Increase NFT Supply

The `increaseNFTSupply` method is used to increase the supply of NFTs.

### Usage

Create instance of `HederaNFTSDK` class and call `increaseNFTSupply` method by passing the proper parameters.

```js
const HederaNFTSDK = new HederaNFTSDK(operatorAccountId, operatorPrivateKey, 'testnet');

const increaseSupplyResult = await HederaNFTSDK.increaseNFTSupply({
  nftId: nft.nftId,
  amount: 5,
  batchSize: 10,
  supplyKey,
});
```

### Parameters

Increase NFT supply method takes in the following parameters:

```typescript
type IncreaseNFTSupplyType = {
  nftId: NftId;
  amount: number;
  batchSize?: number;
  supplyKey?: string;
};
```

- `nftId`: The ID of the NFT.
- `amount`: The amount of NFTs to mint.
- `batchSize`: The amount of NFTs minted in a single on-chain transaction (defaults to 5).
- `supplyKey`: The supply key of the NFTs.

### Output

Method returns an array of objects containing the token ID and the serial number of the minted NFTs.

```typescript
type MintedNFTType = { serialNumber: number; content: string };
```

## NFT SDK Get Holder And Duration

The `getHolderAndDuration` method is used to get the holder and duration of an NFT. This method runs without instance of `HederaNFTSDK` class.

### Usage

Call `getHolderAndDuration` method by passing the proper parameters.

```js
const result = await getHolderAndDuration({ tokenId, serialNumber: nftSerial, network: 'testnet' });
```

### Parameters

Create royalty fee method takes in the following parameters:

```typescript
type GetHolderAndDurationType = {
  tokenId: string;
  serialNumber: number;
  network?: NetworkName;
};
```

- `tokenId`: The token ID of the NFT.
- `serialNumber`: The serial number of the NFT.
- `network`: The network to use (mainnet, testnet, previewnet or loocalNode).

### Output

Method returns an object containing the holder and duration of the NFT.

```typescript
type HolderAndDurationType = { holder: string; duration: number };
```

## Royalty Fee Creator

The `FeeFactory` class is used to create custom fees for NFT collections. The class is used to create fixedFee or royaltyFee.
Initialize the class and use one of the methods to create a fee.

### Usage

Install the package:

```bash
npm i -s @hashgraph/hedera-nft-sdk
```

Create new instance of `FeeFactory`

```js
feeFactoryInstance = new FeeFactory();
```

## Royalty Fee Creator: fixedFee

The `fixedFee` method is used to create a fixed fee for NFT collections.

### Usage

Create new instance of `FeeFactory`

```js
const feeFactoryInstance = new FeeFactory();
```

Call `fixedFee` method by passing the proper parameters.

```js
const fixedFee = feeFactoryInstance.fixedFee({
  allCollectorsAreExempt: false,
  collectorAccountId: myAccountId,
  hbarAmount: 100,
});
```

### Parameters

Create fixed fee method takes in the following parameters(You need to pass either hbarAmount or (amount and denominatingTokenId)):

```typescript
type FixedFeeType = {
  collectorAccountId: string;
  hbarAmount?: number;
  amount?: number;
  denominatingTokenId?: string;
  allCollectorsAreExempt?: boolean;
};
```

- `collectorAccountId`: The account ID of the collector.
- `hbarAmount`: The amount of hbar to charge.
- `amount`: The amount to charge.
- `denominatingTokenId`: The token ID to use for the fee.
- `allCollectorsAreExempt`: Whether all collectors are exempt from the fee.

## Royalty Fee Creator: royaltyFee

The `royaltyFee` method is used to create a royalty fee for NFT collections.

### Usage

Create new instance of `FeeFactory`

```js
const feeFactoryInstance = new FeeFactory();
```

Call `fixedFee` method by passing the proper parameters.

```js
const fixedFee = feeFactoryInstance.fixedFee({
  allCollectorsAreExempt: false,
  collectorAccountId: myAccountId,
  hbarAmount: 100,
});
```

### Parameters

Create royalty fee method takes in the following parameters:

```typescript
type RoyaltyFeeType = {
  collectorAccountId: string;
  numerator: number;
  denominator: number;
  fallbackFee?: FixedFeeType;
  allCollectorsAreExempt?: boolean;
};
```

- `collectorAccountId`: The account ID of the collector.
- `numerator`: The numerator of the royalty fee.
- `denominator`: The denominator of the royalty fee.
- `fallbackFee`: The fallback fee for the royalty fee.
- `allCollectorsAreExempt`: Whether all collectors are exempt from the fee.

<br>

## Metadata Validator

The `TokenMetadataValidator` class is a comprehensive tool designed to facilitate the validation of NFT metadata against the [token metadata schema](https://docs.hedera.com/hedera/tutorials/token/structure-your-token-metadata-using-json-schema-v2). This class provides developers with a suite of methods to validate individual NFT metadata objects, arrays of metadata, local files, and directories containing NFT metadata, ensuring compliance with the token metadata schema. Additionally, it offers functionalities to validate metadata directly from the Hedera network, providing a robust solution for ensuring the integrity and compliance of NFT metadata within the Hedera ecosystem.

### Methods & Initialization

The class methods can be directly invoked to perform metadata validation.

1. `validateSingleMetadataObject` - Validates a single NFT metadata object against the token metadata schema.

### Usage

```js
const validationResult = TokenMetadataValidator.validateSingleMetadataObject(metadataObject);
```

### Output

This method returns an object contains:

- `isValid` boolean flag
- Array of errors

### Example result

```ts
type validationResult = {
  isValid: boolean;
  errors: string[];
};
```

---

2. `validateArrayOfObjects` - Takes an array of metadata objects and validates each one against the token metadata schema, providing detailed results for each object.

```js
const validationResults = TokenMetadataValidator.validateArrayOfObjects(arrayOfMetadataObjects);
```

### Output

This method returns an object contains:

`isValid`: A boolean flag indicating whether the metadata object at the index passed validation,
`errors`: An array of strings listing all validation errors found for the metadata object,
`errorsCount`: The number of errors found for the metadata object,
`allObjectsValid`: A boolean flag indicating whether all metadata objects in the array passed validation without any errors.

### Example result

```ts
type validationResult = {
  allObjectsValid: boolean;
  results: {
    [index: number]: {
      isValid: boolean;
      errorsCount: number;
      errors: string[];
    };
  };
};
```

---

3. `validateLocalFile` - This method allows for the validation of metadata within a local file. It reads the file content, parses the JSON, and validates it against the token metadata schema.

```js
const pathToFile = 'path/to/your/file';
const fileValidationResult = TokenMetadataValidator.validateLocalFile(pathToFile);
```

### Output

This method returns an object contains:

- `isValid` boolean flag
- Array of errors

### Example result

```ts
type validationResult = {
  isValid: boolean;
  errors: string[];
};
```

---

4. `validateLocalDirectory` - Validates all JSON metadata files within a specified directory, offering a comprehensive tool for pre-publish validation of NFT collections.

```js
const directoryPath = 'path/to/your/metadata/directory';
const directoryValidationResult = TokenMetadataValidator.validateLocalDirectory(directoryPath);
```

### Output

This method returns an object contains:

- `isValid`: A boolean flag indicating whether all files within the specified directory passed validation. It is true if all files are valid according to the token metadata schema, and false otherwise.
- `errors`: An array of objects, each corresponding to a file that failed validation. Each object include:
  - `fileName`: The name of the file that encountered validation errors, helping to identify the source of the issue.
  - `general`: An array of strings, with each string describing a specific validation error encountered in the file.

### Example result

```ts
type validationResult = {
  isValid: boolean;
  errors: string[];
};
```

---

5. `validateSingleOnChainNFTMetadata ` - Targets the validation of metadata for a single NFT within a collection on the Hedera network. This method is particularly useful for in-depth analysis of individual NFTs.

```ts
type validateSingleOnChainNFTMetadataType = {
  network: string;
  tokenId: string;
  serialNumber: string;
  ipfsGateway?: string;
};

const singleNftValidationResult = await TokenMetadataValidator.validateSingleOnChainNFTMetadata(
  network,
  tokenId,
  serialNumber,
  ipfsGateway
);
```

- `network`: The network to use (mainnet, testnet or previewnet),
- `tokenId`: The unique identifier of the NFT token within the Hedera network, used to locate and validate metadata for the specific token,
- `serialNumber`: The serial number of the NFT, allowing for the validation of metadata for individual NFTs within a collection,
- `ipfsGateway`: Optional. Specifies the IPFS gateway URL to be used for decoding the encoded NFT metadata URL.

### Output

This method returns an object contains:

- `isValid` boolean flag
- Array of errors

### Example result

```ts
type validationResult = {
  isValid: boolean;
  errors: string[];
};
```

---

6. `validateMetadataFromOnChainCollection` - Fetches and validates metadata for an entire NFT collection directly from the Hedera network, leveraging either the testnet or mainnet. This method is crucial for verifying the compliance of on-chain NFT collections.

```ts
type validateSingleOnChainNFTMetadataType = {
  network: string;
  tokenId: string;
  ipfsGateway?: string;
  limit: number;
};

const collectionValidationResult = await TokenMetadataValidator.validateMetadataFromOnChainCollection(network, tokenId, ipfsGateway, limit);
```

- `network`: The network to use (mainnet, testnet or previewnet),
- `tokenId`: The unique identifier of the NFT token within the Hedera network, used to locate and validate metadata for the specific token,
- `ipfsGateway`: Optional. Specifies the IPFS gateway URL to be used for decoding the encoded NFT metadata URL,
- `limit`: Specifies how many NFT per page should be fetched. Default number is set to 100.

### Output

This method returns an object containing:

- `isValid`: A boolean flag indicating whether all metadata objects passed validation without any errors.
- `errors`: An array of objects, each containing a `serialNumber` identifying the specific NFT and a `message array` listing all validation errors found for that NFT.

### Example result

```ts
type validationResult = {
  isValid: boolean;
  errors: string[];
};
```

---

## Metadata builder

The `Hip412MetadataBuilder` class streamlines the creation of NFT metadata objects in alignment with the [token metadata schema](https://docs.hedera.com/hedera/tutorials/token/structure-your-token-metadata-using-json-schema-v2). It provides a fluent interface to incrementally build up a metadata object with validation at each step, ensuring that the resulting metadata conforms to the required specifications. This builder class is essential for developers seeking to craft compliant NFT metadata for deployment on the Hedera network.

### Methods and Initialization

Upon instantiation, the `Hip412MetadataBuilder` initializes a metadata object with `name`, `image` and `type` empty fields. Users can then sequentially apply various setters and adders to populate this metadata object with the necessary details.

## Initialization

```js
const metadataBuilder = new Hip412MetadataBuilder();
```

### Key Methods

```ts
- setName(name: string): 'Sets the name of the NFT', // required
- setImage(image: string): 'Sets the image URL for the NFT', // required
- setType(type: string): 'Sets the type of the NFT', // required
- setDescription(description: string): 'Adds a description to the NFT metadata',
- setCreator(creator: string): 'Defines the creator of the NFT',
- setCreatorDID(creatorDID: string): 'Specifies the Decentralized Identifier (DID) for the creator',
- setChecksum(checksum: string): 'Assigns a checksum for the metadata integrity verification',
- addAttribute(attribute: Attribute): 'Appends a custom attribute to the NFT', //can be used multiple times
- addFile(file: FileMetadata): 'Adds a file (with URI, type, etc.) to the NFT metadata', // can be used multiple times
- addProperty({ key, value }): 'Includes a custom property to the NFT metadata', // can be used multiple times
- setLocalization(localization: Localization): 'Establishes localization information for the NFT metadata',
- build(): 'Validates and finalizes the metadata object, returning both the metadata and its validation result'. // required
```

### Usage

Here's an example of how to use the `Hip412MetadataBuilder` to construct NFT metadata:

```ts
const { metadata, validationResult } = new Hip412MetadataBuilder()
  .setName('My Awesome NFT')
  .setImage('https://example.com/my-awesome-nft.png')
  .setType('image/png')
  .setDescription('This is a description of my awesome NFT')
  .addAttribute({
    trait_type: 'Background',
    value: 'Space',
  })
  .addFile({
    uri: 'https://example.com/nft-metadata.json',
    type: 'application/json',
  })
  .build();
```

### Output

The `build` method returns an object containing:

- `metadata`: This property holds the constructed metadata object that has been assembled using the builder methods. The metadata object follows the structure required by token metadata schema, including attributes such as name, image, type, and any additional attributes or files that were added. This object is ready to be used for NFT creation or further processing.

- `validationResult`: This property contains the results of validating the constructed metadata object against the token metadata schema. It provides feedback on the compliance of the metadata, including a boolean flag indicating validity (isValid) and detailed error information (as array of strings) for each metadata element that was evaluated.

### Example metadata result

```json
{
  "name": "My Awesome NFT",
  "image": "https://example.com/my-awesome-nft.png",
  "type": "image/png",
  "description": "This is a description of my awesome NFT",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Space"
    }
  ],
  "files": [
    {
      "uri": "https://example.com/nft-metadata.json",
      "type": "application/json"
    }
  ],
  "format": "HIP412@2.0.0" // Automatically added by the builder to indicate compliance with a specific version of the standard
}
```

### Example validation result

```ts
type validationResult = {
  isValid: boolean;
  errors: string[];
};
```

---

## Convert CSV To Metadata Objects

The `convertCSVToMetadataObjects` function is designed to transform CSV files into an array of metadata objects compliant with the NFT metadata structure defined in the token metadata schema. This utility function facilitates the conversion of bulk NFT data stored in CSV format into a structured JSON format that can be directly utilized for NFT minting or further processing within the NFT ecosystem.

### Usage

To convert a CSV file into an array of metadata objects, you need to provide the path to the CSV file. Optionally, you can also specify a limit to control the number of rows processed from the CSV file.

```ts
const csvFilePath = 'path/to/your/csv-file.csv';
const metadataObjects = await convertCSVToMetadataObjects(csvFilePath, 100);
```

### Parameters

- `csvFilePath`: A string that specifies the path to the CSV file containing the NFT metadata information,
- `limit`: An optional parameter that defines the maximum number of rows to be processed from the CSV file. If not provided, all rows in the file will be processed.

<strong>Important!</strong> The first two lines in the csv file are headers and they are skipped. You can find a valid csv example at the path `src/test/__mocks__/csv/csv-example-with-all-fields`

### Output

This function returns a promise that resolves to an array of MetadataObjects. Each `MetadataObject` in the array represents an individual NFT's metadata, structured according to the requirements of the token metadata schema.

### Error Handling

If the CSV file contains fewer data rows than the headers (after omitting specific header counts defined in the SDK), an error is thrown, indicating that the CSV file is empty or does not contain sufficient data for processing.

---

## Convert Metadata Objects to JSON Files

The `convertMetadataObjectsToJsonFiles` function streamlines the process of converting an array of NFT metadata objects into individual JSON files. This utility is particularly useful for batch processing and storage of NFT metadata, facilitating easy upload and management of NFT collections. Before conversion, it validates each metadata object against the token metadata schema to ensure compliance.

### Usage

To convert metadata objects into JSON files, you need to provide the array of metadata objects, the destination path for the saved JSON files, and optionally, a limit to control the number of metadata objects processed.

```ts
const metadataObjects = [
  {
    /* Your Metadata Objects */
  },
];
const savedJsonFilesLocation = 'path/to/save/json-files';
const limit = 100; // Optional

const conversionResult = await convertMetadataObjectsToJsonFiles({
  metadataObjects,
  savedJsonFilesLocation,
  limit,
});
```

### Parameters

- `metadataObjects`: An array of MetadataObject items to be converted into JSON files. Each `MetadataObject` should conform to the structure required by the NFT metadata schema,
- `savedJsonFilesLocation`: A string specifying the directory path where the resulting JSON files should be saved,
- `limit`: An optional parameter specifying the maximum number of metadata objects to process. If not provided, all objects in the `metadataObjects` array will be processed.

### Output

This function returns a promise that resolves to an object with the following properties:

- `isValid`: A boolean flag indicating whether all provided metadata objects are valid according to the token metadata validation process,
- `errors`: An array containing detailed error information for each metadata object that failed validation. Each error object includes the index of the metadata object (objectIndex) and an array of error messages (errors),
- `savedJsonFilesLocation`: The location where the JSON files have been saved.

### Error Handling

The `convertMetadataObjectsToJsonFiles` function strictly requires all metadata objects to pass token metadata validation before proceeding with the conversion to JSON files. The validation is performed upfront, and only if every metadata object is deemed valid, will the function save the JSON files to the specified location. If any of the metadata objects fail validation, no files will be saved, and the function will return detailed information about the errors encountered. This ensures the integrity and compliance of all NFT metadata before it is serialized into JSON format, allowing developers to rectify any issues in a single batch process.

---

## Prepare Metadata Objects From CSV Rows

The `prepareMetadataObjectsFromCSVRows` function serves as an intermediary step in the conversion of CSV data into structured NFT metadata objects. It processes rows of CSV data, applying a predefined schema to transform them into an array of metadata objects suitable for NFT creation or further validation against the token metadata schema.

### Usage

To transform CSV rows into metadata objects, you need to provide the parsed rows from a CSV file. The function utilizes predefined headers for attributes and properties to map CSV data accurately into metadata objects.

```ts
const csvParsedRows = [
  {
    /* Array of parsed CSV rows */
  },
];
const metadataObjects = prepareMetadataObjectsFromCSVRows({ csvParsedRows });
```

### Parameters

- `csvParsedRows`: An array of CSVRow objects, representing the rows parsed from a CSV file. Each CSVRow object is a key-value map corresponding to one row of data in the CSV, where keys are column headers, and values are the cell data for that row.

### Output

The function returns an array of metadata objects, with each object structured according to the NFT metadata schema. This array can be directly used for NFT minting, further validation, or conversion into JSON files for storage and distribution.

### Transformation Logic

The function relies on predefined headers for attributes (ATTRIBUTES) and properties (PROPERTIES) to map data from CSV rows into the structured format required by NFT metadata. This ensures that the resulting metadata objects are correctly formatted and include all necessary information for NFT creation, such as names, images, types, and other customizable attributes and properties.

---

## UPLOAD SERVICE

The Upload Service class is a versatile component of the SDK that facilitates the upload of files and metadata across various storage solutions implemented in the SDK. This service is crucial for efficiently managing file uploads, ensuring that they are handled correctly according to the specified storage service's requirements.

## Methods & Initialization

The class methods offer diverse functionalities to upload files from paths, blob objects, buffer files, and NFT metadata, catering to different needs of the NFT ecosystem.

1. `uploadFilesFromPath` - Uploads files from given directory paths or specific file paths to the configured storage service and returns URLs to the uploaded files.

### Usage

```ts
const paths = ['path/to/your/directory', 'path/to/your/file'];
const uploadResults = await uploadService.uploadFilesFromPath(paths);
```

### Output

This method returns an array of objects, each containing the file content and the URL where the file was uploaded.

### Example result

```ts
type UploadServiceReturn = {
  content: Blob;
  url: string;
}[];
```

---

2. `uploadBlobFiles` - Handles the upload of blob files or buffer files and returns URLs to these files, ensuring that files are not empty before upload.

### Usage

```ts
const files = [new Blob(['data'], { type: 'text/plain' })];
const blobUploadResults = await uploadService.uploadBlobFiles(files);
```

### Output

This method returns an array of objects, each detailing the content of the uploaded file and the URL where it was uploaded.

### Example Result

```ts
type UploadServiceReturn = {
  content: Blob | BufferFile;
  url: string;
}[];
```

---

3. `handleBlobUpload ` - Specifically designed for uploading NFT metadata as JSON blobs, generating a URL where the metadata is stored.

### Usage

```ts
const metadata = { name: 'Example NFT', description: 'This is an NFT metadata example.' };
const metadataUploadResult = await uploadService.handleBlobUpload(metadata);
```

### Output

This method returns an object containing the metadata blob content and the URL where the metadata was uploaded.

### Example result

```ts
type UploadServiceReturn = {
  content: Blob;
  url: string;
};
```

---

4. `uploadMetadataList ` - Allows for batch uploading of NFT metadata, handling each metadata item individually and compiling the resulting URLs.

### Usage

```ts
const metadatas = [{ name: 'NFT 1' }, { name: 'NFT 2' }];
const metadataListUploadResults = await uploadService.uploadMetadataList(metadatas);
```

### Output

This method returns an array of objects, each containing a single metadata's blob content and the URL where it was uploaded.

### Example result

```ts
type UploadServiceReturn = {
  content: Blob;
  url: string;
}[];
```

---

## FILE STORAGE SERVICES

The File Storage Services module provides a variety of options for storing and retrieving files, crucial for managing the digital assets related to NFTs. This module integrates with multiple storage solutions, including AWS S3, IPFS through Pinata and NFT.storage, as well as a mock storage service for testing and development purposes.

### Services & Initialization

Each storage service implements the FileStorage interface, ensuring consistent API calls across different storage backends.

## AWS Service

The AWSService class facilitates the upload of files to AWS S3. It provides robust error handling and flexible configuration for file uploads, including setting access permissions and handling multipart uploads.

### Usage

```ts
const awsService = new AWSService(accessKeyId, secretAccessKey, region, bucketName);
const uploadUrl = await awsService.uploadFile(fileBlob);
```

### Output

This method returns a string containing the URL to the uploaded file.

### Example result

```ts
type UploadResult = {
  url: string;
};
```

## Pinata Service

The PinataService class allows for the pinning of files to IPFS via the Pinata Cloud service. It supports metadata and pinning options, providing a direct ipfs:// URL upon successful upload.

### Usage

```ts
const pinataService = new PinataService(jwtKey);
const ipfsUrl = await pinataService.uploadFile(fileBlob);
```

### Output

This method returns a string containing the IPFS URL of the pinned file.

### Example result

```ts
type UploadResult = {
  url: string;
};
```

## NFT Storage Service

The NftStorageService integrates with the NFT.storage platform to upload files directly to IPFS, simplifying the process of storing NFT assets. It allows for dynamic API key usage, ensuring flexibility and security.

### Usage

```ts
const nftStorageService = new NftStorageService(apiKeys);
const ipfsUrl = await nftStorageService.uploadFile(fileBlob);
```

### Output

This method returns a string containing the IPFS URL of the uploaded file.

### Example result

```ts
type UploadResult = {
  url: string;
};
```

## Mock Storage Service

The MockStorageService is designed for development and testing purposes, providing a straightforward implementation that returns a predefined URL.

### Usage

```ts
const mockService = new MockStorageService(serviceUrl);
const mockUrl = await mockService.uploadFile();
```

### Output

This method returns a string containing the predefined URL.

### Example result

```ts
type UploadResult = {
  url: string;
};
```

---

## Questions or Improvement Proposals

Please create an issue or PR on [this repository](https://github.com/hashgraph/hedera-nft-sdk). Make sure to join the [Hedera Discord server](https://hedera.com/discord) to ask questions or discuss improvement suggestions.

# Support

If you have a question on how to use the product, please see our
[support guide](https://github.com/hashgraph/.github/blob/main/SUPPORT.md).

# Contributing

Contributions are welcome. Please see the
[contributing guide](https://github.com/hashgraph/.github/blob/main/CONTRIBUTING.md)
to see how you can get involved.

# Code of Conduct

This project is governed by the
[Contributor Covenant Code of Conduct](https://github.com/hashgraph/.github/blob/main/CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code of conduct. Please report unacceptable behavior
to [oss@hedera.com](mailto:oss@hedera.com).

# License

[Apache License 2.0](LICENSE)
