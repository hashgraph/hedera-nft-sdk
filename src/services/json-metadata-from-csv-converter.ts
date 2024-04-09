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
import type { CSVRow, MetadataObject } from '../types/csv';

function processCSVRowEntry(
  metadataObject: MetadataObject,
  header: string,
  cell: string,
  secondHeader: CSVRow,
  headerAttributes: string,
  headerProperties: string,
  attributes: Record<string, string>[],
  properties: Record<string, string>
): MetadataObject {
  if (cell && header.includes(headerAttributes)) {
    attributes.push({ trait_type: secondHeader[header], value: cell });
  } else if (cell && header.includes(headerProperties)) {
    properties[secondHeader[header]] = cell;
  } else if (cell) {
    metadataObject[header] = cell;
  }

  return metadataObject;
}

export function parseCSVRowsToMetadataObjects({
  csvParsedRows,
  headerAttributes,
  headerProperties,
}: {
  csvParsedRows: CSVRow[];
  headerAttributes: string;
  headerProperties: string;
}): MetadataObject[] {
  const secondHeader = csvParsedRows[0];
  csvParsedRows.shift();

  const metadataObjectsFromCSVRows = csvParsedRows.map((csvRow): MetadataObject => {
    const csvRowKeyValuesAsEntries = Object.entries(csvRow);
    const properties: Record<string, string> = {};
    const attributes: Record<string, string>[] = [];

    const result = csvRowKeyValuesAsEntries.reduce<MetadataObject>((currentMetadataObject, [header, cell]) => {
      return processCSVRowEntry(
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
