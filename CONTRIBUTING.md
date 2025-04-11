# Contributing

Before contributing to this repository make sure to discuss first the intended changes either by creating a new issue and commenting an existing one.

## Useful commands

Once the repository has been cloned you can run the following commands from the root directory.

```sh
$ yarn install       # install project dependencies
$ yarn test          # run test
```

## Submitting code

Any code change should be submitted as a pull request. The description should explain what the code does and give steps to execute it. The pull request should also contain tests.

## Review process

The bigger the pull request, the longer it will take to review and merge. Try to break down large pull requests in smaller chunks that are easier to review and merge. Also make sure to reference the related issues in the pull request message if any.

## Eslint versions

Salesforce currently supports both ESLint v8 and v9. All new rules must be written in both versions. The `master` branch is on ESLint v9, while ESLint v8 rules are maintained in the `eslint-v8` branch.
