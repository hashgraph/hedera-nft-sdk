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
