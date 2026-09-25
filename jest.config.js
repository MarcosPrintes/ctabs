const dotenv = require("dotenv");

// require("dotenv").config({
//   path: path.resolve(__dirname, ".env"),
// });
dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  //  setupFiles: ["dotenv/config"],
});

module.exports = jestConfig;
