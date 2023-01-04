/**
 * The attributes validator applies specific rules for attribute objects
 * such as validating the values for different display types.
 * If the "attributes" property is not present (optional field), no errors are returned.
 * 
 * @see https://github.com/hashgraph/hedera-improvement-proposal/blob/main/HIP/hip-412.md#attributesdisplay_type
 * 
 * @param {Object} instance - The JSON object to validate against a schema
 * @returns {Array} - Contains no, one, or multiple error objects that describe errors for the validated {instance}
 */
const attributesValidator = (instance) => {
  const attributes = instance.attributes;
  const errors = [];
  const matchRGBColors = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/; // Match string "rgb(102,250,1)" and variations

  if (!attributes) return errors; // attributes is an optional field

  attributes.map((attribute) => {
    // Boost must be number value
    if (
      attribute.display_type === "boost" &&
      typeof attribute.value !== "number"
    ) {
      errors.push({
        type: "attribute",
        msg: `Trait ${
          attribute.trait_type
        } of type 'boost' requires number, found ${typeof attribute.value}`
      });
    }

    // Percentage between [0-100]
    if (attribute.display_type === "percentage") {
      if (typeof attribute.value !== "number") {
        errors.push({
          type: "attribute",
          msg: `Trait ${
            attribute.trait_type
          } of type 'percentage' requires number, found ${typeof attribute.value}`
        });
      } else if (attribute.value < 0 || attribute.value > 100) {
        errors.push({
          type: "attribute",
          msg: `Trait ${attribute.trait_type} of type 'percentage' must be between [0-100], found ${attribute.value}`
        });
      }
    }

    // Check for RGB format and values between[0-255]
    if (attribute.display_type === "color") {
      if (matchRGBColors.exec(attribute.value) === null) {
        // format validation
        errors.push({
          type: "attribute",
          msg: `Trait ${attribute.trait_type} of type 'color' requires format 'rgb(number,number,number)'`
        });
      } else {
        // value validation range [0-255]
        const RGBValues = attribute.value.match(/\d+/g);
        RGBValues.map((rgbVal) => {
          if (rgbVal < 0 || rgbVal > 255) {
            errors.push({
              type: "attribute",
              msg: `Trait ${attribute.trait_type} of type 'color' requires RGB values between [0-255], got value: ${rgbVal}`
            });
          }
        });
      }
    }

    // Check datetime format: should be integer e.g. 732844800
    if (
      (attribute.display_type === "datetime" || attribute.display_type === "date") 
      && !Number.isInteger(attribute.value)
    ) {
      errors.push({
        type: "attribute",
        msg: `Trait ${
          attribute.trait_type
        } of type '${attribute.display_type}' requires integer value, got type: ${typeof attribute.value}`
      });
    }
  });

  return errors;
};

module.exports = {
  attributesValidator
};
