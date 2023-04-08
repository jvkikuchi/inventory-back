const config = require("./jest.config.ts");

module.exports = {
  ...config,
  roots: ["<rootDir>/__tests__"],
};
