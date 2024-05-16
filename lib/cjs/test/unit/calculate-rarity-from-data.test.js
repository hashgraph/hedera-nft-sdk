"use strict";

var _rarity = require("../../rarity");
const nftMetadata = [{
  name: 'Example NFT 1',
  creator: 'Hedera',
  description: 'This is an example NFT 1',
  image: 'https://nft.com/mycollection/1.jpg',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/1',
    url: 'https://nft.com/mycollection/1'
  },
  attributes: [{
    trait_type: 'color',
    value: 'rgb(0,255,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'false'
  }, {
    trait_type: 'stamina',
    value: '65'
  }]
}, {
  name: 'Example NFT 1',
  creator: 'Hedera',
  description: 'This is an example NFT 1',
  image: 'https://nft.com/mycollection/1.jpg',
  type: 'image/jpeg',
  properties: {
    external_url: 'https://nft.com/mycollection/1',
    url: 'https://nft.com/mycollection/1'
  },
  attributes: [{
    trait_type: 'color',
    value: 'rgb(0,255,0)'
  }, {
    trait_type: 'hasPipe',
    value: 'false'
  }, {
    trait_type: 'stamina',
    value: '65'
  }]
}];
describe('calculateRarityFromData', () => {
  it('should return an array of RarityResult objects', async () => {
    const result = (0, _rarity.calculateRarityFromData)(nftMetadata);
    expect(result).toStrictEqual([{
      attributeContributions: [{
        trait: 'color',
        value: 'rgb(0,255,0)',
        contribution: '33.33'
      }, {
        trait: 'hasPipe',
        value: 'false',
        contribution: '33.33'
      }, {
        trait: 'stamina',
        value: '65',
        contribution: '33.33'
      }],
      totalRarity: '3.00',
      NFT: 1
    }, {
      attributeContributions: [{
        trait: 'color',
        value: 'rgb(0,255,0)',
        contribution: '33.33'
      }, {
        trait: 'hasPipe',
        value: 'false',
        contribution: '33.33'
      }, {
        trait: 'stamina',
        value: '65',
        contribution: '33.33'
      }],
      totalRarity: '3.00',
      NFT: 2
    }]);
  });
});
//# sourceMappingURL=calculate-rarity-from-data.test.js.map