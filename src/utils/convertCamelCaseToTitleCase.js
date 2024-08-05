export default function convertCamelCaseToTitleCase(camelCaseString) {
    return camelCaseString
      .replace(/([A-Z])/g, ' $1')   // Insert a space before each uppercase letter
      .replace(/^./, str => str.toUpperCase());  // Capitalize the first letter of the string
  }