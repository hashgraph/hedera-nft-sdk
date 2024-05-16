"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeeTool = void 0;
var math = _interopRequireWildcard(require("mathjs"));
var _feeTool = require("../utils/constants/fee-tool");
var _feeToolConfig = require("../utils/constants/fee-tool-config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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

class FeeTool {
  static model = {
    NUM_NODES: _feeTool.NUM_NODES,
    CONSTANT_TERM_WEIGHT: _feeTool.CONSTANT_TERM_WEIGHT,
    PRICE_PRECISION: _feeTool.PRICE_PRECISION,
    FEE_SCHEDULE_MULTIPLIER: _feeTool.FEE_SCHEDULE_MULTIPLIER,
    USD_TO_TINYCENTS: _feeTool.USD_TO_TINYCENTS
  };
  constructor(apis) {
    this.config = apis;
  }
  static getCreateTokenCost = usage => {
    const price = new FeeTool(_feeToolConfig.CREATE_TOKEN_NON_FUNGIBLE_UNIQUE);
    return Number(price.calculatePrice(usage).price);
  };
  static getCreateTokenWithFeesCost = usage => {
    const price = new FeeTool(_feeToolConfig.CREATE_TOKEN_NON_FUNGIBLE_UNIQUE_WITH_CUSTOM_FEES);
    return Number(price.calculatePrice(usage).price);
  };
  calculateUsage(customUsage, apiFormulae) {
    const usage = _feeTool.INITIAL_HEDERA_USAGE;
    this.updateUsageAutoRenewAccountSet(customUsage);
    const valuesForFormulaExecution = {
      ...customUsage,
      ..._feeTool.CONSTANTS_FOR_FORMULAE
    };
    return this.increaseInitialUsageWithCustomUsage(apiFormulae, usage, valuesForFormulaExecution);
  }
  increaseInitialUsageWithCustomUsage(formulae, usage, valuesForFormulaExecution) {
    Object.entries(formulae).forEach(_ref => {
      let [feeComponent, items] = _ref;
      Object.entries(items).forEach(_ref2 => {
        let [item, formula] = _ref2;
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
exports.FeeTool = FeeTool;
//# sourceMappingURL=calculate-price.js.map