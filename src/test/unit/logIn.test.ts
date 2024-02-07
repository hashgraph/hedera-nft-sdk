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
import { logIn } from '../../functions/log-in';
import { Client } from '@hashgraph/sdk';
import { myAccountId, myPrivateKey } from '../__mocks__/consts';
import { dictionary } from '../../utils/constants/dictionary';

jest.mock('@hashgraph/sdk', () => {
  return {
    Client: {
      forTestnet: jest.fn().mockReturnThis(),
      setOperator: jest.fn(),
    },
  };
});

describe('logIn', () => {
  it('should call setOperator with correct parameters', () => {
    logIn({ myAccountId, myPrivateKey });

    expect(Client.forTestnet).toHaveBeenCalled();
    expect(Client.forTestnet().setOperator).toHaveBeenCalledWith(myAccountId, myPrivateKey);
  });

  it('should throw an error if myAccountId is not provided', () => {
    expect(() => logIn({ myAccountId: '', myPrivateKey })).toThrow(dictionary.hederaActions.myAccountIdRequired);
  });

  it('should throw an error if myPrivateKey is not provided', () => {
    expect(() => logIn({ myAccountId, myPrivateKey: '' })).toThrow(dictionary.hederaActions.myPrivateKeyRequired);
  });
});
