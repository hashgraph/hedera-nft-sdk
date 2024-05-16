"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _uploadService = require("../../services/upload-service");
var _nftStorageService = require("../../services/file-storages/nft-storage/nft-storage-service");
var _pinataService = require("../../services/file-storages/pinata/pinata-service");
var _mockStorageService = require("../../services/file-storages/mock-storage/mock-storage-service");
var _e2eConsts = require("./e2e-consts");
var _consts = require("../__mocks__/consts");
var _exampleNFTMetadata = require("../__mocks__/exampleNFTMetadata");
var _awsService = require("../../services/file-storages/aws/aws-service");
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

const itif = condition => condition ? it : it.skip;
describe('UploadService E2E Test', () => {
  let filePath;
  let fileBuffer;
  let blob;
  beforeAll(() => {
    filePath = 'src/test/__mocks__/exampleFiles/photo.jpeg';
    fileBuffer = _fs.default.readFileSync(filePath);
    blob = new Blob([fileBuffer]);
  });
  itif(_e2eConsts.awsAccessKey && _e2eConsts.awsSecretKey)('should upload files successfully using AWSService', async () => {
    const awsStorageConfig = new _awsService.AWSService(_e2eConsts.awsAccessKey, _e2eConsts.awsSecretKey, 'eu-central-1', 'hederatest');
    const uploadService = new _uploadService.UploadService(awsStorageConfig);
    const result = await uploadService.uploadBlobFiles([blob]);
    expect(result[0].content).toEqual(blob);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  itif(_e2eConsts.awsAccessKey && _e2eConsts.awsSecretKey)('should upload file by path successfully using AWSService', async () => {
    const awsStorageConfig = new _awsService.AWSService(_e2eConsts.awsAccessKey, _e2eConsts.awsSecretKey, 'eu-central-1', 'hederatest');
    const uploadService = new _uploadService.UploadService(awsStorageConfig);
    const result = await uploadService.uploadFilesFromPath([filePath]);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  itif(_e2eConsts.awsAccessKey && _e2eConsts.awsSecretKey)('should upload files by path directory successfully using AWSService', async () => {
    const awsStorageConfig = new _awsService.AWSService(_e2eConsts.awsAccessKey, _e2eConsts.awsSecretKey, 'eu-central-1', 'hederatest');
    const uploadService = new _uploadService.UploadService(awsStorageConfig);
    const result = await uploadService.uploadFilesFromPath(['src/test/__mocks__/exampleFiles']);
    expect(result[0].url).toBeDefined();
    expect(result[1].url).toBeDefined();
    expect(result).toHaveLength(2);
  }, _consts.LONG_E2E_TIMEOUT);
  itif(_e2eConsts.awsAccessKey && _e2eConsts.awsSecretKey)('should upload metadata successfully using AWSService', async () => {
    const awsStorageConfig = new _awsService.AWSService(_e2eConsts.awsAccessKey, _e2eConsts.awsSecretKey, 'eu-central-1', 'hederatest');
    const uploadService = new _uploadService.UploadService(awsStorageConfig);
    const result = await uploadService.uploadMetadataList([_exampleNFTMetadata.exampleNFTMetadata]);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload files successfully using NftStorageService', async () => {
    const nftStorageConfig = new _nftStorageService.NftStorageService('https://api.nft.storage/', 'upload', [_e2eConsts.nftStorageApiKey]);
    const uploadService = new _uploadService.UploadService(nftStorageConfig);
    const result = await uploadService.uploadBlobFiles([blob]);
    expect(result[0].content).toEqual(blob);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload file by path successfully using NftStorageService', async () => {
    const nftStorageConfig = new _nftStorageService.NftStorageService('https://api.nft.storage/', 'upload', [_e2eConsts.nftStorageApiKey]);
    const uploadService = new _uploadService.UploadService(nftStorageConfig);
    const result = await uploadService.uploadFilesFromPath([filePath]);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload files by path directory successfully using NftStorageService', async () => {
    const nftStorageConfig = new _nftStorageService.NftStorageService('https://api.nft.storage/', 'upload', [_e2eConsts.nftStorageApiKey]);
    const uploadService = new _uploadService.UploadService(nftStorageConfig);
    const result = await uploadService.uploadFilesFromPath(['src/test/__mocks__/exampleFiles']);
    expect(result[0].url).toBeDefined();
    expect(result[1].url).toBeDefined();
    expect(result).toHaveLength(2);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload metadata successfully using NftStorageService', async () => {
    const nftStorageConfig = new _nftStorageService.NftStorageService('https://api.nft.storage/', 'upload', [_e2eConsts.nftStorageApiKey]);
    const uploadService = new _uploadService.UploadService(nftStorageConfig);
    const result = await uploadService.uploadMetadataList([_exampleNFTMetadata.exampleNFTMetadata]);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload files successfully using PinataService', async () => {
    const pinataStorageConfig = new _pinataService.PinataService(_e2eConsts.pinataJwtKey, _e2eConsts.pinataApiKey, _e2eConsts.pinataSecretApiKey);
    const uploadService = new _uploadService.UploadService(pinataStorageConfig);
    const result = await uploadService.uploadBlobFiles([blob]);
    expect(result[0].content).toEqual(blob);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload file by path successfully using PinataService', async () => {
    const pinataStorageConfig = new _pinataService.PinataService(_e2eConsts.pinataJwtKey, _e2eConsts.pinataApiKey, _e2eConsts.pinataSecretApiKey);
    const uploadService = new _uploadService.UploadService(pinataStorageConfig);
    const result = await uploadService.uploadFilesFromPath([filePath]);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload files by path directory successfully using PinataService', async () => {
    const pinataStorageConfig = new _pinataService.PinataService(_e2eConsts.pinataJwtKey, _e2eConsts.pinataApiKey, _e2eConsts.pinataSecretApiKey);
    const uploadService = new _uploadService.UploadService(pinataStorageConfig);
    const result = await uploadService.uploadFilesFromPath(['src/test/__mocks__/exampleFiles']);
    expect(result[0].url).toBeDefined();
    expect(result[1].url).toBeDefined();
    expect(result).toHaveLength(2);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload metadata successfully using PinataService', async () => {
    const pinataStorageConfig = new _pinataService.PinataService(_e2eConsts.pinataJwtKey, _e2eConsts.pinataApiKey, _e2eConsts.pinataSecretApiKey);
    const uploadService = new _uploadService.UploadService(pinataStorageConfig);
    const result = await uploadService.uploadMetadataList([_exampleNFTMetadata.exampleNFTMetadata]);
    expect(result[0].url).toBeDefined();
    expect(result).toHaveLength(1);
  }, _consts.LONG_E2E_TIMEOUT);
  it('should upload files successfully using MockStorageService', async () => {
    const mockStorageConfig = new _mockStorageService.MockStorageService('https://www.mockstorage.com/');
    const uploadService = new _uploadService.UploadService(mockStorageConfig);
    const result = await uploadService.uploadBlobFiles([blob]);
    expect(result).toBeDefined();
    expect(result[0].url).toEqual('https://www.mockstorage.com/');
  }, _consts.LONG_E2E_TIMEOUT);
});
//# sourceMappingURL=storage-provider-e2e.test.js.map