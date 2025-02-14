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
import axios from 'axios';
import { validateCollectionMetadata } from '../../hip766-collection-metadata-validator';

const EXAMPLE_METADATA_URL = 'https://ipfs.io/ipfs/someValidMetadata';

const VALID_EXAMPLE_FULL_METADATA = {
  description:
    'ClankCats is an NFT Collection comprising 10,000 unique cats from different backgrounds and life stories. While they are all different, they all share one common experience; they all grew up in The Clank.',
  creator: 'ClankCats LLC',
  website: 'www.clankcats.com',
  admin: 'ClankCats DAO',
  discussion: 'https://discord.com/invite/HnSgaGWy69',
  whitepaper: 'www.clankcats.com/whitepaper.pdf',
  properties: {
    creationDate: '2023-07-28',
  },
  socials: [
    {
      url: 'https://hedera.com/discord',
      label: 'Discord',
      info: 'Chat with other developers',
    },
    {
      url: 'https://linkedin.com/profile-xyz',
      label: 'LinkedIn',
      info: 'Connect with me via LinkedIn',
    },
  ],
  lightLogo: 'ipfs://bafkreihic3gwjsekbuvte2dquonz7wl2u3evztledvobntfdt575ludtcm',
  lightLogoType: 'image/jpg',
  lightBanner: 'ipfs://bafkreigwu2co2425csky7ebney4cv46rs4fpsrcgcfzic5gueo6d2dxd4q',
  lightBannerType: 'image/jpg',
  lightFeaturedImage: 'ipfs://bafkreigwu2co2425csky7ebney4cv46rs4fpsrcgcfzic5gueo6d2dxd4q',
  lightFeaturedImageType: 'image/jpg',
  darkLogo: 'ipfs://bafkreihic3gwjsekbuvte2dquonz7wl2u3evztledvobntfdt575ludtcm',
  darkLogoType: 'image/jpg',
  darkBanner: 'ipfs://bafkreigwu2co2425csky7ebney4cv46rs4fpsrcgcfzic5gueo6d2dxd4q',
  darkBannerType: 'image/jpg',
  darkFeaturedImage: 'ipfs://bafkreigwu2co2425csky7ebney4cv46rs4fpsrcgcfzic5gueo6d2dxd4q',
  darkFeaturedImageType: 'image/jpg',
};

const VALID_EXAMPLE_PARTIAL_METADATA = {
  description:
    'ClankCats is an NFT Collection comprising 10,000 unique cats from different backgrounds and life stories. While they are all different, they all share one common experience; they all grew up in The Clank.',
  creator: 'ClankCats LLC',
  socials: [],
};

const INVALID_SOCIALS_EXAMPLE_COLLECTION_METADATA = {
  description:
    'ClankCats is an NFT Collection comprising 10,000 unique cats from different backgrounds and life stories. While they are all different, they all share one common experience; they all grew up in The Clank.',
  creator: 'ClankCats LLC',
  socials: [
    {
      info: 'Chat with other developers',
    },
    {
      label: 'LinkedIn',
      info: 'Connect with me via LinkedIn',
    },
  ],
};

const INVALID_EXAMPLE_REDUNDANT_KEY_METADATA = {
  nickname: 'Clank',
  description:
    'ClankCats is an NFT Collection comprising 10,000 unique cats from different backgrounds and life stories. While they are all different, they all share one common experience; they all grew up in The Clank.',
  creator: 'ClankCats LLC',
  socials: [],
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('validateCollectionMetadata', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('validates a full metadata object with no errors expected', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: VALID_EXAMPLE_FULL_METADATA });

    const validationResult = await validateCollectionMetadata(EXAMPLE_METADATA_URL);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('validates a partially filled metadata object with no errors expected', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: VALID_EXAMPLE_PARTIAL_METADATA });

    const validationResult = await validateCollectionMetadata(EXAMPLE_METADATA_URL);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
  });

  it('validates a full metadata object with expected errors due to missing fields in socials array', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: INVALID_SOCIALS_EXAMPLE_COLLECTION_METADATA });

    const validationResult = await validateCollectionMetadata(EXAMPLE_METADATA_URL);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toHaveLength(3);
  });

  it('validates a metadata object with expected error due to redundant keys', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: INVALID_EXAMPLE_REDUNDANT_KEY_METADATA });

    const validationResult = await validateCollectionMetadata(EXAMPLE_METADATA_URL);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toHaveLength(1);
  });
});
