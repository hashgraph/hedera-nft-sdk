export type FixedFeeType = {
  collectorAccountId: string;
  hbarAmount?: number;
  amount?: number;
  denominatingTokenId?: string;
  allCollectorsAreExempt?: boolean;
};

export type RoyaltyFeeType = {
  collectorAccountId: string;
  numerator: number;
  denominator: number;
  fallbackFee?: FixedFeeType;
  allCollectorsAreExempt?: boolean;
};
