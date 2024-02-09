import { Client, PrivateKey } from '@hashgraph/sdk';

export type sharedMintingValidationProps = {
  batchSize?: number;
  tokenId?: string;
  amount?: number;
  metaData?: string;
  supplyKey?: PrivateKey;
};

export type uniqueMintingValidationProps = {
  batchSize?: number;
  tokenId?: string;
  supplyKey?: PrivateKey;
  pathToMetadataURIsFile?: string;
  metadataArray?: string[];
};

export type increaseNFTSupplyValidationProps = {
  nftId?: NftId;
  batchSize?: number;
  amount?: number;
  supplyKey?: PrivateKey;
};

export type validateCreateCollectionProps = {
  client?: Client;
  collectionName?: string;
  collectionSymbol?: string;
  treasuryAccountPrivateKey?: string;
  treasuryAccount?: string;
  customFees?: CustomFee[];
};

export type fixedFeeValidationProps = {
  collectorAccountId?: string;
  hbarAmount?: number;
  amount?: number;
  denominatingTokenId?: string;
};

export type royaltyFeeValidationProps = {
  collectorAccountId?: string;
  numerator: number;
  denominator: number;
};
