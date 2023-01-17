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
const { localValidation } = require('../..');

function main() {
    // Replace with absolute path to files folder
    const absolutePathToFiles = "/Users/myUser/nft-utilities/examples/local-metadata-validator/files";

    // Looks for JSON files and uses validator package to verify each metadata file (notjson.md file will be ignored)
    // files/nft2.json has mistakes: no image and type properties
    localValidation(absolutePathToFiles)

    /* Output:
        Found 6 for directory: /Users/myUser/nft-utilities/examples/local-metadata-validator/files
        Found 5 files with the .json extension
        { 
            "nft1.json": {"errors":[],"warnings":[]},
            "nft2.json":{"errors":[{"type":"schema","msg":"requires property 'image'","path":"instance"},{"type":"schema","msg":"requires property 'type'","path":"instance"}],"warnings":[]},
            "nft3.json":{"errors":[],"warnings":[]},
            "nft4.json":{"errors":[],"warnings":[]},
            "nft5.json":{"errors":[],"warnings":[]}
        }
    */
}

main();