"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AWSService = void 0;
var _dictionary = require("../../../utils/constants/dictionary");
var _magicBytes = require("magic-bytes.js");
var _errorToMessage = require("../../../helpers/error-to-message");
var _clientS = require("@aws-sdk/client-s3");
var _libStorage = require("@aws-sdk/lib-storage");
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

class AWSService {
  constructor(awsAccessKeyId, awsSecretAccessKey, awsS3Region, awsS3Bucket) {
    this.awsAccessKeyId = awsAccessKeyId;
    this.awsSecretAccessKey = awsSecretAccessKey;
    this.awsS3Region = awsS3Region;
    this.awsS3Bucket = awsS3Bucket;
    this.client = new _clientS.S3Client({
      credentials: {
        accessKeyId: this.awsAccessKeyId,
        secretAccessKey: this.awsSecretAccessKey
      },
      region: this.awsS3Region
    });
  }
  async uploadFile(file) {
    const buffer = new Uint8Array(await file.arrayBuffer());
    const fileTypeFromBufferInstance = (0, _magicBytes.filetypename)(buffer);
    const fileName = `${Date.now().toString()}.${fileTypeFromBufferInstance[0] ?? 'json'}`;
    try {
      const res = new _libStorage.Upload({
        client: this.client,
        params: {
          ACL: 'public-read',
          Bucket: this.awsS3Bucket,
          Key: fileName,
          Body: buffer,
          ContentType: file.type || 'application/octet-stream' // Set the Content-Type header
        },
        tags: [],
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        // Maximum part size is 5MB
        leavePartsOnError: false // optional manually handle dropped parts
      });
      const resDone = await res.done();
      if (!resDone || !resDone.Location) {
        throw new Error(_dictionary.dictionary.errors.awsUploadIssue);
      }
      return resDone.Location;
    } catch (error) {
      throw new Error(_dictionary.dictionary.errors.awsUploadingError((0, _errorToMessage.errorToMessage)(error)));
    }
  }
}
exports.AWSService = AWSService;
//# sourceMappingURL=aws-service.js.map