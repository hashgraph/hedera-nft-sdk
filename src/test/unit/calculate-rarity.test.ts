import { calculateRarity } from '../../rarity';
import { EMPTY_JSON_DIRECTORY_PATH, FILES_WITH_MIXED_EXTENSION_PATH, NON_EMPTY_JSON_DIRECTORY_PATH } from '../__mocks__/consts';
describe('calculateRarityFromData', () => {
  it('should return an array of RarityResult objects from NON_EMPTY_JSON_DIRECTORY_PATH', async () => {
    const result = calculateRarity(NON_EMPTY_JSON_DIRECTORY_PATH);

    expect(result).toStrictEqual([
      {
        attributeContributions: [
          { trait: 'color', value: 'rgb(0,255,0)', contribution: '33.33' },
          { trait: 'hasPipe', value: 'false', contribution: '33.33' },
          { trait: 'stamina', value: '65', contribution: '33.33' },
        ],
        totalRarity: '3.00',
        NFT: 1,
        filename: 'example-1.json',
      },
      {
        attributeContributions: [
          { trait: 'color', value: 'rgb(0,255,0)', contribution: '33.33' },
          { trait: 'hasPipe', value: 'false', contribution: '33.33' },
          { trait: 'stamina', value: '55', contribution: '33.33' },
        ],
        totalRarity: '3.00',
        NFT: 2,
        filename: 'example-2.json',
      },
    ]);
  });

  it('should return an array of RarityResult objects from FILES_WITH_MIXED_EXTENSION_PATH', async () => {
    const result = calculateRarity(FILES_WITH_MIXED_EXTENSION_PATH);

    expect(result).toStrictEqual([
      {
        attributeContributions: [
          { trait: 'color', value: 'rgb(0,255,0)', contribution: '33.33' },
          { trait: 'hasPipe', value: 'false', contribution: '33.33' },
          { trait: 'stamina', value: '55', contribution: '33.33' },
        ],
        totalRarity: '3.00',
        NFT: 1,
        filename: 'example-4.json',
      },
    ]);
  });

  it('should return an array of RarityResult objects from EMPTY_JSON_DIRECTORY_PATH', async () => {
    const result = calculateRarity(EMPTY_JSON_DIRECTORY_PATH);
    expect(result).toStrictEqual([]);
  });
});
