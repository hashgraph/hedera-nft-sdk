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
import { noPropertiesErrorOptions, validateObjectWithSchema } from '../../helpers/validate-object-with-schema';
import type { BufferFile } from '../../types/buffer-file.module';
import type { Directory } from '../../types/directory.module';
import type { CSVRowAsObject } from '../../types/csv.module';
import type { NFTMetadata } from '../../types/nft-metadata.module';
import { Hip412MetadataCSVSchema } from '../validation-schemas/hip412-metadata-schema';
import isString from 'lodash/isString';
import omit from 'lodash/omitBy';
import isNil from 'lodash/isNil';

interface UploadedFile<T> {
  bufferFile: BufferFile;
  uploadData: T | null;
}
export class Hip412Metadata implements Partial<NFTMetadata> {
  public name;
  public creator;
  public creatorDID;
  public description;
  public image;
  public type;
  public files;
  public format;
  public properties;
  public attributes;
  public localization;
  public directory: Directory | null = null;
  public metadataUri: string | null = null;
  public previewImageFromDirectory: UploadedFile<string> | null = null;

  constructor(props: Partial<NFTMetadata> | string) {
    if (isString(props)) {
      this.metadataUri = props;
      return;
    }

    this.name = props.name;
    this.creator = props.creator;
    this.creatorDID = props.creatorDID;
    this.description = props.description;
    this.image = props.image;
    this.type = props.type;
    this.format = props?.format ?? 'HIP412@2.0.0';
    this.files = props.files;
    this.properties = props.properties;
    this.attributes = props.attributes;
    this.localization = props.localization;
  }

  public toObject(): Partial<NFTMetadata> {
    return omit(
      {
        name: this.name,
        image: this.image,
        description: this.description,
        creator: this.creator,
        creatorDID: this.creatorDID,
        type: this.type,
        format: this.format,
        files: this.files,
        attributes: this.attributes,
        properties: this.properties,
        localization: this.localization,
      },
      isNil
    );
  }

  static validateMetadataFromCSV(metadata: Partial<CSVRowAsObject>): boolean {
    validateObjectWithSchema(Hip412MetadataCSVSchema, metadata, noPropertiesErrorOptions);
    return true;
  }
}
