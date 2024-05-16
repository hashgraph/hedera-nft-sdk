"use strict";

var _tokenMetadataValidator = require("../../../token-metadata-validator");
var _e2eConsts = require("../e2e-consts");
var _consts = require("../../__mocks__/consts");
describe('E2E test for validating shared NFT Collection Metadata Against HIP412 schema', () => {
  let tokenId;
  beforeAll(async () => {
    tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'valid_test_collection',
      collectionSymbol: 'VTC'
    });
    await _e2eConsts.nftSDK.mintSharedMetadata({
      tokenId,
      amount: _e2eConsts.AMOUNT_OF_NFTS_TO_MINT,
      batchSize: _e2eConsts.BATCH_SIZE,
      metaData: _e2eConsts.LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
      supplyKey: _e2eConsts.operatorPrivateKey
    });
    await new Promise(resolve => setTimeout(resolve, _consts.MIRROR_NODE_DELAY));
  }, _consts.LONG_E2E_TIMEOUT);
  it('should successfully validate the previously created NFT collection metadata against the HIP412 schema', async () => {
    const validationResponse = await _tokenMetadataValidator.TokenMetadataValidator.validateMetadataFromOnChainCollection(_e2eConsts.NETWORK, tokenId, _e2eConsts.IPFS_GATEWAY);
    expect(validationResponse.isValid).toBe(true);
    expect(validationResponse.errors).toHaveLength(0);
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=create-and-validate-shared-nft-collection-metadata-e2e.test.js.map