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
import { nftSDK, operatorPrivateKey } from './e2e-consts';
import { LONG_E2E_TIMEOUT, pathToOneLineCSV, pathToRowCSV } from '../__mocks__/consts';
import { NftId, PrivateKey, TokenId, TokenNftInfoQuery } from '@hashgraph/sdk';
import { dictionary } from '../../utils/constants/dictionary';

afterAll(async () => {
  nftSDK.client.close();
});

describe('mintUniqueMetadata function e2e', () => {
  it(
    'Mints unique metadata from csv with one line and commas',
    async () => {
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol',
      });
      const mintedMetadata = await nftSDK.mintUniqueMetadata({
        tokenId,
        batchSize: 2,
        supplyKey: PrivateKey.fromString(operatorPrivateKey),
        pathToMetadataURIsFile: pathToOneLineCSV,
      });

      expect(tokenId).toBeDefined();
      expect(mintedMetadata).toBeDefined();
      expect(mintedMetadata).toEqual([
        { content: 'https://www.youtube.com1', serialNumber: expect.any(Number) },
        { content: 'https://www.youtube.com2', serialNumber: expect.any(Number) },
      ]);

      for (const [index, metaData] of mintedMetadata.entries()) {
        const nftInfos = await new TokenNftInfoQuery()
          .setNftId(new NftId(TokenId.fromString(tokenId), metaData.serialNumber))
          .execute(nftSDK.client);

        expect(nftInfos[0].metadata!.toString()).toEqual(`https://www.youtube.com${index + 1}`);
      }
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'Mints unique metadata from csv with rows',
    async () => {
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol',
      });
      const mintedMetadata = await nftSDK.mintUniqueMetadata({
        tokenId,
        batchSize: 2,
        supplyKey: PrivateKey.fromString(operatorPrivateKey),
        pathToMetadataURIsFile: pathToRowCSV,
      });

      expect(tokenId).toBeDefined();
      expect(mintedMetadata).toBeDefined();
      expect(mintedMetadata).toEqual([
        { content: 'https://www.youtube.com1', serialNumber: expect.any(Number) },
        { content: 'https://www.youtube.com2', serialNumber: expect.any(Number) },
      ]);
      for (const [index, metaData] of mintedMetadata.entries()) {
        const nftInfos = await new TokenNftInfoQuery()
          .setNftId(new NftId(TokenId.fromString(tokenId), metaData.serialNumber))
          .execute(nftSDK.client);

        expect(nftInfos[0].metadata!.toString()).toEqual(`https://www.youtube.com${index + 1}`);
      }
    },
    LONG_E2E_TIMEOUT
  );

  it(
    'Mints unique metadata from metadata array props',
    async () => {
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol',
      });
      const mintedMetadata = await nftSDK.mintUniqueMetadata({
        tokenId,
        batchSize: 2,
        supplyKey: PrivateKey.fromString(operatorPrivateKey),
        metadata: ['https://www.youtube.com1', 'https://www.youtube.com2'],
      });

      expect(tokenId).toBeDefined();
      expect(mintedMetadata).toBeDefined();
      expect(mintedMetadata).toEqual([
        { content: 'https://www.youtube.com1', serialNumber: expect.any(Number) },
        { content: 'https://www.youtube.com2', serialNumber: expect.any(Number) },
      ]);
      for (const [index, metaData] of mintedMetadata.entries()) {
        const nftInfos = await new TokenNftInfoQuery()
          .setNftId(new NftId(TokenId.fromString(tokenId), metaData.serialNumber))
          .execute(nftSDK.client);

        expect(nftInfos[0].metadata!.toString()).toEqual(`https://www.youtube.com${index + 1}`);
      }
    },
    LONG_E2E_TIMEOUT
  );

  it('throws an error when invalid token ID is provided', async () => {
    const invalidTokenId = 'invalidTokenId';

    await expect(
      nftSDK.mintUniqueMetadata({
        tokenId: invalidTokenId,
        batchSize: 2,
        supplyKey: PrivateKey.fromString(operatorPrivateKey),
        pathToMetadataURIsFile: pathToRowCSV,
      })
    ).rejects.toThrow(dictionary.hederaActions.mintingError);
  });
});
