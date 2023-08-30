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
const { calculateRarity } = require("../..");
const { Parser } = require("json2csv");
const fs = require("fs");
function main() {
  // Replace with absolute path to files folder
  const absolutePathToFiles =
    "/Users/michielmulders/projects/hedera-nft-utilities/examples/rarity-score-calculation/files";
  const results = calculateRarity(absolutePathToFiles);
  console.log(JSON.stringify(results, null, 4));

  let flatData = results.reduce((arr, row) => {
    row.attributeContributions.forEach((contribution) => {
      let newRow = {
        NFT: row.NFT,
        filename: row.filename,
        totalRarity: row.totalRarity,
        trait: contribution.trait,
        value: contribution.value,
        contribution: contribution.contribution,
      };
      arr.push(newRow);
    });
    return arr;
  }, []);

  const fields = [
    "NFT",
    "filename",
    "totalRarity",
    "trait",
    "value",
    "contribution",
  ];
  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(flatData);

    fs.writeFile("output.csv", csv, function (err) {
      if (err) throw err;
      console.log("\nFile saved as output.csv");
    });
  } catch (err) {
    console.error(err);
  }

  /* Output:
        Found 6 for directory: /Users/myUser/hedera-nft-utilities/examples/rarity-score-calculation/files
        Found 5 files with the .json extension
        [
          {
              attributeContributions: [
                { trait: "Background", value: "Yellow", contribution: "18.18" },
                { trait: "Fur", value: "Gold", contribution: "18.18" },
                { trait: "Clothing", value: "Floral Jacket", contribution: "18.18" },
                { trait: "Mouth", value: "Tongue", contribution: "27.27" },
                { trait: "Sing", value: "None", contribution: "18.18" },
              ],
              totalRarity: "5.50",
              NFT: 1,
              filename: "nft1.json",
          },
          {
              attributeContributions: [
                { trait: "Background", value: "Green", contribution: "25.00" },
                { trait: "Fur", value: "Gold", contribution: "16.67" },
                { trait: "Clothing", value: "Floral Jacket", contribution: "16.67" },
                { trait: "Mouth", value: "Tongue", contribution: "25.00" },
                { trait: "Sing", value: "None", contribution: "16.67" },
              ],
              totalRarity: "6.00",
              NFT: 2,
              filename: "nft2.json",
          },
          {
              attributeContributions: [
                { trait: "Background", value: "Yellow", contribution: "18.18" },
                { trait: "Fur", value: "Silver", contribution: "27.27" },
                { trait: "Clothing", value: "Floral Jacket", contribution: "18.18" },
                { trait: "Mouth", value: "Smile", contribution: "18.18" },
                { trait: "Sing", value: "None", contribution: "18.18" },
              ],
              totalRarity: "5.50",
              NFT: 3,
              filename: "nft3.json",
          },
          {
              attributeContributions: [
                { trait: "Background", value: "Green", contribution: "27.27" },
                { trait: "Fur", value: "Gold", contribution: "18.18" },
                { trait: "Clothing", value: "Floral Jacket", contribution: "18.18" },
                { trait: "Mouth", value: "Smile", contribution: "18.18" },
                { trait: "Sing", value: "None", contribution: "18.18" },
              ],
              totalRarity: "5.50",
              NFT: 4,
              filename: "nft4.json",
          },
          {
              attributeContributions: [
                { trait: "Background", value: "Yellow", contribution: "8.70" },
                { trait: "Fur", value: "Silver", contribution: "13.04" },
                { trait: "Clothing", value: "Herbal Jacket", contribution: "34.78" },
                { trait: "Mouth", value: "Smile", contribution: "8.70" },
                { trait: "Sing", value: "Sing", contribution: "34.78" },
              ],
              totalRarity: "11.50",
              NFT: 5,
              filename: "nft5.json",
          }
        ]
        File saved as output.csv
      */
}

main();
