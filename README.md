# @salesforce/eslint-config-lwc

> Opinionated ESLint configurations for Lightning Web Components (LWC) projects.

## Installation

```sh
npm install --save-dev @salesforce/eslint-config-lwc @lwc/eslint-plugin-lwc @salesforce/eslint-plugin-lightning eslint-plugin-import eslint-plugin-jest
```

Note that `@lwc/eslint-plugin-lwc`, `@salesforce/eslint-plugin-lightning`, `eslint-plugin-import`, and `eslint-plugin-jest` are peer dependencies of `@salesforce/eslint-config-lwc`.

## Usage

Add the appropriate [configuration](#Configurations) to the `extends` field in your configuration.

Example of `.eslintrc`:

```json
{
    "extends": ["@salesforce/eslint-config-lwc/recommended"]
}
```

For more details about configuration, please refer to the dedicated section in the ESLint documentation: https://eslint.org/docs/user-guide/configuring#using-a-shareable-configuration-package

### [Experimental] Usage with TypeScript

To enable working with TypeScript projects, install `@babel/preset-typescript` as a dependency, and extend any of the TypeScript-enabled [configurations](#configurations) (any config ending in `-ts`).

Note that these configs use [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser), and compatibility with [@typescript-eslint/parser](https://npmjs.com/package/@typescript-eslint/parser) is not guaranteed.

> [!IMPORTANT]
> While these configs are capable of parsing TypeScript files, not all rules support all TypeScript language features. For example, using type assertions (`variable as Type`) will break many rules.

Example `.eslintrc`:

```json
{
    "extends": ["@salesforce/eslint-config-lwc/recommended-ts"]
}
```

## Configurations

This package exposes multiple configurations for your usage. Each configuration listed below is available for both JavaScript projects and TypeScript projects (when using `-ts` suffix).

### `@salesforce/eslint-config-lwc/base`

**Goal:**
Prevent common pitfalls with LWC, and enforce other Salesforce platform restrictions.

**Rules:**
[_LWC specific rules_](https://github.com/salesforce/eslint-plugin-lwc/blob/master/README.md#lwc) only.

**TypeScript:** Use `@salesforce/eslint-config-lwc/base-ts` to use this config in TypeScript projects.

### `@salesforce/eslint-config-lwc/recommended`

**Goal:**
Prevent common Javascript pitfalls and enforce all best practices.

**Rules:**
`@salesforce/eslint-config-lwc/base` rules + Most of the base [_Potential errors_](https://eslint.org/docs/rules/#possible-errors) rules + Some of the [_Best Practices_](https://eslint.org/docs/rules/#best-practices) rules + [_LWC Best Practices_](https://github.com/salesforce/eslint-plugin-lwc/blob/master/README.md#best-practices).

**TypeScript:** Use `@salesforce/eslint-config-lwc/recommended-ts` to use this config in TypeScript projects.

### `@salesforce/eslint-config-lwc/extended`

**Goal:**
Restrict usage of some Javascript language features known to be slow after the _COMPAT_ transformation. LWC runs in _COMPAT_ mode on older browsers (eg. IE11). To support new Javascript syntax and language features on older browser the LWC compiler transforms LWC modules. This linting configuration targets patterns known to be slow in _COMPAT_ mode.

**Rules:**
`@salesforce/eslint-config-lwc/recommended` rules + restrict usage of some slow patterns in [_COMPAT_](https://github.com/salesforce/eslint-plugin-lwc/blob/master/README.md#compat-performance).

**TypeScript:** Use `@salesforce/eslint-config-lwc/extended-ts` to use this config in TypeScript projects.

### `@salesforce/eslint-config-lwc/i18n`

**Goal:**
Promote usage of `@salesforce/i18n-service` over 3rd parties, promote internationalization (I18N) best practices.

**Rules:**
[_I18N specific rules_](https://github.com/salesforce/eslint-plugin-lightning#internationalization-rules) only.

**Usage:**

Add the `i18n` configuration to the `extends` field in your `.eslintrc` configuration file, for example:

```json
{
    "extends": ["@salesforce/eslint-config-lwc/recommended", "@salesforce/eslint-config-lwc/i18n"]
}
```

**TypeScript:** Use `@salesforce/eslint-config-lwc/i18n-ts` to use this config in TypeScript projects.

### `@salesforce/eslint-config-lwc/ssr`

**Goal:**
Promote writing server-side-rendering friendly components. We only recommend using this configuration if your components are running in experiences supporting LWC server-side-rendering.

**Rules:**
[ SSR specific rules ](https://github.com/salesforce/eslint-plugin-lwc/blob/master/README.md#lwc) only.

**Usage:**

Add the `ssr` configuration to the `extends` field in your `.eslintrc` configuration file, for example:

```json
{
    "extends": ["@salesforce/eslint-config-lwc/recommended", "@salesforce/eslint-config-lwc/ssr"]
}
```

**TypeScript:** Use `@salesforce/eslint-config-lwc/ssr-ts` to use this config in TypeScript projects.
