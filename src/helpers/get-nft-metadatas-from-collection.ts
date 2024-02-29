import { getMetadataObjectsForValidation, getNFTsFromToken } from '../api/mirror-node';
import { uriDecoder } from './uri-decoder';
import { NetworkName } from '@hashgraph/sdk/lib/client/Client';
export const getNftMetadataFromCollection = async (network: NetworkName, tokenId: string, limit: number, ipfsGateway?: string) => {
  const nfts = await getNFTsFromToken(network, tokenId, limit);

  const decodedMetadataArray = uriDecoder(nfts, ipfsGateway);

  return Promise.all(
    decodedMetadataArray.map(async ({ metadata, serialNumber }) => {
      return getMetadataObjectsForValidation(metadata, serialNumber);
    })
  );
};
