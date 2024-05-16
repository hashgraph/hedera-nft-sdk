"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestCustomService = void 0;
var _uploadService = require("../../services/upload-service");
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

class TestCustomService {
  async uploadFile() {
    return 'Test service is working';
  }
}
exports.TestCustomService = TestCustomService;
describe('UploadService Integration Test', () => {
  let filePath;
  let fileBuffer;
  let blob;
  beforeAll(() => {
    filePath = 'src/test/__mocks__/exampleFiles/photo.jpeg';
    fileBuffer = _fs.default.readFileSync(filePath);
    blob = new Blob([fileBuffer]);
  });
  test('should upload files successfully using MockStorageService', async () => {
    const mockStorageConfig = new TestCustomService();
    const uploadService = new _uploadService.UploadService(mockStorageConfig);
    const result = await uploadService.uploadBlobFiles([blob]);
    expect(result).toBeDefined();
    expect(result[0].url).toEqual('Test service is working');
  });
});
//# sourceMappingURL=custom-storage-provider.test.js.map