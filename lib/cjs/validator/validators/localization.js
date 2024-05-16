"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localizationValidator = void 0;
var _dictionary = require("../../utils/constants/dictionary");
/*-
 *
 * Hedera NFT SDK
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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

/**
 * The localization validator applies specific rules for the localization object
 * such as validating two-letter language codes, the default locale, and the localization URI format.
 * If the localization field is not present (optional field), no errors are returned.
 *
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#localization
 *
 * @param {Object} instance - The JSON object to validate against a schema
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const localizationValidator = instance => {
  const localization = instance.localization;
  const errors = [];
  if (!localization) return errors; // localization is an optional field

  if (localization.default.length != 2) {
    // default should be two-letter language code
    errors.push({
      type: 'localization',
      msg: `${_dictionary.dictionary.errors.localization.defaultLocaleTwoLetterLanguageCode}: ${localization.default}`
    });
  }

  // check for two-letter language codes in "locales"
  const notTwoLetterCode = localization.locales.filter(locale => locale.length != 2);
  if (notTwoLetterCode.length > 0) {
    notTwoLetterCode.map(locale => {
      errors.push({
        type: 'localization',
        msg: `${_dictionary.dictionary.errors.localization.localeTwoLetterLanguageCode}: ${locale}`
      });
    });
  }
  if (localization.locales.includes(localization.default)) {
    // default locale should not appear in locales array
    errors.push({
      type: 'localization',
      msg: _dictionary.dictionary.errors.localization.defaultLocaleShouldNotAppear
    });
  }

  // localization.uri should follow format <protocol>://<hash>/{locale}.json (check for last part "{locale}.json")
  if (!localization.uri.includes('/{locale}.json')) {
    errors.push({
      type: 'localization',
      msg: _dictionary.dictionary.errors.localization.wrongUriFormat
    });
  }
  return errors;
};
exports.localizationValidator = localizationValidator;
//# sourceMappingURL=localization.js.map