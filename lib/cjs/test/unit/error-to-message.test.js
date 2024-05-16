"use strict";

var _dictionary = require("../../utils/constants/dictionary");
var _errorToMessage = require("../../helpers/error-to-message");
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

describe('errorToMessage', () => {
  it('error is instance of Error', () => {
    const message = (0, _errorToMessage.errorToMessage)(new Error('test error'));
    expect(message).toBe('test error');
  });
  it('error is instance of string', () => {
    const message = (0, _errorToMessage.errorToMessage)('test error');
    expect(message).toBe('test error');
  });
  it('unhandled error', () => {
    const message = (0, _errorToMessage.errorToMessage)(undefined);
    expect(message).toBe(_dictionary.dictionary.errors.unhandledError);
  });
  it('error is null', () => {
    const message = (0, _errorToMessage.errorToMessage)(null);
    expect(message).toBe(_dictionary.dictionary.errors.unhandledError);
  });
  it('error is undefined', () => {
    const message = (0, _errorToMessage.errorToMessage)(undefined);
    expect(message).toBe(_dictionary.dictionary.errors.unhandledError);
  });
  it('error is not instance of Error or string', () => {
    const message = (0, _errorToMessage.errorToMessage)(123);
    expect(message).toBe(_dictionary.dictionary.errors.unhandledError);
  });
});
//# sourceMappingURL=error-to-message.test.js.map