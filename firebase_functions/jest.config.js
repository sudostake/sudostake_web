/* eslint-disable @typescript-eslint/no-var-requires */
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg,
    },
    testMatch: ["<rootDir>/src/tests/*.ts"],
    moduleDirectories: ["node_modules", "src"],
};
