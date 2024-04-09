import { PrivateKey } from '@hashgraph/sdk';
import { Hip412Validator } from '../../../hip412-validator';
import {
  nftSDK,
  operatorPrivateKey,
  NETWORK,
  IPFS_GATEWAY,
  LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
  AMOUNT_OF_NFTS_TO_MINT_SINGLE,
  BATCH_SIZE_SINGLE,
  METADATA_TO_VALIDATE_OBJECT_SERIAL,
} from '../e2e-consts';
import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../../__mocks__/consts';
import { getPrivateKeyFromString } from '../../../helpers/get-private-key-from-string';

describe('E2E test for validating single NFT Metadata Object Against HIP412 schema', () => {
  let tokenId: string;

  beforeAll(async () => {
    tokenId = await nftSDK.createCollection({
      collectionName: 'valid_test_collection-single',
      collectionSymbol: 'VTC-Single',
    });

    await nftSDK.mintSharedMetadata({
      tokenId,
      amount: AMOUNT_OF_NFTS_TO_MINT_SINGLE,
      batchSize: BATCH_SIZE_SINGLE,
      metaData: LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
      supplyKey: operatorPrivateKey,
    });

    await new Promise((resolve) => setTimeout(resolve, MIRROR_NODE_DELAY));
  }, LONG_E2E_TIMEOUT);

  it(
    'should successfully validate single metadata object with particular serial number from previously created NFT collection against the HIP412 schema',
    async () => {
      const validationResponse = await Hip412Validator.validateSingleOnChainNFTMetadata(
        NETWORK,
        tokenId,
        METADATA_TO_VALIDATE_OBJECT_SERIAL,
        IPFS_GATEWAY
      );

      expect(validationResponse.isValid).toBe(true);
      expect(validationResponse.errors).toHaveLength(0);
    },
    LONG_E2E_TIMEOUT
  );
});
