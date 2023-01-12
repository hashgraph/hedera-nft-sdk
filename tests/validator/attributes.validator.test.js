const { attributesValidator } = require("../../validator/validators/attributes");
const validMetadata = require("./data/valid-HIP412.json");

describe("Attributes validator tests", () => {
  test("it should return an empty array when passing a correct schema", () => {
    // Arrange
    let metadata = validMetadata;

    // Act
    const errors = attributesValidator(metadata);

    // Assert
    expect(Array.isArray(errors)).toBe(true);
    expect(errors.length).toBe(0);
  });

  describe("Boost display type tests", () => {
    test("it should not return an error for a correct `display_type=boost`", () => {
      // Arrange
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        { trait_type: "Background", display_type: "boost", value: 100 },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });

    test("it should return an error for wrong type for `display_type=boost`", () => {
      // Arrange
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        { trait_type: "Background", display_type: "boost", value: "Yellow" },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe(
        "Trait Background of type 'boost' requires number, found string"
      );
      expect(errors[0].type).toBe("attribute");
    });
  });

  describe("Percentage display type tests", () => {
    test("it should not return an error for a correct `display_type=percentage`", () => {
      // Arrange
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        { trait_type: "Background", display_type: "percentage", value: 100 },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });

    test("it should return an error for wrong type for `display_type=percentage`", () => {
      // Arrange
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        { trait_type: "Background", display_type: "percentage", value: "101" },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe(
        "Trait Background of type 'percentage' requires number, found string"
      );
      expect(errors[0].type).toBe("attribute");
    });

    test("it should return an error for wrong value for `display_type=percentage`", () => {
      // Arrange
      // Metatadata with percentage being higher than 100
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        { trait_type: "Background", display_type: "percentage", value: 101 },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe(
        "Trait Background of type 'percentage' must be between [0-100], found 101"
      );
      expect(errors[0].type).toBe("attribute");
    });
  });

  describe("Color display type tests", () => {
    test("it should not return an error for a correct `display_type=color`", () => {
      // Arrange
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        {
          trait_type: "Background",
          display_type: "color",
          value: "rgb(101,50,1)",
        },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });

    test("it should return an error for wrong format RGB values of `display_type=color`", () => {
      // Arrange
      // Metadata error: RGB value has an extra space
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        {
          trait_type: "Background",
          display_type: "color",
          value: "rgb (101,50,1)",
        },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe(
        "Trait Background of type 'color' requires format 'rgb(number,number,number)'"
      );
      expect(errors[0].type).toBe("attribute");
    });

    test("it should return an error for wrong RGB number for `display_type=color`", () => {
      // Arrange
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        {
          trait_type: "Background",
          display_type: "color",
          value: "rgb(101,256,1)",
        },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(1);
      expect(errors[0].msg).toBe(
        "Trait Background of type 'color' requires RGB values between [0-255], got value: 256"
      );
      expect(errors[0].type).toBe("attribute");
    });
  });

  describe("Datetime and date display type tests", () => {
    test("it should not return an error for a correct `display_type=datetime` or `display_type=date`", () => {
      // Arrange
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        {
          trait_type: "Background",
          display_type: "datetime",
          value: 732844800,
        },
        { trait_type: "Background", display_type: "date", value: 732844800 },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(0);
    });

    test("it should return an error for wrong type for `display_type=datetime` or `display_type=date`", () => {
      // Arrange
      // Metatadata with percentage being of type string
      let metadata = JSON.parse(JSON.stringify(validMetadata));
      metadata.attributes = [
        {
          trait_type: "Background",
          display_type: "datetime",
          value: "732844800",
        },
        { trait_type: "Background", display_type: "date", value: "732844800" },
      ];

      // Act
      const errors = attributesValidator(metadata);

      // Assert
      expect(Array.isArray(errors)).toBe(true);
      expect(errors.length).toBe(2);
      expect(errors[0].msg).toBe(
        "Trait Background of type 'datetime' requires integer value, got type: string"
      );
      expect(errors[0].type).toBe("attribute");
      expect(errors[1].msg).toBe(
        "Trait Background of type 'date' requires integer value, got type: string"
      );
      expect(errors[1].type).toBe("attribute");
    });
  });
});
