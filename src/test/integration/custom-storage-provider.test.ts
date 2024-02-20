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
import { UploadService } from '../../services/upload-service';
import { FileStorage } from '../../types/file-storage-service';
import fs from 'fs';

export class TestCustomService implements FileStorage {
  public async uploadFile(): Promise<string> {
    return 'Test service is working';
  }
}

describe('UploadService Integration Test', () => {
  let filePath: string;
  let fileBuffer: Buffer;
  let blob: Blob;

  beforeAll(() => {
    filePath = 'src/test/__mocks__/photo.jpeg';
    fileBuffer = fs.readFileSync(filePath);
    blob = new Blob([fileBuffer]);
  });

  test('should upload files successfully using MockStorageService', async () => {
    const mockStorageConfig = new TestCustomService();
    const uploadService = new UploadService(mockStorageConfig);
    const result = await uploadService.uploadFiles([blob]);
    expect(result).toBeDefined();
    expect(result[0].url).toEqual('Test service is working');
  });
});
