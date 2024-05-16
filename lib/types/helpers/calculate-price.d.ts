import { TokenCreateUsage, TokenCreateWithFeesUsage } from '../types/estimate-create-collection';
export declare class FeeTool {
    private config;
    private static model;
    private constructor();
    static getCreateTokenCost: (usage: TokenCreateUsage) => number;
    static getCreateTokenWithFeesCost: (usage: TokenCreateWithFeesUsage) => number;
    private calculateUsage;
    private increaseInitialUsageWithCustomUsage;
    private updateUsageAutoRenewAccountSet;
    private sumHederaUsage;
    private calculatePrice;
}
//# sourceMappingURL=calculate-price.d.ts.map