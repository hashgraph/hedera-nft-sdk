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
import { RarityResult, AttributeConfig, ValueObject, TraitOccurrence, NFTFile } from '../types/rarity';
import { Attribute, Instance } from '../types/validator';
import { NFTMetadata } from '../types/nft-metadata';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
import { getNftMetadataFromCollection } from '../helpers/get-nft-metadatas-from-collection';
import { dictionary } from '../utils/constants/dictionary';
import { MetadataObject } from '../types/csv';

/**
 *
 * @param {string} relativePath Relative path to folder with metadata files for rarity calculation
 * @return {RarityResult[]} Array of objects with rarity information for each NFT
 */

interface BlobFileInput {
  fileName: string;
  file: Blob;
}

const calculateRarity = async (files: BlobFileInput[]): Promise<RarityResult[]> => {
  const metadataFiles = await Promise.all(
    files.map(async ({ file, fileName }) => {
      if (!file.type.includes('application/json')) {
        throw new Error(dictionary.errors.rarity.invalidFileType);
      }
      try {
        const blobAsText = await file.text();
        const metadataObject = JSON.parse(blobAsText) as Instance;
        return { filename: fileName, filedata: metadataObject };
      } catch (error) {
        throw new Error(dictionary.errors.rarity.invalidMetadataFile(fileName, JSON.parse(error)));
      }
    })
  );

  const attributesMap = getAttributeMap(metadataFiles);

  const normalizedRarities: RarityResult[] = [];
  let normalizedCount = 1;
  metadataFiles.forEach((file) => {
    const traitRarities: { trait: string; value: string | number; rarity: number }[] = [];

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

      const attributeConfigObject: AttributeConfig | undefined = attributesMap.find(
        (attribute) => attribute.trait_type === NFTAttribute.trait_type
      );

      if (!attributeConfigObject) throw new Error(dictionary.errors.rarity.attributeTypeNotFound(NFTAttribute.trait_type));
      const NFTsWithTrait: ValueObject | undefined = attributeConfigObject.values.find(
        (valueObject) => valueObject.value === NFTAttribute.value
      );
      const mostCommonTrait = attributeConfigObject.values.reduce((prev, current) => (prev.count > current.count ? prev : current));
      const traitRarity = 1 / (NFTsWithTrait?.count! / mostCommonTrait.count);

      return traitRarities.push({
        trait: NFTAttribute.trait_type,
        value: NFTAttribute.value,
        rarity: traitRarity,
      });
    });

    const totalRarity = traitRarities.reduce((prev, current) => prev + current.rarity, 0);
    const attributeContributions = traitRarities.map((traitRarity) => ({
      trait: traitRarity.trait,
      value: traitRarity.value,
      contribution: ((traitRarity.rarity / totalRarity) * 100).toFixed(2),
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
    if (!file.filedata.attributes) throw new Error(dictionary.errors.rarity.attributeNotFoundInFile(file.filename));

    file.filedata.attributes.forEach((attribute: Attribute) => {
      const matchedAttributeIndex = attributesMap.findIndex((attributeObject) => attribute.trait_type === attributeObject.trait_type);
      if (matchedAttributeIndex !== -1) {
        const matchedValueIndex = attributesMap[matchedAttributeIndex].values.findIndex(
          (valueObject) => valueObject.value === attribute.value
        );

        if (matchedValueIndex !== -1) {
          attributesMap[matchedAttributeIndex].values[matchedValueIndex].count++;
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

/**
 * @return {AttributeConfig[]} Array of objects with attribute information
 * @param metadataArray
 * */
const getAttributeMapData = (metadataArray: MetadataObject[] | NFTMetadata[]): AttributeConfig[] => {
  const attributesMap: AttributeConfig[] = [];
  metadataArray.forEach((metadata) => {
    if (!metadata.attributes) throw new Error(dictionary.errors.rarity.attributeNotFoundInObject(JSON.stringify(metadata)));
    if (Array.isArray(metadata.attributes)) {
      metadata.attributes.forEach((attribute) => {
        const matchedAttributeIndex = attributesMap.findIndex((attributeObject) => attribute.trait_type === attributeObject.trait_type);
        if (matchedAttributeIndex !== -1) {
          const matchedValueIndex = attributesMap[matchedAttributeIndex].values.findIndex(
            (valueObject) => valueObject.value === attribute.value
          );

          if (matchedValueIndex !== -1) {
            attributesMap[matchedAttributeIndex].values[matchedValueIndex].count++;
          } else {
            attributesMap[matchedAttributeIndex].values.push({
              value: attribute.value?.toString() || '',
              count: 1,
            });
          }
        } else {
          attributesMap.push(<AttributeConfig>{
            trait_type: attribute.trait_type,
            values: [{ value: attribute.value?.toString(), count: 1 }],
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
const calculateRarityFromData = (metadataArray: MetadataObject[] | NFTMetadata[]): RarityResult[] => {
  const attributesMap = getAttributeMapData(metadataArray);

  const normalizedRarities: RarityResult[] = [];
  let normalizedCount = 1;
  metadataArray.forEach((metadata) => {
    const traitRarities: { trait: string; value: string | number; rarity: number }[] = [];
    if (Array.isArray(metadata.attributes)) {
      metadata.attributes?.forEach((NFTAttribute) => {
        const attributeConfigObject: AttributeConfig | undefined = attributesMap.find(
          (attribute) => attribute.trait_type === NFTAttribute.trait_type
        );

        if (!attributeConfigObject)
          throw new Error(dictionary.errors.rarity.attributeTypeNotFound(NFTAttribute.trait_type?.toString() || ''));
        const NFTsWithTrait: ValueObject | undefined = attributeConfigObject.values.find(
          (valueObject) => valueObject.value === NFTAttribute.value
        );
        const mostCommonTrait = attributeConfigObject.values.reduce((prev, current) => (prev.count > current.count ? prev : current));
        const traitRarity = 1 / (NFTsWithTrait?.count! / mostCommonTrait.count);

        traitRarities.push({
          trait: NFTAttribute.trait_type?.toString() || '',
          value: NFTAttribute.value?.toString() || '',
          rarity: traitRarity,
        });
      });
    }

    const totalRarity = traitRarities.reduce((prev, current) => prev + current.rarity, 0);
    const attributeContributions = traitRarities.map((traitRarity) => ({
      trait: traitRarity.trait,
      value: traitRarity.value,
      contribution: ((traitRarity.rarity / totalRarity) * 100).toFixed(2),
    }));

    normalizedRarities.push({
      attributeContributions: attributeContributions,
      totalRarity: totalRarity.toFixed(2),
      NFT: normalizedCount,
    });
    normalizedCount++;
  });

  return normalizedRarities;
};

const calculateTraitOccurrenceFromData = (metadataArray: MetadataObject[]): TraitOccurrence[] => {
  const attributesMap = getAttributeMapData(metadataArray);

  const traitOccurrences: TraitOccurrence[] = [];

  attributesMap.forEach((attribute) => {
    const traitOccurrence: TraitOccurrence = {
      trait: attribute.trait_type,
      values: [],
    };

    attribute.values.forEach((value) => {
      traitOccurrence.values.push({
        value: value.value,
        occurence: ((value.count / metadataArray.length) * 100).toFixed(2),
      });
    });

    traitOccurrences.push(traitOccurrence);
  });

  return traitOccurrences;
};

const calculateRarityFromOnChainData = async (network: NetworkName, tokenId: string, ipfsGateway?: string, limit: number = 100) => {
  const metadataObjects = await getNftMetadataFromCollection(network, tokenId, limit, ipfsGateway);

  const filteredArray = metadataObjects.map((obj) => obj.metadata).filter((item): item is NFTMetadata => item !== undefined);

  return calculateRarityFromData(filteredArray);
};

export { calculateRarity, calculateRarityFromData, calculateTraitOccurrenceFromData, calculateRarityFromOnChainData };
