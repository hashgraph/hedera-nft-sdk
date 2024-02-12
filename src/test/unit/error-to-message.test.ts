/*-
 *
 * Hedera NFT Utilities
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
import { dictionary } from '../../utils/constants/dictionary';
import { errorToMessage } from '../../helpers/error-to-message';
describe('errorToMessage', () => {
  it('error is instance of Error', () => {
    const message = errorToMessage(new Error('test error'));
    expect(message).toBe('test error');
  });

  it('error is instance of string', () => {
    const message = errorToMessage('test error');

    expect(message).toBe('test error');
  });

  it('unhandled error', () => {
    const message = errorToMessage(undefined);

    expect(message).toBe(dictionary.errors.unhandledError);
  });

  it('error is null', () => {
    const message = errorToMessage(null);

    expect(message).toBe(dictionary.errors.unhandledError);
  });

  it('error is undefined', () => {
    const message = errorToMessage(undefined);

    expect(message).toBe(dictionary.errors.unhandledError);
  });

  it('error is not instance of Error or string', () => {
    const message = errorToMessage(123);

    expect(message).toBe(dictionary.errors.unhandledError);
  });
});
