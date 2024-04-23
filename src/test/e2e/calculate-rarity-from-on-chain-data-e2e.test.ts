import { LONG_E2E_TIMEOUT, MIRROR_NODE_DELAY } from '../__mocks__/consts';
import { calculateRarityFromOnChainData } from '../../rarity';
import { LINK_TO_JSON_OBJECT_WITHOUT_ERRORS, nftSDK, operatorPrivateKey } from './e2e-consts';
import { LINK_TO_JSON_OBJECT_WITHOUT_ERRORS_ATTRIBUTES } from '../__mocks__/linkToJsonObjectWithoutErrorsAttributes';

describe('calculateRiskScoreFromTokenIdE2E', () => {
  it(
    'should calculate risk score for a given token ID',
    async () => {
      const tokenId = await nftSDK.createCollection({
        collectionName: 'test_name',
        collectionSymbol: 'test_symbol',
      });
      await nftSDK.mintSharedMetadata({
        tokenId,
        amount: 5,
        batchSize: 2,
        metaData: LINK_TO_JSON_OBJECT_WITHOUT_ERRORS,
        supplyKey: operatorPrivateKey,
      });
      await new Promise((resolve) => setTimeout(resolve, MIRROR_NODE_DELAY));

      const response = await calculateRarityFromOnChainData('testnet', tokenId, 'https://gateway.pinata.cloud/ipfs');

      expect(response).toStrictEqual(LINK_TO_JSON_OBJECT_WITHOUT_ERRORS_ATTRIBUTES);
    },
    LONG_E2E_TIMEOUT
  );
});
