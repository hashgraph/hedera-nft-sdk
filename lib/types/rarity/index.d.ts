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
import { RarityResult, TraitOccurrence } from '../types/rarity';
import { NFTMetadata } from '../types/nft-metadata';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
import { MetadataObject } from '../types/csv';
/**
 *
 * @param {string} dir Absolute path to folder with metadata files for rarity calculation
 * @return {RarityResult[]} Array of objects with rarity information for each NFT
 */
declare const calculateRarity: (dir: string) => RarityResult[];
/**
 *
 * @param {Array<Object>} metadataArray Array of JSON objects for rarity calculation
 * @return {RarityResult[]} Array of objects with rarity information for each NFT
 */
declare const calculateRarityFromData: (metadataArray: MetadataObject[] | NFTMetadata[]) => RarityResult[];
declare const calculateTraitOccurrenceFromData: (metadataArray: MetadataObject[]) => TraitOccurrence[];
declare const calculateRarityFromOnChainData: (network: NetworkName, tokenId: string, ipfsGateway?: string, limit?: number) => Promise<RarityResult[]>;
export { calculateRarity, calculateRarityFromData, calculateTraitOccurrenceFromData, calculateRarityFromOnChainData };
//# sourceMappingURL=index.d.ts.map