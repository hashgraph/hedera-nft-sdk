"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorToMessage = void 0;
var _dictionary = require("../utils/constants/dictionary");
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

const errorToMessage = e => {
  let error = null;
  if (e instanceof Error) error = e.message;
  if (typeof e === 'string') error = e;
  if (!error) error = _dictionary.dictionary.errors.unhandledError;
  return error;
};
exports.errorToMessage = errorToMessage;
//# sourceMappingURL=error-to-message.js.map