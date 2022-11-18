/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  testRegex: "^.*(\\.|/)test.tsx?$",
  fakeTimers: {
    enableGlobally: true,
    legacyFakeTimers: true,
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
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
