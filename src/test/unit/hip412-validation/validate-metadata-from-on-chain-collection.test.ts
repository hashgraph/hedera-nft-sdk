/*-
 *
 * Hedera NFT Utilities
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
import { getNFTsFromToken } from '../../../api/mirror-node';
import { NFT_FROM_TOKEN_EXAMPLE_BASE_URL, NETWORK_ERROR } from '../../__mocks__/consts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponsePage1 = {
  data: {
    nfts: [
      { id: 1, name: 'NFT 1' },
      { id: 2, name: 'NFT 2' },
    ],
    links: { next: NFT_FROM_TOKEN_EXAMPLE_BASE_URL },
  },
};

const mockResponsePage2 = {
  data: {
    nfts: [{ id: 3, name: 'NFT 3' }],
    links: { next: null },
  },
};

describe('getNFTsFromToken', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('fetches all pages of NFTs collection correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockResponsePage1).mockResolvedValueOnce(mockResponsePage2);

    const result = await getNFTsFromToken('testnet', '1');
    expect(result.length).toBe(3);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it('properly handles HTTP errors', async () => {
    mockedAxios.get.mockRejectedValue(new Error(NETWORK_ERROR));
    await expect(getNFTsFromToken('testnet', '1')).rejects.toThrow(NETWORK_ERROR);
  });
});
