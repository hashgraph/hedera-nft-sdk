import { FixedFeeType, RoyaltyFeeType } from '../types/fees';
import { CustomFixedFee, CustomRoyaltyFee } from '@hashgraph/sdk';
export declare class FeeFactory {
    fixedFee({ collectorAccountId, hbarAmount, amount, denominatingTokenId, allCollectorsAreExempt }: FixedFeeType): CustomFixedFee;
    royaltyFee({ collectorAccountId, numerator, denominator, fallbackFee, allCollectorsAreExempt }: RoyaltyFeeType): CustomRoyaltyFee;
}
//# sourceMappingURL=index.d.ts.map