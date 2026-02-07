---
title: no-template-class-selector
rule_type: problem
related_rules:
- no-class-dot-selector
- no-class-selector-variable-flow
further_reading:
- https://playwright.dev/docs/locators
---
Template literals can hide class-based selector construction behind interpolation, which makes brittle selectors harder to notice in review.

This rule disallows class-based selectors when they are passed to `locator()` via template literals.

## Rule Details

This rule reports when a `locator()` call receives a template literal whose static beginning starts with `.`.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-template-class-selector: "error"*/

const size = 'large';
await page.locator(`.button-${size}`).click();
```

### Correct

```js
/*eslint playwright-policy/no-template-class-selector: "error"*/

const label = 'Continue';
await page.getByRole('button', { name: label }).click();

const id = 'search-result';
await page.getByTestId(id).first().click();
```

## When Not To Use It

If dynamically generated class selectors are a deliberate part of your test design, don't enable this rule.
