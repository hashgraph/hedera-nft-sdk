/*-
 *
 * Hedera NFT Utilities
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
import { calculateRiskScoreFromTokenId } from '../../risk';
import axios from 'axios';
import { exampleMetadata } from '../__mocks__/exampleMetadata';

jest.mock('axios');

describe('calculateRiskScoreFromTokenId', () => {
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should calculate risk score for a given token ID', async () => {
    mockAxios.get.mockResolvedValueOnce(exampleMetadata);

    const riskResults = await calculateRiskScoreFromTokenId({ tokenId: '0.0.123456' });

    expect(riskResults.riskScore).toBe(20);
    expect(riskResults.riskLevel).toBe('LOW');
  });
});
