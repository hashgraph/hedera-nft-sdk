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
import { NFTMetadata } from '../../types/nft-metadata';

export const exampleNFTMetadata: NFTMetadata = {
  name: 'Example NFT 001',
  creator: 'Jane Doe, John Doe',
  creatorDID: 'did:hedera:mainnet:7Prd74ry1Uct87nZqL3ny7aR7Cg46JamVbJgk8azVgUm;hedera:mainnet:fid=0.0.123',
  description: 'This describes my NFT',
  image: 'https://myserver.com/preview-image-nft-001.png',
  type: 'image/png',
  format: 'HIP412@2.0.0',
  properties: {
    external_url: 'https://nft.com/mycollection/001',
  },
  files: [
    {
      uri: 'https://myserver.com/high-resolution-nft-001.png',
      checksum: '9defbb6402d4bf39f2ea580099c73194647b24a659b6f6b778e3dd71755b8862',
      is_default_file: true,
      type: 'image/png',
    },
    {
      uri: 'ipfs://yusopwpksaioposjfopiapnnjlsl',
      type: 'image/png',
    },
  ],
  attributes: [
    {
      trait_type: 'color',
      display_type: 'color',
      value: 'rgb(255,0,0)',
    },
    {
      trait_type: 'hasPipe',
      display_type: 'boolean',
      value: 'test',
    },
    {
      trait_type: 'coolness',
      display_type: 'boost',
      value: '10',
      max_value: 100,
    },
    {
      trait_type: 'stamina',
      display_type: 'percentage',
      value: '83',
    },
    {
      trait_type: 'birth',
      display_type: 'datetime',
      value: '732844800',
    },
  ],
  localization: {
    uri: 'ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/{locale}.json',
    default: 'en',
    locales: ['es', 'fr'],
  },
};
