<div align="center">

# Hedera NFT Utilities

[![License](https://img.shields.io/badge/license-apache2-blue.svg)](LICENSE)

</div>

This package includes all sorts of tooling for the Hedera NFT ecosystem, including:

1. **HIP412 metadata validation:** Verify your metadata against the [HIP412 metadata standard](https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md) for NFTs, which returns errors and warnings against the standard.
2. **Local metadata validator:** Verify a local folder containing multiple JSON metadata files against the standard before publishing the NFT collection on the Hedera network. 
3. **Risk score calculation:** Calculate a risk score for a token from the token information or by passing a token ID of an NFT on the Hedera testnet or mainnet. 
4. **Rarity score calculation:** Calculate the rarity scores for a local folder containing multiple JSON metadata files for an NFT collection. 


## Table of Contents

- **Package: [HIP412 metadata validator](#hip412-validator)**
- **Package: [Local metadata validator](#local-validator)**
- **Package: [Risk score calculation](#risk-score-calculation)**
- **Package: [Rarity score calculation](#rarity-score-calculation)**
- **[Questions, contact us, or improvement proposals?](#questions-or-improvement-proposals)**
- **[Support](#Support)**
- **[Contributing](#Contributing)**
- **[Code of Conduct](#Code-of-Conduct)**
- **[License](#License)**


## HIP412 metadata validator

Verify your metadata against the [HIP412 metadata standard](https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md) for NFTs which returns errors and warnings against the standard.

### Usage

Install the package:

```bash
npm i -s @hashgraph/nft-utilities
```

Import the package into your project. You can import the `validator` function and the default schema version for HIP412 with `defaultVersion`.

```js
const { validator, defaultVersion } = require('@hashgraph/nft-utilities');
```

You can use the `validator` like below. 
1. The first parameter is the stringified JSON object you want to verify against a JSON schema
2. The second parameter is the version of HIP412 metadata schema against which you want to validate your metadata instance. The default value is `1.0.0`. In the future, new HIP412 schema versions might be added depending on community needs.

```js
const metadata = {
    attributes: [
        { trait_type: "Background", value: "Yellow" }
    ],
    creator: "NFT artist",
};
const version = '1.0.0';

const issues = validator(JSON.stringify(metadata), version);
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

See: **[/examples/HIP412-metadata-validator](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/HIP412-metadata-validator)**

### Add custom schema versions

You can add custom JSON schemas to the `/schemas` folder. 

You can then add the version to the `schemaMap` in `/schema/index.js` using the following code:

```js
const HIP412_1_0_0 = require("./HIP412@1.0.0.json");
const myCustomSchema = require("./myschema.json"); // import your schema

const schemaMap = new Map();
schemaMap.set('1.0.0', HIP412_1_0_0);
schemaMap.set('<version>', myCustomSchema); // Add your schema to the map
```

When you've added your schema to the map, you can validate against your schema version by passing your version to the `validator()` function.

### Add custom validation rules

Set custom validation rules by importing new validators from the `/validators` folder into the `index.js` file. You can then add them to the `validator()` function. Stick to the `issues` format of errors and warnings (see section "Issues format" for the detailed description).

```js
const { myCustomValidator, schemaValidator } = require("./validators");

const validator = (instance, schemaVersion = defaultVersion) => {
    let errors = [];
    let warnings = [];

    const schema = getSchema(schemaVersion)

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

This package uses the `validator` function explained in the [previous section](#hip412-validator).

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

The total risk score is calculated based on the presence of certain keys for the token. Each key type has an associated weight.

```js
const defaultWeights = {
  admin_key: 200,
  wipe_key: 200,
  freeze_key: 50,
  supply_key: 20,
  kyc_key: 50,
  pause_key: 50,
  fee_schedule_key: 40
}
```

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

According to HIP412, the `calculateRarity` function only looks at objects in the `attributes` property that use the following format:

```
{ "trait_type": "Background", "value": "Yellow" }
OR
{ "trait_type": "Background", "value": 10, "display_type": "percentage" }
```

### Interface

The output interface for this function looks like this.

```json
[
    { "rarity": "<string> rarity score", "NFT": "<nubmer> NFT number", "filename": "<string>" },
    ...
]
```

Here's a sample output:

```
[
    { rarity: '5.50', NFT: 1, filename: 'nft1.json' },
    { rarity: '6.00', NFT: 2, filename: 'nft2.json' },
    { rarity: '5.50', NFT: 3, filename: 'nft3.json' },
    { rarity: '5.50', NFT: 4, filename: 'nft4.json' },
    { rarity: '11.50', NFT: 5, filename: 'nft5.json' }
]
```

### Examples

See: **[/examples/rarity-score-calculation/index.js](https://github.com/hashgraph/hedera-nft-utilities/tree/main/examples/rarity-score-calculation)**

## Questions or Improvement Proposals

Please create an issue or PR on [this repository](https://github.com/michielmulders/hip412-validator). Make sure to join the [Hedera Discord server](https://hedera.com/discord) to ask questions or discuss improvement suggestions.

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