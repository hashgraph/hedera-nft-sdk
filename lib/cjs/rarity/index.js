"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateTraitOccurrenceFromData = exports.calculateRarityFromOnChainData = exports.calculateRarityFromData = exports.calculateRarity = void 0;
var _files = require("../helpers/files");
var _getNftMetadatasFromCollection = require("../helpers/get-nft-metadatas-from-collection");
var _dictionary = require("../utils/constants/dictionary");
/**
 * Hedera NFT SDK
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

/**
 *
 * @param {string} dir Absolute path to folder with metadata files for rarity calculation
 * @return {RarityResult[]} Array of objects with rarity information for each NFT
 */
const calculateRarity = dir => {
  const filenames = (0, _files.getJSONFilesForDir)(dir);
  const files = (0, _files.readFiles)(dir, filenames);
  const attributesMap = getAttributeMap(files);
  const normalizedRarities = [];
  let normalizedCount = 1;
  files.forEach(file => {
    const traitRarities = [];
    file.filedata.attributes.forEach(NFTAttribute => {
      // Skip special types of attributes in the rarity calculation (Openrarity specification)
      if (NFTAttribute.display_type == 'percentage' || NFTAttribute.display_type == 'boost' || NFTAttribute.display_type == 'color' || NFTAttribute.display_type == 'datetime' || NFTAttribute.display_type == 'boolean') {
        return traitRarities.push({
          trait: NFTAttribute.trait_type,
          value: NFTAttribute.value,
          rarity: 0
        });
      }
      const attributeConfigObject = attributesMap.find(attribute => attribute.trait_type === NFTAttribute.trait_type);
      if (!attributeConfigObject) throw new Error(_dictionary.dictionary.errors.rarity.attributeTypeNotFound(NFTAttribute.trait_type));
      const NFTsWithTrait = attributeConfigObject.values.find(valueObject => valueObject.value === NFTAttribute.value);
      const mostCommonTrait = attributeConfigObject.values.reduce((prev, current) => prev.count > current.count ? prev : current);
      const traitRarity = 1 / (NFTsWithTrait?.count / mostCommonTrait.count);
      return traitRarities.push({
        trait: NFTAttribute.trait_type,
        value: NFTAttribute.value,
        rarity: traitRarity
      });
    });
    const totalRarity = traitRarities.reduce((prev, current) => prev + current.rarity, 0);
    const attributeContributions = traitRarities.map(traitRarity => ({
      trait: traitRarity.trait,
      value: traitRarity.value,
      contribution: (traitRarity.rarity / totalRarity * 100).toFixed(2)
    }));
    normalizedRarities.push({
      attributeContributions: attributeContributions,
      totalRarity: totalRarity.toFixed(2),
      NFT: normalizedCount,
      filename: file.filename
    });
    normalizedCount++;
  });
  return normalizedRarities;
};

/**
 * @param {NFTFile[]} files Array of NFTFile objects
 * @return {AttributeConfig[]} Array of objects with attribute information
 * */
exports.calculateRarity = calculateRarity;
const getAttributeMap = files => {
  const attributesMap = [];
  files.forEach(file => {
    if (!file.filedata.attributes) throw new Error(_dictionary.dictionary.errors.rarity.attributeNotFoundInFile(file.filename));
    file.filedata.attributes.forEach(attribute => {
      const matchedAttributeIndex = attributesMap.findIndex(attributeObject => attribute.trait_type === attributeObject.trait_type);
      if (matchedAttributeIndex !== -1) {
        const matchedValueIndex = attributesMap[matchedAttributeIndex].values.findIndex(valueObject => valueObject.value === attribute.value);
        if (matchedValueIndex !== -1) {
          attributesMap[matchedAttributeIndex].values[matchedValueIndex].count++;
        } else {
          attributesMap[matchedAttributeIndex].values.push({
            value: attribute.value.toString(),
            count: 1
          });
        }
      } else {
        attributesMap.push({
          trait_type: attribute.trait_type,
          values: [{
            value: attribute.value.toString(),
            count: 1
          }]
        });
      }
    });
  });
  return attributesMap;
};

/**
 * @return {AttributeConfig[]} Array of objects with attribute information
 * @param metadataArray
 * */
