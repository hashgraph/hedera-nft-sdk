import { calculateTraitOccurrenceFromData } from '../../rarity';

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
    const result = calculateTraitOccurrenceFromData(nftMetadata);

    expect(result).toStrictEqual([
      {
        trait: 'color',
        values: [{ value: 'rgb(0,255,0)', occurence: '100.00' }],
      },
      {
        trait: 'hasPipe',
        values: [{ value: 'false', occurence: '100.00' }],
      },
      {
        trait: 'stamina',
        values: [{ value: '65', occurence: '100.00' }],
      },
    ]);
  });
});
