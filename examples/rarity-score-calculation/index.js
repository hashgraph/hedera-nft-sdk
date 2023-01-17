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
const { calculateRarity } = require('../..');

function main() {
    // Replace with absolute path to files folder
    const absolutePathToFiles = "/Users/myUser/nft-utilities/examples/rarity-score-calculation/files";
    const results = calculateRarity(absolutePathToFiles);
    console.log(results);

    /* Output:
        Found 6 for directory: /Users/myUser/nft-utilities/examples/rarity-score-calculation/files
        Found 5 files with the .json extension
        [
            { rarity: '5.50', NFT: 1, filename: 'nft1.json' },
            { rarity: '6.00', NFT: 2, filename: 'nft2.json' },
            { rarity: '5.50', NFT: 3, filename: 'nft3.json' },
            { rarity: '5.50', NFT: 4, filename: 'nft4.json' },
            { rarity: '11.50', NFT: 5, filename: 'nft5.json' }
        ]
    */
}

main();