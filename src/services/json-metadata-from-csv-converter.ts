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
import { dictionary } from '../utils/constants/dictionary';
import { CSVFileReader } from '../csv-file-reader';
import type { CSVRow, CSVRowAsObject } from '../types/csv.module';

const OMITTED_HEADER_COUNT = 1;

export class JsonMetadataFromCSVConverter {
  static saveCSVRowsAsJsonFiles = (metadataFromCSV: CSVRowAsObject[], folderPath: string): void => {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }

    fs.mkdirSync(folderPath, { recursive: true });

    metadataFromCSV.forEach((fileContent, index) => {
      const fileName = `${folderPath}/${index + 1}.json`;
      fs.writeFileSync(fileName, JSON.stringify(fileContent), { encoding: 'utf-8' });
    });
  };

  private static processCSVRowEntry(
    csvRowAsObject: CSVRowAsObject,
    header: string,
    cell: string,
    secondHeader: CSVRow,
    headerAttributes: string,
    headerProperties: string,
    attributes: Record<string, string>[],
    properties: Record<string, string>
  ): CSVRowAsObject {
    if (cell && header.includes(headerAttributes)) {
      attributes.push({ trait_type: secondHeader[header], value: cell });
    } else if (cell && header.includes(headerProperties)) {
      properties[secondHeader[header]] = cell;
    } else if (cell) {
      csvRowAsObject[header] = cell;
    }

    return csvRowAsObject;
  }

  static parseCSVRowsToMetadataObjects({
    csvParsedRows,
    csvFilePath,
    headerAttributes,
    headerProperties,
  }: {
    csvParsedRows: CSVRow[];
    csvFilePath: string;
    headerAttributes: string;
    headerProperties: string;
  }): CSVRowAsObject[] {
    if (csvParsedRows.length <= CSVFileReader.AMOUNT_OF_HEADERS - OMITTED_HEADER_COUNT) {
      throw new Error(dictionary.csvToJson.csvFileIsEmpty(csvFilePath));
    }

    const secondHeader = csvParsedRows[0];
    csvParsedRows.shift();

    const metadataObjectsFromCSVRows = csvParsedRows.map((csvRow): CSVRowAsObject => {
      const csvRowKeyValuesAsEntries = Object.entries(csvRow);
      const properties: Record<string, string> = {};
      const attributes: Record<string, string>[] = [];

      const result = csvRowKeyValuesAsEntries.reduce<CSVRowAsObject>((currentMetadataObject, [header, cell]) => {
        return this.processCSVRowEntry(
          currentMetadataObject,
          header,
          cell,
          secondHeader,
          headerAttributes,
          headerProperties,
          attributes,
          properties
        );
      }, {});

      if (Object.keys(properties).length) {
        result.properties = properties;
      }

      if (attributes.length) {
        result.attributes = attributes;
      }

      return result;
    });

    return metadataObjectsFromCSVRows;
  }
}
