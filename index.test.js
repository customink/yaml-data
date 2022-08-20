const process = require("process");
const cp = require("child_process");
const path = require("path");

beforeEach(() => {
  process.env.X_TEST = "true";
  process.env.X_TEST_FILE = "./test.yaml";
});

test("runs as expected with known value", () => {
  process.env.X_TEST_GET = "Parameters.XDataName.Default";
  expect(getResult()).toBe("x-data-value");
});

test("returns undefined for non-matching paths", () => {
  process.env.X_TEST_GET = "Not.Found.Here";
  expect(getResult()).toBe("undefined");
});

test("handles errors gracefully", () => {
  process.env.X_TEST_GET = "$*&^%$#@";
  expect(getResult()).toBe("undefined");
});

function getResult() {
  const ip = path.join(__dirname, "index.js");
  return cp.execSync(`node ${ip}`, { env: process.env }).toString();
}
