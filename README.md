# eslint-plugin-playwright-policy

This is a custom ESLint plugin with a set of rules for preventing brittle Playwright selector patterns.

[View on npm](https://www.npmjs.com/package/eslint-plugin-playwright-policy)

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

- [`playwright-policy/no-class-attribute-selector`](docs/no-class-attribute-selector.md)
- [`playwright-policy/no-class-dot-selector`](docs/no-class-dot-selector.md)
- [`playwright-policy/no-class-selector-variable-flow`](docs/no-class-selector-variable-flow.md)
- [`playwright-policy/no-data-test-id-selector`](docs/no-data-test-id-selector.md)
- [`playwright-policy/no-id-selector`](docs/no-id-selector.md)
- [`playwright-policy/no-template-class-selector`](docs/no-template-class-selector.md)

## Contributing

Contributions are welcome via GitHub: [KoenBrouwer/eslint-plugin-playwright-policy](https://github.com/KoenBrouwer/eslint-plugin-playwright-policy)
