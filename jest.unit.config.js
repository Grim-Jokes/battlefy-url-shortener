const base = require("./jest.config")

module.exports = {
  ...base,
  testPathIgnorePatterns: ["integration.test.*"],
}