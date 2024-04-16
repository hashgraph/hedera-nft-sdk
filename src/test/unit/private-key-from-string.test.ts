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
import { getPrivateKeyFromString } from '../../helpers/get-private-key-from-string';
import { dictionary } from '../../utils/constants/dictionary';
import { myPrivateKey, mySecondPrivateKey } from '../__mocks__/consts';

describe('getPrivateKeyFromString', () => {
  it('should not throw with valid ED25519 private key string', async () => {
    const privateKeyString = myPrivateKey;
    expect(() => getPrivateKeyFromString(privateKeyString)).not.toThrow();
  });

  it('should not throw with valid ECDSA private key string', async () => {
    const privateKeyString = mySecondPrivateKey;
    expect(() => getPrivateKeyFromString(privateKeyString)).not.toThrow();
  });

  it('should throw an error with invalid private key string', async () => {
    const privateKeyString = 'invalidPrivateKeyString';
    expect(() => getPrivateKeyFromString(privateKeyString)).toThrow(dictionary.errors.privateKeyInvalid);
  });

  it('should throw an error with no private key string', async () => {
    const privateKeyString = '';
    expect(() => getPrivateKeyFromString(privateKeyString)).toThrow(dictionary.errors.privateKeyRequired);
  });
});
