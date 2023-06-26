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
const { Validator, defaultSchemaVersion } = require('../../validator/index');
const { schemaValidator } = require('../../validator/validators/schema');
import validMetadata from "./data/valid-HIP412";

describe("Schema validator tests", () => {
  test("it should not return errors or warnings for a correct JSON schema", () => {
    // Arrange
    const validator = new Validator();
    const schema = validator.getSchema(defaultSchemaVersion);

    let metadata = JSON.parse(JSON.stringify(validMetadata));

    // Act
    const schemaProblems = schemaValidator(metadata, schema);

    // Assert
    expect(Array.isArray(schemaProblems.errors)).toBe(true);
    expect(Array.isArray(schemaProblems.warnings)).toBe(true);
    expect(schemaProblems.warnings.length).toBe(0);
    expect(schemaProblems.errors.length).toBe(0);
  });

  test("it should return validation warnings when adding additional properties to the attribute field", () => {
    // Arrange
    const validator = new Validator();
    const schema = validator.getSchema(defaultSchemaVersion);

    let metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.attributes = [
      { checksum: "randomchecksum", trait_type: "Background", value: "Yellow" },
      { checksum: "randomchecksum", trait_type: "Fur", value: "Gold" }
    ];

    // Act
    const schemaProblems = schemaValidator(metadata, schema);

    // Assert
    expect(schemaProblems.warnings.length).toBe(2);
    expect(schemaProblems.errors.length).toBe(0);
    expect(schemaProblems.warnings[0].type).toBe("schema");
    expect(schemaProblems.warnings[0].msg).toBe("is not allowed to have the additional property 'checksum'");
    expect(schemaProblems.warnings[0].path).toBe("instance.attributes[0]");
  });

  test("it should return validation errors when not providing required properties for the attributes field", () => {
    // Arrange
    const validator = new Validator();
    const schema = validator.getSchema(defaultSchemaVersion);

    let metadata = JSON.parse(JSON.stringify(validMetadata));
    metadata.attributes = [
      { trait_type: "Background" } // no value property
    ]

    // Act
    const schemaProblems = schemaValidator(metadata, schema);

    // Assert
    expect(schemaProblems.warnings.length).toBe(0);
    expect(schemaProblems.errors.length).toBe(1);
    expect(schemaProblems.errors[0].type).toBe("schema");
    expect(schemaProblems.errors[0].msg).toBe("requires property 'value'");
    expect(schemaProblems.errors[0].path).toBe("instance.attributes[0]");
  });
});
