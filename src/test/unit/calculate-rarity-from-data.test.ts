/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
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
import { calculateRarityFromData } from '../../rarity';

const nftMetadata = [
  {
    name: 'Example NFT 1',
    creator: 'Hedera',
    description: 'This is an example NFT 1',
    image: 'https://nft.com/mycollection/1.jpg',
    type: 'image/jpeg',
    properties: {
      external_url: 'https://nft.com/mycollection/1',
      url: 'https://nft.com/mycollection/1',
    },
    attributes: [
      { trait_type: 'color', value: 'rgb(0,255,0)' },
      { trait_type: 'hasPipe', value: 'false' },
      { trait_type: 'stamina', value: '65' },
    ],
  },
  {
    name: 'Example NFT 1',
    creator: 'Hedera',
    description: 'This is an example NFT 1',
    image: 'https://nft.com/mycollection/1.jpg',
    type: 'image/jpeg',
    properties: {
      external_url: 'https://nft.com/mycollection/1',
      url: 'https://nft.com/mycollection/1',
    },
    attributes: [
      { trait_type: 'color', value: 'rgb(0,255,0)' },
      { trait_type: 'hasPipe', value: 'false' },
      { trait_type: 'stamina', value: '65' },
    ],
  },
];

describe('calculateRarityFromData', () => {
  it('should return an array of RarityResult objects', async () => {
    const result = calculateRarityFromData(nftMetadata);

    expect(result).toStrictEqual([
      {
        attributeContributions: [
          { trait: 'color', value: 'rgb(0,255,0)', contribution: '33.33' },
          { trait: 'hasPipe', value: 'false', contribution: '33.33' },
          { trait: 'stamina', value: '65', contribution: '33.33' },
        ],
        totalRarity: '3.00',
        NFT: 1,
      },
      {
        attributeContributions: [
          { trait: 'color', value: 'rgb(0,255,0)', contribution: '33.33' },
          { trait: 'hasPipe', value: 'false', contribution: '33.33' },
          { trait: 'stamina', value: '65', contribution: '33.33' },
        ],
        totalRarity: '3.00',
        NFT: 2,
      },
    ]);
  });
});
