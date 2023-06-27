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
const { Validator, defaultSchemaVersion } = require('../../validator');
import validMetadata from "./data/valid-HIP412";

describe("Validator function tests", () => {
  describe("Schema version tests", () => {
    test("it should not return errors for a valid metadata JSON using default schema", () => {
        // Arrange
        const validator = new Validator();
        let metadata = JSON.parse(JSON.stringify(validMetadata));

        // Act
        const schemaProblems = validator.validate(metadata, defaultSchemaVersion);

        // Assert
        expect(Array.isArray(schemaProblems.errors)).toBe(true);
        expect(Array.isArray(schemaProblems.warnings)).toBe(true);
        expect(schemaProblems.warnings.length).toBe(0);
        expect(schemaProblems.errors.length).toBe(0);
    });

    test("it should not return errors for a valid metadata JSON using schema version v1.0.0", () => {
        // Arrange
        const validator = new Validator();
        let metadata = JSON.parse(JSON.stringify(validMetadata));

        // Act
        const schemaProblems = validator.validate(metadata, "1.0.0");

        // Assert
        expect(schemaProblems.warnings.length).toBe(0);
        expect(schemaProblems.errors.length).toBe(0);
    });

    test("it should not return errors for a valid metadata JSON not passing a schema version (using default version)", () => {
        // Arrange
        const validator = new Validator();
        let metadata = JSON.parse(JSON.stringify(validMetadata));

        // Act
        const schemaProblems = validator.validate(metadata);

        // Assert
        expect(schemaProblems.warnings.length).toBe(0);
        expect(schemaProblems.errors.length).toBe(0);
    });
  });

  describe("Schema package tests", () => {
    test("it should return a schema object for a valid version in the schema map", () => {
      // Arrange
      const validator = new Validator();
      const version = defaultSchemaVersion;
  
      // Act
      const schema = validator.getSchema(version);
  
      // Assert
      expect(typeof schema).toBe("object");
      expect(schema.version).toBe(defaultSchemaVersion);
    });
  
    test("it should return the default schema object for an unsupported version in the schema map", () => {
      // Arrange
      const validator = new Validator();
      const version = "2.5.10"; // Unsupported version
  
      // Act
      const schema = validator.getSchema(version);
  
      // Assert
      expect(typeof schema).toBe("object");
      expect(schema.version).toBe(defaultSchemaVersion);
    });
  
    test("it should return the default schema object for an unsupported value as version", () => {
      // Arrange
      const validator = new Validator();
      const version = 'notaschema'; // Unsupported version
  
      // Act
      const schema = validator.getSchema(version);
  
      // Assert
      expect(typeof schema).toBe("object");
      expect(schema.version).toBe(defaultSchemaVersion);
    });
  });

  describe("Validator errors", () => {
    test("it should only return schema errors when the metadata contains schema errors and also other types of errors like attribute and localization", () => {
        // Arrange
        const validator = new Validator();
        let metadataCopy = JSON.parse(JSON.stringify(validMetadata));
        let metadata = { 
            // missing name, image, and type for HIP412@1.0.0
            description: metadataCopy.description,
            attributes: metadataCopy.attributes, 
            localization: {
                uri: "ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/{locale}.json",
                default: "en",
                locales: ["es", "fr", "en"] // error: default locale should not be included in locales array
            }
        }

        // Act
        const validationResults = validator.validate(metadata, defaultSchemaVersion);

        // Assert
        expect(validationResults.errors.length).toBe(3);
        expect(validationResults.errors[0].type).toBe("schema");
        expect(validationResults.errors[1].type).toBe("schema");
        expect(validationResults.errors[2].type).toBe("schema");
    });

    test("it should return all types of errors when there are no schema errors", () => {
        // Arrange
        const validator = new Validator();
        let metadataCopy = JSON.parse(JSON.stringify(validMetadata));
        let metadata = {
            name: "myname",
            image: "ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2344.png",
            type: "image/png",
            description: metadataCopy.description,
            attributes: metadataCopy.attributes, 
            localization: {
                uri: "ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/{locale}.json",
                default: "en",
                locales: ["es", "fr", "en"] // error: default locale should not be included in locales array
            }
        }

        // Act
        const validationResults = validator.validate(metadata, defaultSchemaVersion);

        // Assert
        expect(validationResults.errors.length).toBe(1);
        expect(validationResults.errors[0].type).toBe("localization");
    });

    test("it should return all types of errors even when there are additional property warnings and no schema errors", () => {
        // Arrange
        const validator = new Validator();
        let metadataCopy = JSON.parse(JSON.stringify(validMetadata));
        let metadata = {
            name: "myname",
            image: "ipfs://QmaHVnnp7qAmGADa3tQfWVNxxZDRmTL5r6jKrAo16mSd5y/2344.png",
            type: "image/png",
            description: metadataCopy.description,
            attributes: [{ checksum: "randomvalue", trait_type: "Fur", value: "Gold" }], 
            localization: {
                uri: "ipfs://QmWS1VAdMD353A6SDk9wNyvkT14kyCiZrNDYAad4w1tKqT/{locale}.json",
                default: "en",
                locales: ["es", "fr", "en"] // error: default locale should not be included in locales array
            }
        }

        // Act
        const validationResults = validator.validate(metadata, defaultSchemaVersion);

        // Assert
        expect(validationResults.warnings.length).toBe(1);
        expect(validationResults.errors.length).toBe(1);
        expect(validationResults.errors[0].type).toBe("localization");
    });
  });
});
