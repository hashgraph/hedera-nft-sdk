const { schemaValidator } = require('../../validator/validators/schema');
const { getSchema, defaultVersion } = require('../../validator/schemas');
const validMetadata = require('./data/valid-HIP412.json');

describe("Schema validator tests", () => {
  test("it should not return errors or warnings for a correct JSON schema", () => {
    // Arrange
    const schema = getSchema(defaultVersion);

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
    const schema = getSchema(defaultVersion);

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
    const schema = getSchema(defaultVersion);

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
