"use strict";

var _consts = require("../__mocks__/consts");
var _rarity = require("../../rarity");
var _e2eConsts = require("./e2e-consts");
var _linkToJsonObjectWithoutErrorsAttributes = require("../__mocks__/linkToJsonObjectWithoutErrorsAttributes");
describe('calculateRiskScoreFromTokenIdE2E', () => {
  it('should calculate risk score for a given token ID', async () => {
    const tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'test_name',
      collectionSymbol: 'test_symbol'
    });
    await _e2eConsts.nftSDK.mintSharedMetadata({
      tokenId,
      amount: 5,
      batchSize: 2,
      metaData: _e2eConsts.LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
      supplyKey: _e2eConsts.operatorPrivateKey
    });
    await new Promise(resolve => setTimeout(resolve, _consts.MIRROR_NODE_DELAY));
    const response = await (0, _rarity.calculateRarityFromOnChainData)('testnet', tokenId, 'https://gateway.pinata.cloud/ipfs');
    expect(response).toStrictEqual(_linkToJsonObjectWithoutErrorsAttributes.LINK_TO_JSON_OBJECT_WITHOUT_ERRORS_ATTRIBUTES);
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=calculate-rarity-from-on-chain-data-e2e.test.js.map