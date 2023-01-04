const { validator } = require('../../validator/index');
const { defaultVersion } = require('../../validator/schemas');
const validMetadata = require('./data/valid-HIP412.json');

describe("Validator function tests", () => {
  describe("Schema version tests", () => {
    test("it should not return errors for a valid metadata JSON using default schema", () => {
        // Arrange
        let metadata = JSON.parse(JSON.stringify(validMetadata));

        // Act
        const schemaProblems = validator(metadata, defaultVersion);

        // Assert
        expect(Array.isArray(schemaProblems.errors)).toBe(true);
        expect(Array.isArray(schemaProblems.warnings)).toBe(true);
        expect(schemaProblems.warnings.length).toBe(0);
        expect(schemaProblems.errors.length).toBe(0);
    });

    test("it should not return errors for a valid metadata JSON using schema version v1.0.0", () => {
        // Arrange
        let metadata = JSON.parse(JSON.stringify(validMetadata));

        // Act
        const schemaProblems = validator(metadata, "1.0.0");

        // Assert
        expect(schemaProblems.warnings.length).toBe(0);
        expect(schemaProblems.errors.length).toBe(0);
    });

    test("it should not return errors for a valid metadata JSON not passing a schema version (using default version)", () => {
        // Arrange
        let metadata = JSON.parse(JSON.stringify(validMetadata));

        // Act
        const schemaProblems = validator(metadata);

        // Assert
        expect(schemaProblems.warnings.length).toBe(0);
        expect(schemaProblems.errors.length).toBe(0);
    });
  });

  describe("Validator errors", () => {
    test("it should only return schema errors when the metadata contains schema errors and also other types of errors like attribute and localization", () => {
        // Arrange
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
        const validationResults = validator(metadata, defaultVersion);

        // Assert
        expect(validationResults.errors.length).toBe(3);
        expect(validationResults.errors[0].type).toBe("schema");
        expect(validationResults.errors[1].type).toBe("schema");
        expect(validationResults.errors[2].type).toBe("schema");
    });

    test("it should return all types of errors when there are no schema errors", () => {
        // Arrange
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
        const validationResults = validator(metadata, defaultVersion);

        // Assert
        expect(validationResults.errors.length).toBe(1);
        expect(validationResults.errors[0].type).toBe("localization");
    });

    test("it should return all types of errors even when there are additional property warnings and no schema errors", () => {
        // Arrange
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
        const validationResults = validator(metadata, defaultVersion);

        // Assert
        expect(validationResults.warnings.length).toBe(1);
        expect(validationResults.errors.length).toBe(1);
        expect(validationResults.errors[0].type).toBe("localization");
    });
  });
});
