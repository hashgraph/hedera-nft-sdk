"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageForHip412MetadataSchema = exports.Hip412MetadataSchema = exports.Hip412MetadataCommonSchema = void 0;
var _isImageFile = require("../../helpers/is-image-file");
var _isString = _interopRequireDefault(require("lodash/isString"));
var _zod = require("zod");
var _dictionary = require("../constants/dictionary");
var _mimeTypesAndExtensions = require("../constants/mime-types-and-extensions");
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

const AttributeSchema = _zod.z.object({
  trait_type: _zod.z.string(),
  display_type: _zod.z.string().optional(),
  value: _zod.z.union([_zod.z.string().min(1), _zod.z.number(), _zod.z.boolean()]),
  max_value: _zod.z.union([_zod.z.string(), _zod.z.number()]).optional()
});
const LocalizationSchema = _zod.z.object({
  uri: _zod.z.string(),
  default: _zod.z.string(),
  locales: _zod.z.array(_zod.z.string())
});
const FileSchema = _zod.z.object({
  uri: _zod.z.string(),
  type: _zod.z.string().refine(value => _mimeTypesAndExtensions.KNOWN_IMAGE_MIME_TYPES.some(knownType => value.startsWith(knownType)), {
    message: _dictionary.dictionary.validation.unsupportedImageMimeType
  }),
  metadata: recursiveSchema().optional(),
  checksum: _zod.z.string().optional(),
  is_default_file: _zod.z.boolean().optional(),
  metadata_uri: _zod.z.string().optional()
});
const Hip412MetadataCommonSchema = exports.Hip412MetadataCommonSchema = {
  name: _zod.z.string().min(1),
  description: _zod.z.string().optional(),
  creator: _zod.z.string().optional(),
  creatorDID: _zod.z.string().optional(),
  checksum: _zod.z.string().optional(),
  type: _zod.z.string().refine(value => _mimeTypesAndExtensions.KNOWN_IMAGE_MIME_TYPES.some(knownType => value.startsWith(knownType)), {
    message: _dictionary.dictionary.validation.unsupportedImageMimeType
  }),
  files: _zod.z.array(FileSchema).optional(),
  format: _zod.z.optional(_zod.z.string()),
  properties: _zod.z.record(_zod.z.unknown()).optional(),
  attributes: _zod.z.array(AttributeSchema).optional(),
  localization: LocalizationSchema.optional()
};
const imageForHip412MetadataSchema = exports.imageForHip412MetadataSchema = _zod.z.custom().superRefine((value, ctx) => {
  if (!value || (0, _isString.default)(value) && !value.length) {
    ctx.addIssue({
      fatal: true,
      code: _zod.z.ZodIssueCode.custom,
      message: _dictionary.dictionary.validation.imageForNftNotFound
    });
    return false;
  }
  if (!(0, _isString.default)(value) && value.filePath && !(0, _isImageFile.isImageFile)(value.name, value.mimeType)) {
    ctx.addIssue({
      fatal: true,
      code: _zod.z.ZodIssueCode.custom,
      message: _dictionary.dictionary.validation.mediaFileNotSupported
    });
    return false;
  }
  return true;
});
function recursiveSchema() {
  return _zod.z.lazy(() => _zod.z.object(Hip412MetadataCommonSchema));
}
const Hip412MetadataSchema = exports.Hip412MetadataSchema = _zod.z.object({
  ...Hip412MetadataCommonSchema,
  image: imageForHip412MetadataSchema
});
//# sourceMappingURL=hip412-metadata-schema.js.map