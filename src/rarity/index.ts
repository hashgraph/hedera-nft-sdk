/**
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

import { readFiles, getJSONFilesForDir } from "../helpers/files";
import {
  RarityResult,
  AttributeConfig,
  ValueObject,
  NFTFile,
} from "../types/rarity.module";
import { Attribute } from "../types/validator.module";

/**
 *
 * @param {string} dir Absolute path to folder with metadata files for rarity calculation
 * @return {RarityResult[]} {rarity: string(two decimal floating point), NFT: number, filename: string}}
 */
const calculateRarity = (dir: string): RarityResult[] => {
  const filenames = getJSONFilesForDir(dir);
  const files = readFiles(dir, filenames);

  const attributesMap = getAttributeMap(files);

  const normalizedRarities: RarityResult[] = [];
  let normalizedCount = 1;
  files.forEach((file) => {
    const traitRarities: number[] = [];

    file.filedata.attributes.forEach((NFTAttribute: Attribute) => {
      const attributeConfigObject: AttributeConfig | undefined =
        attributesMap.find(
          (attribute) => attribute.trait_type === NFTAttribute.trait_type
        );

      if (!attributeConfigObject)
        throw new Error(
          `Attribute ${NFTAttribute.trait_type} not found in attributes map`
        );
      const NFTsWithTrait: ValueObject | undefined =
        attributeConfigObject.values.find(
          (valueObject) => valueObject.value === NFTAttribute.value
        );
      const mostCommonTrait = attributeConfigObject.values.reduce(
        (prev, current) => (prev.count > current.count ? prev : current)
      );
      const traitRarity = 1 / (NFTsWithTrait?.count! / mostCommonTrait.count);

      traitRarities.push(traitRarity);
    });

    const totalRarity = traitRarities.reduce(
      (prev, current) => prev + current,
      0
    );
    normalizedRarities.push({
      rarity: totalRarity.toFixed(2),
      NFT: normalizedCount,
      filename: file.filename,
    });
    normalizedCount++;
  });

  return normalizedRarities;
};

/**
 * Builds an attributes map with a trait count per attribute value
 * @param {NFTFile[]} files
 * @returns {AttributeConfig[]}
 *
 * @example [{"trait_type":"Background","values":[{"value":"Yellow","count":3},{"value":"Green","count":2}]},{"trait_type":"Fur","values":[{"value":"Gold","count":3},{"value":"Silver","count":2}]},{"trait_type":"Clothing","values":[{"value":"Floral Jacket","count":4},{"value":"Herbal Jacket","count":1}]},{"trait_type":"Mouth","values":[{"value":"Tongue","count":2},{"value":"Smile","count":3}]},{"trait_type":"Sing","values":[{"value":"None","count":4},{"value":"Sing","count":1}]}]
 */
const getAttributeMap = (files: NFTFile[]): AttributeConfig[] => {
  const attributesMap: AttributeConfig[] = [];
  files.forEach((file) => {
    file.filedata.attributes.forEach((attribute: Attribute) => {
      const matchedAttributeIndex = attributesMap.findIndex(
        (attributeObject) => attribute.trait_type === attributeObject.trait_type
      );
      if (matchedAttributeIndex !== -1) {
        const matchedValueIndex = attributesMap[
          matchedAttributeIndex
        ].values.findIndex(
          (valueObject) => valueObject.value === attribute.value
        );

        if (matchedValueIndex !== -1) {
          attributesMap[matchedAttributeIndex].values[matchedValueIndex]
            .count++;
        } else {
          attributesMap[matchedAttributeIndex].values.push({
            value: attribute.value.toString(),
            count: 1,
          });
        }
      } else {
        attributesMap.push({
          trait_type: attribute.trait_type,
          values: [{ value: attribute.value.toString(), count: 1 }],
        });
      }
    });
  });

  return attributesMap;
};

export { calculateRarity };
