const base = require("./jest.config")

module.exports = {
  ...base,
  testMatch: ["**/*.integration.test.ts"],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup/timeout.js',
    '<rootDir>/test/setup/db.js',
  ]

};
