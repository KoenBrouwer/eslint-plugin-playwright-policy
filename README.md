# eslint-plugin-playwright-policy

This is a custom ESLint plugin with a set of rules for preventing brittle Playwright selector patterns.

## Installation

```bash
npm install -D eslint eslint-plugin-playwright-policy
```

## Configuration support

This plugin only supports ESLint's Flat Config. We don't officially support the ESLint <=8 legacy config format.

## Usage

```js
// eslint.config.js
import plugin from "eslint-plugin-playwright-policy";

export default [
  ...plugin.configs["flat/recommended"],
];
```

## Included Rules

- `playwright-policy/no-class-attribute-selector`
- `playwright-policy/no-class-dot-selector`
- `playwright-policy/no-class-selector-variable-flow`
- `playwright-policy/no-data-test-id-selector`
- `playwright-policy/no-id-selector`
- `playwright-policy/no-template-class-selector`
