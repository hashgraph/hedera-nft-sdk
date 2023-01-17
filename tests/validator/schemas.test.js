/*-
 *
 * Hedera NFT Utilities
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
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
const { getSchema, defaultVersion } = require("../../validator/schemas");

describe("Schema package tests", () => {
  test("it should return a schema object for a valid version in the schema map", () => {
    // Arrange
    const version = defaultVersion;

    // Act
    const schema = getSchema(version);

    // Assert
    expect(typeof schema).toBe("object");
    expect(schema.version).toBe(defaultVersion);
  });

  test("it should return the default schema object for an unsupported version in the schema map", () => {
    // Arrange
    const version = "2.5.10"; // Unsupported version

    // Act
    const schema = getSchema(version);

    // Assert
    expect(typeof schema).toBe("object");
    expect(schema.version).toBe(defaultVersion);
  });

  test("it should return the default schema object for an unsupported value as version", () => {
    // Arrange
    const version = []; // Unsupported version (should be string)

    // Act
    const schema = getSchema(version);

    // Assert
    expect(typeof schema).toBe("object");
    expect(schema.version).toBe(defaultVersion);
  });
});
