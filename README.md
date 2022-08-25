# YAML Data Action

Safely read CloudFormation YAML data. Uses `lodash.get` (https://www.npmjs.com/package/lodash.get) for the `get` input. The value is in the `value` output.

## Usage

```yaml
- name: Get Data
  uses: customink/yaml-data@main
  id: mydata
  with:
    file: somefile.yaml
    get: obj.path
- name: Use Output
  run: |
    value="${{ steps.mydata.outputs.value }}"
    echo "Found value: ${value}"
```

## Development

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
npm test
```

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)


See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
