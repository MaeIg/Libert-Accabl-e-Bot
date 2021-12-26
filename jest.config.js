/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/mocks/"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!*.config.*",
  ],

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],

  testEnvironment: "jest-environment-node",

  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },

  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  verbose: true,
};
