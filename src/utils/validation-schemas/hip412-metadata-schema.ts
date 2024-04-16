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
import { isImageFile } from '../../helpers/is-image-file';
import type { BufferFile } from '../../types/buffer-file';
import isString from 'lodash/isString';
import { type ZodTypeAny, z } from 'zod';
import { dictionary } from '../constants/dictionary';
import { KNOWN_IMAGE_MIME_TYPES } from '../constants/mime-types-and-extensions';

const AttributeSchema = z.object({
  trait_type: z.string(),
  display_type: z.string().optional(),
  value: z.union([z.string().min(1), z.number(), z.boolean()]),
  max_value: z.union([z.string(), z.number()]).optional(),
});

const LocalizationSchema = z.object({
  uri: z.string(),
  default: z.string(),
  locales: z.array(z.string()),
});

const FileSchema = z.object({
  uri: z.string(),
  type: z.string().refine((value) => KNOWN_IMAGE_MIME_TYPES.some((knownType) => value.startsWith(knownType)), {
    message: dictionary.validation.unsupportedImageMimeType,
  }),
  metadata: recursiveSchema().optional(),
  checksum: z.string().optional(),
  is_default_file: z.boolean().optional(),
  metadata_uri: z.string().optional(),
});

export const Hip412MetadataCommonSchema = {
  name: z.string().min(1),
  description: z.string().optional(),
  creator: z.string().optional(),
  creatorDID: z.string().optional(),
  checksum: z.string().optional(),
  type: z.string().refine((value) => KNOWN_IMAGE_MIME_TYPES.some((knownType) => value.startsWith(knownType)), {
    message: dictionary.validation.unsupportedImageMimeType,
  }),
  files: z.array(FileSchema).optional(),
  format: z.optional(z.string()),
  properties: z.record(z.unknown()).optional(),
  attributes: z.array(AttributeSchema).optional(),
  localization: LocalizationSchema.optional(),
};

export const imageForHip412MetadataSchema = z.custom<string | BufferFile | undefined>().superRefine((value, ctx) => {
  if (!value || (isString(value) && !value.length)) {
    ctx.addIssue({
      fatal: true,
      code: z.ZodIssueCode.custom,
      message: dictionary.validation.imageForNftNotFound,
    });
    return false;
  }

  if (!isString(value) && value.filePath && !isImageFile(value.name, value.mimeType)) {
    ctx.addIssue({
      fatal: true,
      code: z.ZodIssueCode.custom,
      message: dictionary.validation.mediaFileNotSupported,
    });
    return false;
  }

  return true;
});

function recursiveSchema(): ZodTypeAny {
  return z.lazy(() => z.object(Hip412MetadataCommonSchema));
}

export const Hip412MetadataSchema = z.object({
  ...Hip412MetadataCommonSchema,
  image: imageForHip412MetadataSchema,
});
