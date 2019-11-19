# Jest Reporter for GitHub Actions

A custom Jest reporter to create annotations when run via GitHub Actions. 

![](https://github.com/cschleiden/jest-github-actions-reporter/blob/master/img/annotations.png)


## Usage

All you have to do to get annotations in your GitHub Actions runs is to add the reporter your Jest configuration.

1. Install `npm install -D jest-github-actions-reporter`
2. Add to your configuration `jest.config.js`:
```js
module.exports = {
  reporters: [
    "default",
    "jest-github-actions-reporter"
  ],
  testLocationInResults: true
};
```

alternatively you can only add it during your CI build:

`package.json`
```json
{
    ...
    "scripts": {
        "citest": "CI=true jest --reporters=default --reporters=jest-github-actions-reporter"
    }
}
```

nothing else is required, no token sharing, no REST API calls etc. 

## How does this work?

GitHub Actions supports a number of commands that allow you to provide rich experiences without custom REST API calls etc. See the [docs](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/development-tools-for-github-actions#set-an-error-message-error) for more information.