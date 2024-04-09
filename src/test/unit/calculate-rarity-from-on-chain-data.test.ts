import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
import { calculateRarityFromOnChainData } from '../../rarity';
import { getNftMetadataFromCollection } from '../../helpers/get-nft-metadatas-from-collection';

const nftFromNode = [
  {
    isSuccessful: true,
    metadata: {
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
    serialNumber: 5,
  },
  {
    isSuccessful: true,
    metadata: {
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
    serialNumber: 4,
  },
];

jest.mock('../../helpers/get-nft-metadatas-from-collection', () => ({
  getNftMetadataFromCollection: jest.fn(),
}));

describe('calculateRarityFromOnChainData', () => {
  it('should return an array of RarityResult objects', async () => {
    const network: NetworkName = 'mainnet';
    const tokenId: string = '0.0.1270555';
    const ipfsGateway: string = 'https://ipfs.io/ipfs/';
    const limit: number = 100;

    (getNftMetadataFromCollection as jest.Mock).mockResolvedValue(nftFromNode);

    const result = await calculateRarityFromOnChainData(network, tokenId, ipfsGateway, limit);

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
