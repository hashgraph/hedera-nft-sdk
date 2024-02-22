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
import fs from 'fs';
import filter from 'lodash/filter';
import isNull from 'lodash/isNull';
import map from 'lodash/map';
import { BufferFile } from '../types/buffer-file.module';
import { dictionary } from '../utils/constants/dictionary';
import { errorToMessage } from '../helpers/error-to-message';
import { NFTMetadata } from '../types/nft-metadata.module';
import { FileStorage } from '../types/file-storage-service';

export type FileStorageURL = `https://${string}/`;
export type FileStorageUploadUrl = string;
type UploadServiceReturn = {
  content: Blob | BufferFile;
  url: string;
};

const nonEmptyFiles = (file: Blob | BufferFile): boolean => {
  return file instanceof Blob ? file.size > 0 : !file.isFileEmpty;
};

export class UploadService {
  private service: FileStorage;

  constructor(service: FileStorage) {
    this.service = service;
  }

  public async uploadFilesFromPath(paths: string[]): Promise<UploadServiceReturn[]> {
    const result = await Promise.all(
      paths.map(async (path) => {
        const isDirectory = fs.lstatSync(path).isDirectory();
        let files: string[] = [];

        if (isDirectory) {
          files = fs.readdirSync(path).map((file) => `${path}/${file}`);
        } else {
          files = [path];
        }

        if (files.length < 0) {
          throw new Error(dictionary.errors.uploadService.noFiles);
        }

        try {
          return await Promise.all(
            map(
              filter(files, (file) => fs.existsSync(file)),
              async (file) => {
                const fileContent = fs.readFileSync(file);
                const blob = new Blob([fileContent]);
                const url = await this.service.uploadFile(blob);

                return {
                  content: blob,
                  url,
                };
              }
            )
          );
        } catch (e) {
          throw new Error(errorToMessage(e));
        }
      })
    );

    return result.flat();
  }

  public async uploadBlobFiles(files: (Blob | BufferFile)[]): Promise<UploadServiceReturn[]> {
    if (files.length < 0) {
      throw new Error(dictionary.errors.uploadService.noFiles);
    }

    try {
      return await Promise.all(
        map(filter(files, nonEmptyFiles), async (file) => {
          let fileToUpload: Blob | null = null;

          if (file instanceof Blob) {
            fileToUpload = file;
          } else {
            const fileContent = fs.readFileSync(file.filePath);

            fileToUpload = new Blob([fileContent]);
          }

          const url = await this.service.uploadFile(fileToUpload);

          return {
            content: file,
            url,
          };
        })
      );
    } catch (e) {
      const errorMessage = errorToMessage(e);

      throw new Error(errorMessage);
    }
  }

  public async handleBlobUpload(metadata: Partial<NFTMetadata> | NFTMetadata): Promise<UploadServiceReturn | null> {
    if (!metadata) {
      throw new Error(dictionary.errors.uploadService.noMetadata);
    }

    try {
      const file = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const url = await this.service.uploadFile(file);

      return {
        content: file,
        url,
      };
    } catch (e) {
      const errorMessage = errorToMessage(e);

      throw new Error(errorMessage);
    }
  }

  public async uploadMetadataList(metadatas: NFTMetadata[]): Promise<UploadServiceReturn[]> {
    const metadataUris = await Promise.all(map(metadatas, async (metadata) => this.handleBlobUpload(metadata)));

    return filter(metadataUris, (metadataUri): metadataUri is UploadServiceReturn => !isNull(metadataUri));
  }
}