const getAttributeMapData = metadataArray => {
  const attributesMap = [];
  metadataArray.forEach(metadata => {
    if (!metadata.attributes) throw new Error(_dictionary.dictionary.errors.rarity.attributeNotFoundInObject(JSON.stringify(metadata)));
    if (Array.isArray(metadata.attributes)) {
      metadata.attributes.forEach(attribute => {
        const matchedAttributeIndex = attributesMap.findIndex(attributeObject => attribute.trait_type === attributeObject.trait_type);
        if (matchedAttributeIndex !== -1) {
          const matchedValueIndex = attributesMap[matchedAttributeIndex].values.findIndex(valueObject => valueObject.value === attribute.value);
          if (matchedValueIndex !== -1) {
            attributesMap[matchedAttributeIndex].values[matchedValueIndex].count++;
          } else {
            attributesMap[matchedAttributeIndex].values.push({
              value: attribute.value?.toString() || '',
              count: 1
            });
          }
        } else {
          attributesMap.push({
            trait_type: attribute.trait_type,
            values: [{
              value: attribute.value?.toString(),
              count: 1
            }]
          });
        }
      });
    }
  });
  return attributesMap;
};

/**
 *
 * @param {Array<Object>} metadataArray Array of JSON objects for rarity calculation
 * @return {RarityResult[]} Array of objects with rarity information for each NFT
 */
const calculateRarityFromData = metadataArray => {
  const attributesMap = getAttributeMapData(metadataArray);
  const normalizedRarities = [];
  let normalizedCount = 1;
  metadataArray.forEach(metadata => {
    const traitRarities = [];
    if (Array.isArray(metadata.attributes)) {
      metadata.attributes?.forEach(NFTAttribute => {
        const attributeConfigObject = attributesMap.find(attribute => attribute.trait_type === NFTAttribute.trait_type);
        if (!attributeConfigObject) throw new Error(_dictionary.dictionary.errors.rarity.attributeTypeNotFound(NFTAttribute.trait_type?.toString() || ''));
        const NFTsWithTrait = attributeConfigObject.values.find(valueObject => valueObject.value === NFTAttribute.value);
        const mostCommonTrait = attributeConfigObject.values.reduce((prev, current) => prev.count > current.count ? prev : current);
        const traitRarity = 1 / (NFTsWithTrait?.count / mostCommonTrait.count);
        traitRarities.push({
          trait: NFTAttribute.trait_type?.toString() || '',
          value: NFTAttribute.value?.toString() || '',
          rarity: traitRarity
        });
      });
    }
    const totalRarity = traitRarities.reduce((prev, current) => prev + current.rarity, 0);
    const attributeContributions = traitRarities.map(traitRarity => ({
      trait: traitRarity.trait,
      value: traitRarity.value,
      contribution: (traitRarity.rarity / totalRarity * 100).toFixed(2)
    }));
    normalizedRarities.push({
      attributeContributions: attributeContributions,
      totalRarity: totalRarity.toFixed(2),
      NFT: normalizedCount
    });
    normalizedCount++;
  });
  return normalizedRarities;
};
exports.calculateRarityFromData = calculateRarityFromData;
const calculateTraitOccurrenceFromData = metadataArray => {
  const attributesMap = getAttributeMapData(metadataArray);
  const traitOccurrences = [];
  attributesMap.forEach(attribute => {
    const traitOccurrence = {
      trait: attribute.trait_type,
      values: []
    };
    attribute.values.forEach(value => {
      traitOccurrence.values.push({
        value: value.value,
        occurence: (value.count / metadataArray.length * 100).toFixed(2)
      });
    });
    traitOccurrences.push(traitOccurrence);
  });
  return traitOccurrences;
};
exports.calculateTraitOccurrenceFromData = calculateTraitOccurrenceFromData;
const calculateRarityFromOnChainData = async function (network, tokenId, ipfsGateway) {
  let limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
  const metadataObjects = await (0, _getNftMetadatasFromCollection.getNftMetadataFromCollection)(network, tokenId, limit, ipfsGateway);
  const filteredArray = metadataObjects.map(obj => obj.metadata).filter(item => item !== undefined);
  return calculateRarityFromData(filteredArray);
};
exports.calculateRarityFromOnChainData = calculateRarityFromOnChainData;
//# sourceMappingURL=index.js.map