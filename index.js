const core = require("@actions/core");
const yaml = require("js-yaml");
const { CLOUDFORMATION_SCHEMA } = require("js-yaml-cloudformation-schema");
const fs = require("fs");
const get = require("lodash.get");

async function run() {
  try {
    const data = fs.readFileSync(file(), "utf8");
    const obj = yaml.load(data, { schema: CLOUDFORMATION_SCHEMA });
    const result = get(obj, key());
    return returnValue(result);
  } catch (error) {
    fail(error);
  }
}

function key() {
  return process.env["X_TEST_GET"] || core.getInput("get");
}

function file() {
  return process.env["X_TEST_FILE"] || core.getInput("file");
}

function fail(error) {
  if (process.env.X_TEST === "true") {
    process.stdout.write(error.message);
  } else {
    core.setFailed(error.message);
  }
}

function returnValue(v) {
  if (process.env.X_TEST === "true") {
    let rv;
    if (typeof v === "string") {
      rv = v;
    } else if (typeof v === "undefined") {
      process.stdout.write("undefined");
      return v;
    } else {
      rv = JSON.stringify(v);
    }
    process.stdout.write(rv);
    return rv;
  } else {
    core.setOutput("value", v);
    return v;
  }
}

run();
