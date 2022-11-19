/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  testRegex: "^.*(\\.|/)test.tsx?$",
  fakeTimers: {
    enableGlobally: true,
    legacyFakeTimers: true,
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect", "@testing-library/jest-dom/matchers"],
  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
}
