const { validator, defaultVersion } = require('../..');

function main() {
    const metadataInstance = {
        "creator": "HANGRY BARBOONS",
        "description": "HANGRY BARBOONS are 4,444 unique citizens from the United Hashgraph of Planet Earth. Designed and illustrated by President HANGRY.",
        "format": "none",
        "name": "HANGRY BARBOON #2343",
        // removed image property which is required by HIP412@1.0.0
        "type": "image/png",
        "properties": { "edition": 2343 },
        "attributes": [
          { "trait_type": "Background", "value": "Yellow" },
          { "trait_type": "Fur", "value": "Gold" },
          { "trait_type": "Clothing", "value": "Floral Jacket" },
          { "trait_type": "Mouth", "value": "Tongue" },
          { "trait_type": "Sing", "value": "None" }
        ]
    }

    const results = validator(metadataInstance, defaultVersion);
    console.log(results);

    /* Output:
        {
            errors: [
                {
                    type: 'schema',
                    msg: "requires property 'image'",
                    path: 'instance'
                }
            ],
            warnings: []
        }
    */
}

main();