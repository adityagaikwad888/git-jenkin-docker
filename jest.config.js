module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  // Add setupFiles to run our setup script before tests
  setupFiles: ["./test/setup.js"],
};
