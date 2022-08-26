const core = require("@actions/core");
const yaml = require("js-yaml");
const { CLOUDFORMATION_SCHEMA } = require("js-yaml-cloudformation-schema");
const fs = require("fs");
const get = require("lodash.get");

async function run() {
  for (let n = 1; n <= 5; n++) {
    runNumbered(n);
  }
}

function runNumbered(n) {
  try {
    const data = fs.readFileSync(file(), "utf8");
    const obj = yaml.load(data, { schema: CLOUDFORMATION_SCHEMA });
    const getKey = key(n);
    if (getKey) {
      const result = get(obj, getKey);
      setOutput(result, n);
    }
  } catch (error) {
    fail(error);
  }
}

function key(n) {
  return process.env[`X_TEST_GET_${n}`] || core.getInput(`get${n}`);
}

function file() {
  return process.env["X_TEST_FILE"] || core.getInput("file");
}

function fail(error) {
  if (process.env.X_TEST === "true") {
    console.log(error.message);
  } else {
    core.setFailed(error.message);
  }
}

function setOutput(v, n) {
  if (process.env.X_TEST === "true") {
    let rv;
    if (typeof v === "string") {
      rv = v;
    } else if (typeof v === "undefined") {
      console.log("undefined");
      return v;
    } else {
      rv = JSON.stringify(v);
    }
    console.log(rv);
    return rv;
  } else {
    core.setOutput(`value${n}`, v);
    return v;
  }
}

run();
