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
import { uriDecoder } from '../../helpers/uri-decoder';
import { NFTDetails, DecodedMetadata } from '../../types/nfts';
import { EXAMPLE_IPFS_GATEWAY, HASH_WITHOUT_IPFS_PREFIX, IPFS_PREFIXED_HASH, HTTPS_URL } from '../__mocks__/consts';

const generateNFTDetails = (metadata: string, serialNumber: number) => ({
  account_id: '0.0.123',
  created_timestamp: '1625097600',
  deleted: false,
  metadata: btoa(metadata),
  modified_timestamp: '1625097600',
  serial_number: serialNumber,
  token_id: '0.0.456',
  spender: null,
});

describe('uriDecoder', () => {
  it('decodes IPFS metadata containing "ipfs://" prefix using provided ipfsGateway', () => {
    const nfts: NFTDetails[] = [generateNFTDetails(IPFS_PREFIXED_HASH, 1)];
    const expected: DecodedMetadata[] = [
      {
        metadata: `${EXAMPLE_IPFS_GATEWAY}QmSomeHash`,
        serialNumber: 1,
      },
    ];

    const result = uriDecoder(nfts, EXAMPLE_IPFS_GATEWAY);
    expect(result).toEqual(expected);
  });

  it('decodes IPFS metadata that does not contain "ipfs://" prefix using provided ipfsGateway', () => {
    const nfts: NFTDetails[] = [generateNFTDetails(HASH_WITHOUT_IPFS_PREFIX, 2)];
    const expected: DecodedMetadata[] = [
      {
        metadata: `${EXAMPLE_IPFS_GATEWAY}QmAnotherHash`,
        serialNumber: 2,
      },
    ];

    const result = uriDecoder(nfts, EXAMPLE_IPFS_GATEWAY);
    expect(result).toEqual(expected);
  });

  it('does not alter https:// prefixed metadata', () => {
    const nfts: NFTDetails[] = [generateNFTDetails(HTTPS_URL, 3)];

    const expected: DecodedMetadata[] = [
      {
        metadata: 'https://example.com/metadata.json',
        serialNumber: 3,
      },
    ];

    const result = uriDecoder(nfts, EXAMPLE_IPFS_GATEWAY);
    expect(result).toEqual(expected);
  });

  it('throws an error if ipfs metadata is provided without an ipfsGateway', () => {
    const nfts: NFTDetails[] = [generateNFTDetails(IPFS_PREFIXED_HASH, 4)];

    expect(() => uriDecoder(nfts)).toThrow('IPFS gateway is required');
  });

  it('decodes various types of metadata correctly', () => {
    const nfts: NFTDetails[] = [
      generateNFTDetails(IPFS_PREFIXED_HASH, 1),
      generateNFTDetails(HASH_WITHOUT_IPFS_PREFIX, 2),
      generateNFTDetails(HTTPS_URL, 3),
    ];

    const expected: DecodedMetadata[] = [
      {
        metadata: IPFS_PREFIXED_HASH.replace('ipfs://', EXAMPLE_IPFS_GATEWAY),
        serialNumber: 1,
      },
      { metadata: EXAMPLE_IPFS_GATEWAY + HASH_WITHOUT_IPFS_PREFIX, serialNumber: 2 },
      { metadata: HTTPS_URL, serialNumber: 3 },
    ];

    const result = uriDecoder(nfts, EXAMPLE_IPFS_GATEWAY);
    expect(result).toEqual(expected);
  });

  it('calls decoder correct number of times for multiple NFTs', () => {
    const nfts: NFTDetails[] = [
      generateNFTDetails(IPFS_PREFIXED_HASH, 1),
      generateNFTDetails(HASH_WITHOUT_IPFS_PREFIX, 2),
      generateNFTDetails(HTTPS_URL, 3),
    ];

    const result = uriDecoder(nfts, EXAMPLE_IPFS_GATEWAY);
    expect(result.length).toBe(3);
  });
});
