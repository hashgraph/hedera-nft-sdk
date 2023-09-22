<div align="center">

# Hedera NFT Utilities

[![License](https://img.shields.io/badge/license-apache2-blue.svg)](LICENSE)

</div>

This package includes all sorts of tooling for the Hedera NFT ecosystem, including:

1. **Token metadata validation:** Verify your metadata against the [token metadata JSON schema V2](https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md) for NFTs, which returns errors and warnings against the standard. You can also define your own token metadata standard and add it to the package to use this schema for validation.
2. **Local metadata validator:** Verify a local folder containing multiple JSON metadata files against the standard before publishing the NFT collection on the Hedera network. 
3. **Risk score calculation:** Calculate a risk score for an NFT collection from the token information or by passing a token ID of an NFT on the Hedera testnet or mainnet.
4. **Rarity score calculation:** Calculate the rarity scores for a local folder containing multiple JSON metadata files for an NFT collection. 


## Table of Contents

- **How to build the package**
- **Package: [Token metadata validator](#token-metadata-validator)**
- **Package: [Local metadata validator](#local-validator)**
- **Package: [Risk score calculation](#risk-score-calculation)**
- **Package: [Rarity score calculation](#rarity-score-calculation)**
- **Package: [Trait occurrence calculation](#trait-occurrence-calculation)**
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

## Token metadata validator

Verify your metadata against the [token metadata V2 standard](https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md) for NFTs which returns errors and warnings against the standard.

### Usage

Install the package:

```bash
npm i -s @hashgraph/nft-utilities
```

Import the package into your project. You can import the `Validator` class and the default schema version for token metadata with `defaultSchemaVersion`.

```js
const { Validator, defaultSchemaVersion } = require('@hashgraph/nft-utilities');
```

You can use the `Validator` like below. 
1. The first parameter is the JSON object you want to verify against a JSON schema
2. The second parameter is the version of the token metadata JSON schema against which you want to validate your metadata instance. The default value is `2.0.0` (V2). In the future, new functionality might be added, releasing new version numbers.

```js
const metadata = {
    attributes: [
        { trait_type: "Background", value: "Yellow" }
    ],
    creator: "NFT artist",
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

See: **[/examples/token-metadata-validator](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/token-metadata-validator)**

### Add custom schema versions

#### Method 1: Use Validator constructor to pass custom schemas

The easiest approach to adding new schemas is using the constructor of the `Validator` class. It accepts an array of JSON objects, each containing a JSON schema and tag for the schema. The tag is used to refer to the schema when validating metadata instances. 

Therefore, each tag needs to be unqiue. The following tags can't be used as they are already occupied:

- `1.0.0` -> Refers to token metadata JSON schema V1 (HIP10)
- `2.0.0` -> Refers to token metadata JSON schema V2 (HIP412)

You can add your custom schema like this:

```js
const { Validator } = require('@hashgraph/nft-utilities');

// Define your schema
const customSchema = {
    "title": "Token Metadata",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this token represents."
        }
    },
    "required": ["name"]
}

// Create Validator instance with custom schema labeled "custom-v1"
const validator = new Validator([{ schemaObject: customSchema, tag: "custom-v1" }]);

// Verify metadata against custom schema
const results = validator.validate(metadataInstance, "custom-v1");
console.log(results);
```

**Examples:** See: [/examples/token-metadata-calculation](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/token-metadata-calculation/custom-schema-valid-metadata.js)


#### Method 2: Rebuilding package

> ⚠️ Warning: **This approach requires you to rebuild the package.**

You can add custom JSON schemas to the `/schemas` folder. 

You can then add the version to the `schemaMap` in `/schema/index.js` using the following code:

```js
const token_metadata_2_0_0 = require("./HIP412@2.0.0.json");
const myCustomSchema = require("./myschema.json"); // import your schema

const schemaMap = new Map();
schemaMap.set('2.0.0', token_metadata_2_0_0);
schemaMap.set('<version>', myCustomSchema); // Add your schema to the map
```

When you've added your schema to the map, you can validate against your schema version by passing your version to the `validator()` function.

### Add custom validation rules

Set custom validation rules by importing new validators from the `/validators` folder into the `index.js` file. You can then add them to the `validate()` function. Stick to the `issues` format of errors and warnings (see section "Issues format" for the detailed description).

```js
const { myCustomValidator, schemaValidator } = require("./validators");

const validate = (instance, schemaVersion = defaultSchemaVersion) => {
    let errors = [];
    let warnings = [];

    const schema = this.getSchema(schemaVersion)

    // When errors against the schema are found, you don't want to continue verifying the NFT
    // Warnings don't matter because they only contain "additional property" warnings that don't break the other validators
    const schemaProblems = schemaValidator(instance, schema);
    warnings.push(...schemaProblems.warnings);
    if (schemaProblems.errors.length > 0) {
        errors.push(...schemaProblems.errors);

        return {
            errors,
            warnings
        }
    }

    const customErrors = myCustomValidator(instance);
    errors.push(...customErrors);

    return {
        errors,
        warnings
    };
}
```

## Local validator

Verify a local folder containing multiple JSON metadata files against the standard before publishing the NFT collection on the Hedera network.

### Usage

Install the package:

```bash
npm i -s @hashgraph/nft-utilities
```

Import the package into your project and get the `localValidation` function.

```js
const { localValidation } = require('@hashgraph/nft-utilities');
```

The `localValidation` expects an absolute path to your metadata files to verify them. The function prints the warnings and errors for all JSON files it finds in the provided folder path. It also returns the validation results as an object in case you want to use the results in your code.

```js
localValidation("/Users/projects/nft/files");
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

See: **[/examples/local-metadata-validator/index.js](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/local-metadata-validator)**

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
    fee_schedule_key: 40
  },
  properties: {
    supply_type_infinite: 20
  }
};
```

However, there's one edge case where the 20 weight for the supply key is not counted. When the supply type is set to `FINITE` and the total supply equals the max supply, there's no risk the supply key can further dilute the project because the project's minting limit has been reached.

To determine the risk level, there are four categories each with an attached score. If the score is lower than or equal to a risk level, it will get that risk level. E.g. a token with a risk score of 200 will get a `HIGH` risk level. 

```js
const defaultRiskLevels = {
    NORISK: 0,
    LOW: 40,
    MEDIUM: 199,
    HIGH: 2000
};
```

### Usage

Install the package:

```bash
npm i -s @hashgraph/nft-utilities
```

Import the package into your project and get the `calculateRiskScoreFromData` or `calculateRiskScoreFromTokenId` functions.

```js
const { calculateRiskScoreFromData, calculateRiskScoreFromTokenId } = require('@hashgraph/nft-utilities');
```

The `calculateRiskScoreFromData` expects a token information JSON object as returned by the [/api/v1/tokens/<token-id> endpoint](https://docs.hedera.com/hedera/docs/mirror-node-api/rest-api#response-details-6) (here's an [example of token data](https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/0.0.1270555/)).

```js
const tokenInformation = {
        "admin_key": null,
        "auto_renew_account": "0.0.784037", "auto_renew_period": 7776000,
        "freeze_key": null,
        ...
}

const results = calculateRiskScoreFromData(tokenInformation);
```

Alternatively, use the `calculateRiskScoreFromTokenId` to retrieve risk information about a token by entering a token ID. This asynchronous function looks up the token information from the mirror node and returns the risk information.

```js
const results = await calculateRiskScoreFromTokenId("0.0.1270555");
```

### Interface

The output interface for this function looks like this.

```json
{ 
    "riskScore": "number representing total risk score", 
    "riskLevel": "<string: ENUM(NORISK, LOW, MEDIUM, HIGH)>"
}
```

### Examples

See: **[/examples/risk-score-calculation](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/risk-score-calculation)**

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
npm i -s @hashgraph/nft-utilities
```

Import the package into your project and get `calculateRarity` function. Next, you need to pass an absolute path to a folder containing metadata JSON files. 

```js
const { calculateRarity } = require('@hashgraph/nft-utilities');

const absolutePathToFiles = "/Users/myUser/nft-utilities/examples/rarity-score-calculation/files";
const results = calculateRarity(absolutePathToFiles);
console.log(results)
```

You can also avoid having to load data from files by using the `calculateRarityFromData` function.

```js
const NFTdata = [
    {
        "name": "HANGRY BARBOON #2343",
        "image": "ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png",
        "type": "image/png",
        "attributes": [
            { "trait_type": "Background", "value": "Yellow" },
            { "trait_type": "Fur", "value": "Silver" },
            { "trait_type": "Clothing", "value": "Herbal Jacket" },
            { "trait_type": "Mouth", "value": "Smile" },
            { "trait_type": "Sing", "value": "Sing" }
        ]
    }
]

const results = calculateRarityFromData(NFTdata);
```

According to token metadata JSON schema V2, the `calculateRarity` function only looks at objects in the `attributes` property that use the following format:

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
- **[/examples/rarity-score-calculation/rarity-from-files.js](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/rarity-score-calculation)**
- **[/examples/rarity-score-calculation/rarity-from-data.js](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/rarity-score-calculation)**

## Trait occurrence calculation

Calculate how often different values for a given trait occur in a collection, percentage-based.

### Usage

Install the package:

```bash
npm i -s @hashgraph/nft-utilities
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
- **[/examples/rarity-score-calculation/trait-occurrence-from-data.js](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/rarity-score-calculation)**

## Questions or Improvement Proposals

Please create an issue or PR on [this repository](https://github.com/hashgraph/hedera-nft-utilities). Make sure to join the [Hedera Discord server](https://hedera.com/discord) to ask questions or discuss improvement suggestions.

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