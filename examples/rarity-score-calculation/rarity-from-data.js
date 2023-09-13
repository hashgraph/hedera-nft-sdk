/*-
 *
 * Hedera NFT Utilities
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const { calculateRarityFromData } = require("../../dist");
const { Parser } = require("json2csv");
const fs = require("fs");

function main() {
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
          { "trait_type": "Fur", "value": "Gold" },
          { "trait_type": "Clothing", "value": "Floral Jacket" },
          { "trait_type": "Mouth", "value": "Tongue" },
          { "trait_type": "Sing", "value": "None" }
        ]
    },
    {
        "creator": "BOOBOO",
        "description": "BOOBOO desc",
        "format": "HIP412@1.0.0",
        "name": "HANGRY BARBOON #2343",
        "image": "ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png",
        "type": "image/png",
        "properties": { "edition": 2343 },
        "attributes": [
          { "trait_type": "Background", "value": "Green" },
          { "trait_type": "Fur", "value": "Gold" },
          { "trait_type": "Clothing", "value": "Floral Jacket" },
          { "trait_type": "Mouth", "value": "Tongue" },
          { "trait_type": "Sing", "value": "None" }
        ]
    },
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
          { "trait_type": "Fur", "value": "Silver" },
          { "trait_type": "Clothing", "value": "Floral Jacket" },
          { "trait_type": "Mouth", "value": "Smile" },
          { "trait_type": "Sing", "value": "None" }
        ]
    },
    {
        "creator": "HANGRY BARBOONS",
        "description": "HANGRY BARBOONS are 4,444 unique citizens from the United Hashgraph of Planet Earth. Designed and illustrated by President HANGRY.",
        "format": "none",
        "name": "HANGRY BARBOON #2343",
        "image": "ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2343.png",
        "type": "image/png",
        "properties": { "edition": 2343 },
        "attributes": [
          { "trait_type": "Background", "value": "Green" },
          { "trait_type": "Fur", "value": "Gold" },
          { "trait_type": "Clothing", "value": "Floral Jacket" },
          { "trait_type": "Mouth", "value": "Smile" },
          { "trait_type": "Sing", "value": "None" }
        ]
    },
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
          { "trait_type": "Fur", "value": "Silver" },
          { "trait_type": "Clothing", "value": "Herbal Jacket" },
          { "trait_type": "Mouth", "value": "Smile" },
          { "trait_type": "Sing", "value": "Sing" }
        ]
    }
  ]

  const results = calculateRarityFromData(NFTdata);
  console.log(JSON.stringify(results, null, 4));

  /* Output:
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
        "NFT": 1
    },
    {
        "attributeContributions": [
            {
                "trait": "Background",
                "value": "Green",
                "contribution": "25.00"
            },
            {
                "trait": "Fur",
                "value": "Gold",
                "contribution": "16.67"
            },
            {
                "trait": "Clothing",
                "value": "Floral Jacket",
                "contribution": "16.67"
            },
            {
                "trait": "Mouth",
                "value": "Tongue",
                "contribution": "25.00"
            },
            {
                "trait": "Sing",
                "value": "None",
                "contribution": "16.67"
            }
        ],
        "totalRarity": "6.00",
        "NFT": 2
    },
    {
        "attributeContributions": [
            {
                "trait": "Background",
                "value": "Yellow",
                "contribution": "18.18"
            },
            {
                "trait": "Fur",
                "value": "Silver",
                "contribution": "27.27"
            },
            {
                "trait": "Clothing",
                "value": "Floral Jacket",
                "contribution": "18.18"
            },
            {
                "trait": "Mouth",
                "value": "Smile",
                "contribution": "18.18"
            },
            {
                "trait": "Sing",
                "value": "None",
                "contribution": "18.18"
            }
        ],
        "totalRarity": "5.50",
        "NFT": 3
    },
    {
        "attributeContributions": [
            {
                "trait": "Background",
                "value": "Green",
                "contribution": "27.27"
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
                "value": "Smile",
                "contribution": "18.18"
            },
            {
                "trait": "Sing",
                "value": "None",
                "contribution": "18.18"
            }
        ],
        "totalRarity": "5.50",
        "NFT": 4
    },
    {
        "attributeContributions": [
            {
                "trait": "Background",
                "value": "Yellow",
                "contribution": "8.70"
            },
            {
                "trait": "Fur",
                "value": "Silver",
                "contribution": "13.04"
            },
            {
                "trait": "Clothing",
                "value": "Herbal Jacket",
                "contribution": "34.78"
            },
            {
                "trait": "Mouth",
                "value": "Smile",
                "contribution": "8.70"
            },
            {
                "trait": "Sing",
                "value": "Sing",
                "contribution": "34.78"
            }
        ],
        "totalRarity": "11.50",
        "NFT": 5
    }
]
*/
}

main();
