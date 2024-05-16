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

import * as math from 'mathjs';
import { CONSTANT_TERM_WEIGHT, CONSTANTS_FOR_FORMULAE, FEE_SCHEDULE_MULTIPLIER, INITIAL_HEDERA_USAGE, NUM_NODES, PRICE_PRECISION, USD_TO_TINYCENTS } from '../utils/constants/fee-tool';
import { CREATE_TOKEN_NON_FUNGIBLE_UNIQUE, CREATE_TOKEN_NON_FUNGIBLE_UNIQUE_WITH_CUSTOM_FEES } from '../utils/constants/fee-tool-config';
export class FeeTool {
  static model = {
    NUM_NODES,
    CONSTANT_TERM_WEIGHT,
    PRICE_PRECISION,
    FEE_SCHEDULE_MULTIPLIER,
    USD_TO_TINYCENTS
  };
  constructor(apis) {
    this.config = apis;
  }
  static getCreateTokenCost = usage => {
    const price = new FeeTool(CREATE_TOKEN_NON_FUNGIBLE_UNIQUE);
    return Number(price.calculatePrice(usage).price);
  };
  static getCreateTokenWithFeesCost = usage => {
    const price = new FeeTool(CREATE_TOKEN_NON_FUNGIBLE_UNIQUE_WITH_CUSTOM_FEES);
    return Number(price.calculatePrice(usage).price);
  };
  calculateUsage(customUsage, apiFormulae) {
    const usage = INITIAL_HEDERA_USAGE;
    this.updateUsageAutoRenewAccountSet(customUsage);
    const valuesForFormulaExecution = {
      ...customUsage,
      ...CONSTANTS_FOR_FORMULAE
    };
    return this.increaseInitialUsageWithCustomUsage(apiFormulae, usage, valuesForFormulaExecution);
  }
  increaseInitialUsageWithCustomUsage(formulae, usage, valuesForFormulaExecution) {
    Object.entries(formulae).forEach(([feeComponent, items]) => {
      Object.entries(items).forEach(([item, formula]) => {
        const validFeeComponent = feeComponent;
        const usageItem = item;
        const compiledFormula = math.parse(formula).compile();
        if (usage[validFeeComponent][usageItem] === undefined || usage[validFeeComponent][usageItem] === null) {
          return;
        }
        usage[validFeeComponent][usageItem] = compiledFormula.evaluate(valuesForFormulaExecution);
      });
    });
    return usage;
  }
  updateUsageAutoRenewAccountSet(usage) {
    if ('isAutoRenewAccountSet' in usage && typeof usage.isAutoRenewAccountSet === 'boolean') {
      usage.isAutoRenewAccountSet = usage.isAutoRenewAccountSet ? 1 : 0;
    }
  }
  sumHederaUsage(usage1, usage2) {
    const usageComponents = ['node', 'network', 'service'];
    const usageKeys = ['constant', 'bpt', 'vpt', 'rbh', 'sbh', 'gas', 'bpr', 'sbpr', 'min', 'max'];
    let sum = 0;
    for (const component of usageComponents) {
      for (const subKey of usageKeys) {
        const value1 = usage1[component][subKey];
        const value2 = usage2[component][subKey];
        if (value1 && value2) {
          sum = sum + value1 * value2;
        }
      }
    }
    return sum;
  }
  calculatePrice(customUsage) {
    const actualUsage = this.calculateUsage(customUsage, this.config.formulae);
    const usageSum = this.sumHederaUsage(this.config.feeSchedules, actualUsage);
    const normalizedPrice = math.evaluate(`${usageSum} / (${FeeTool.model.FEE_SCHEDULE_MULTIPLIER} * ${FeeTool.model.USD_TO_TINYCENTS})`);
    return {
      usage: actualUsage,
      price: normalizedPrice.toFixed(FeeTool.model.PRICE_PRECISION)
    };
  }
}
//# sourceMappingURL=calculate-price.js.map