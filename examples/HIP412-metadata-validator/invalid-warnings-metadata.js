const { validator, defaultVersion } = require('../..');

function main() {
    const metadataInstance = {
        "creator": "HANGRY BARBOONS",
        "description": "HANGRY BARBOONS are 4,444 unique citizens from the United Hashgraph of Planet Earth. Designed and illustrated by President HANGRY.",
        "format": "none",
        "name": "HANGRY BARBOON #2343",
        "image": "ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png",
        "type": "image/png",
        "properties": { "edition": 2343 },
        "attributes": [
          { "trait_type": "Background", "value": "Yellow" },
          { "trait_type": "Fur", "value": "Gold" },
          { "trait_type": "Clothing", "value": "Floral Jacket" },
          { "trait_type": "Mouth", "value": "Tongue" },
          { "trait_type": "Sing", "value": "None" }
        ],
        "myAdditionalProperty": "Additional properties should be included in properties"
    }

    const results = validator(metadataInstance, defaultVersion);
    console.log(results);

    /* Output:
        {
            errors: [],
            warnings: [
                {
                    type: 'schema',
                    msg: "is not allowed to have the additional property 'myAdditionalProperty'",
                    path: 'instance'
                }
            ]
        }
    */
}

main();