---
title: no-class-selector-variable-flow
rule_type: problem
related_rules:
- no-class-dot-selector
- no-template-class-selector
further_reading:
- https://playwright.dev/docs/locators
---
Class selectors are sometimes hidden by assigning them to variables before passing them into `locator()`. This can bypass simple static checks and still create brittle tests.

This rule tracks simple variable assignments and reports class-based selector strings that flow into `locator()` calls.

## Rule Details

This rule reports when:

* a variable is initialized with a string containing a class selector (for example, `.cta`), and
* that variable is later used as the first argument to `locator()`.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-class-selector-variable-flow: "error"*/

const selector = '.checkout-button';
await page.locator(selector).click();
```

### Correct

```js
/*eslint playwright-policy/no-class-selector-variable-flow: "error"*/

const selector = 'button[type="submit"]';
await page.locator(selector).click();

const name = 'Checkout';
await page.getByRole('button', { name }).click();
```

## When Not To Use It

If you intentionally allow class selectors via variable indirection, don't enable this rule.
