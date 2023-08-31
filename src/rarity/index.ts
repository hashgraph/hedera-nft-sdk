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

import { readFiles, getJSONFilesForDir } from '../helpers/files';
import {
  RarityResult,
  AttributeConfig,
  ValueObject,
  NFTFile,
} from '../types/rarity.module';
import { Attribute } from '../types/validator.module';

/**
 *
 * @param {string} dir Absolute path to folder with metadata files for rarity calculation
 * @return {RarityResult[]} Array of objects with rarity information for each NFT
 */
const calculateRarity = (dir: string): RarityResult[] => {
  const filenames = getJSONFilesForDir(dir);
  const files = readFiles(dir, filenames);

  const attributesMap = getAttributeMap(files);

  const normalizedRarities: RarityResult[] = [];
  let normalizedCount = 1;
  files.forEach((file) => {
    const traitRarities: {trait: string; value: string|number; rarity: number}[] = [];

    file.filedata.attributes.forEach((NFTAttribute: Attribute) => {
      // Skip special types of attributes in the rarity calculation (Openrarity specification)
      if (
        NFTAttribute.display_type == 'percentage' || 
        NFTAttribute.display_type == 'boost' ||
        NFTAttribute.display_type == 'color' ||
        NFTAttribute.display_type == 'datetime' ||
        NFTAttribute.display_type == 'boolean'
      ) {
        return traitRarities.push({
          trait: NFTAttribute.trait_type,
          value: NFTAttribute.value,
          rarity: 0,
        });
      }
    
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

      traitRarities.push({
        trait: NFTAttribute.trait_type,
        value: NFTAttribute.value,
        rarity: traitRarity,
      });
    });

    const totalRarity = traitRarities.reduce((prev, current) => prev + current.rarity, 0);
    const attributeContributions = traitRarities.map(traitRarity => ({
      trait: traitRarity.trait,
      value: traitRarity.value,
      contribution: (traitRarity.rarity / totalRarity * 100).toFixed(2),
    }));

    normalizedRarities.push({
      attributeContributions: attributeContributions,
      totalRarity: totalRarity.toFixed(2),
      NFT: normalizedCount,
      filename: file.filename,
    });
    normalizedCount++;
  });

  return normalizedRarities;
};

/**
 * @param {NFTFile[]} files Array of NFTFile objects
 * @return {AttributeConfig[]} Array of objects with attribute information
 * */

const getAttributeMap = (files: NFTFile[]): AttributeConfig[] => {
  const attributesMap: AttributeConfig[] = [];
  files.forEach((file) => {
    if (!file.filedata.attributes)
      throw new Error(
        `Attributes not found in file ${file.filename}. Please ensure that your metadata file is valid.`
      );

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
