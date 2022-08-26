const process = require("process");
const cp = require("child_process");
const path = require("path");

beforeEach(() => {
  process.env.X_TEST = "true";
  process.env.X_TEST_FILE = "./test.yaml";
  process.env.X_TEST_GET_1 = undefined;
  process.env.X_TEST_GET_2 = undefined;
  process.env.X_TEST_GET_3 = undefined;
  process.env.X_TEST_GET_4 = undefined;
  process.env.X_TEST_GET_5 = undefined;
});

test("runs as expected with known value", () => {
  process.env.X_TEST_GET_1 = "Parameters.XData1.Default";
  expect(getResult()).toBe(
    "x-data-1\nundefined\nundefined\nundefined\nundefined\n"
  );
});

test("runs as expected with known values", () => {
  process.env.X_TEST_GET_1 = "Parameters.XData1.Default";
  process.env.X_TEST_GET_2 = "Parameters.XData2.Default";
  expect(getResult()).toBe(
    "x-data-1\nx-data-2\nundefined\nundefined\nundefined\n"
  );
});

test("returns undefined for non-matching paths", () => {
  process.env.X_TEST_GET_1 = "Not.Found.Here";
  expect(getResult()).toBe(
    "undefined\nundefined\nundefined\nundefined\nundefined\n"
  );
});

test("handles errors gracefully", () => {
  process.env.X_TEST_GET_1 = "$*&^%$#@";
  expect(getResult()).toBe(
    "undefined\nundefined\nundefined\nundefined\nundefined\n"
  );
});

function getResult() {
  const ip = path.join(__dirname, "index.js");
  return cp.execSync(`node ${ip}`, { env: process.env }).toString();
}
