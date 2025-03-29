module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  // Removed setupFiles since we don't have a setup.js file
};
