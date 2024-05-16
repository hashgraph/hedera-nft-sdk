"use strict";

var _tokenMetadataValidator = require("../../../token-metadata-validator");
var _e2eConsts = require("../e2e-consts");
var _consts = require("../../__mocks__/consts");
describe('E2E test for validating single NFT Metadata Object Against HIP412 schema', () => {
  let tokenId;
  beforeAll(async () => {
    tokenId = await _e2eConsts.nftSDK.createCollection({
      collectionName: 'valid_test_collection-single',
      collectionSymbol: 'VTC-Single'
    });
    await _e2eConsts.nftSDK.mintSharedMetadata({
      tokenId,
      amount: _e2eConsts.AMOUNT_OF_NFTS_TO_MINT_SINGLE,
      batchSize: _e2eConsts.BATCH_SIZE_SINGLE,
      metaData: _e2eConsts.LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
      supplyKey: _e2eConsts.operatorPrivateKey
    });
    await new Promise(resolve => setTimeout(resolve, _consts.MIRROR_NODE_DELAY));
  }, _consts.LONG_E2E_TIMEOUT);
  it('should successfully validate single metadata object with particular serial number from previously created NFT collection against the HIP412 schema', async () => {
    const validationResponse = await _tokenMetadataValidator.TokenMetadataValidator.validateSingleOnChainNFTMetadata(_e2eConsts.NETWORK, tokenId, _e2eConsts.METADATA_TO_VALIDATE_OBJECT_SERIAL, _e2eConsts.IPFS_GATEWAY);
    expect(validationResponse.isValid).toBe(true);
    expect(validationResponse.errors).toHaveLength(0);
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=validate-single-on-chain-nft-metadata-e2e.test.js.map