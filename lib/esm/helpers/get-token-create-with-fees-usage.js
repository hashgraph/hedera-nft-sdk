/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

export const getTokenCreateWithFeesUsage = ({
  customFees,
  tokenUsage
}) => {
  const commonUsageData = tokenUsage;
  if (!commonUsageData) return;
  const fixedFees = customFees?.filter(fee => {
    return !!fee._toProtobuf().fixedFee;
  });
  const royaltyFees = customFees?.filter(fee => {
    return !!fee._toProtobuf().royaltyFee;
  });
  let numFixedHbarCustomFees = 0;
  let numFixedHtsCustomFees = 0;
  let numRoyaltyNoFallbackCustomFees = 0;
  let numRoyaltyHbarFallbackCustomFees = 0;
  let numRoyaltyHtsFallbackCustomFees = 0;
  fixedFees?.forEach(fee => {
    if (fee.hbarAmount) {
      numFixedHbarCustomFees++;
    } else {
      numFixedHtsCustomFees++;
    }
  });
  royaltyFees?.forEach(fee => {
    if (!fee._fallbackFee) {
      numRoyaltyNoFallbackCustomFees++;
      return;
    }
    if (fee._fallbackFee.denominatingTokenId) {
      numRoyaltyHtsFallbackCustomFees++;
      return;
    } else {
      numRoyaltyHbarFallbackCustomFees++;
    }
  });
  return {
    ...commonUsageData,
    numFixedHbarCustomFees,
    numFixedHtsCustomFees,
    numRoyaltyNoFallbackCustomFees,
    numRoyaltyHbarFallbackCustomFees,
    numRoyaltyHtsFallbackCustomFees
  };
};
//# sourceMappingURL=get-token-create-with-fees-usage.js.map