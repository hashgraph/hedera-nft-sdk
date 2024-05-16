import { TokenCreateUsage, TokenCreateWithFeesUsage } from '../types/estimate-create-collection';
import { CustomFeeType } from '../types/create-collection';
export declare const getTokenCreateWithFeesUsage: ({ customFees, tokenUsage, }: {
    customFees?: CustomFeeType[];
    tokenUsage?: TokenCreateUsage;
}) => TokenCreateWithFeesUsage | undefined;
//# sourceMappingURL=get-token-create-with-fees-usage.d.ts.map