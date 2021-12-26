/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/", "/mocks/"],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!*.config.*",
  ],

  testEnvironment: "jest-environment-node",

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],

  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },

  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
