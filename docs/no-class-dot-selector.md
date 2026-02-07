---
title: no-class-dot-selector
rule_type: problem
related_rules:
- no-template-class-selector
- no-class-selector-variable-flow
further_reading:
- https://playwright.dev/docs/locators
---
Class selectors (for example, `.button-primary`) are often tightly coupled to styling and can change frequently. In end-to-end tests this creates brittle selectors and unnecessary maintenance churn.

This rule prevents direct class-based CSS selectors passed to `locator()` and nudges tests toward more stable selectors such as role, text, label, or test id selectors.

## Rule Details

This rule reports when a `locator()` call receives a string containing a class selector segment that starts with `.`.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-class-dot-selector: "error"*/

await page.locator('.submit-button').click();
await page.locator('div.card .title').textContent();
```

### Correct

```js
/*eslint playwright-policy/no-class-dot-selector: "error"*/

await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Order summary').isVisible();
await page.locator('button[type="submit"]').click();
```

## When Not To Use It

If your project intentionally relies on class-based selectors in tests and accepts the maintenance tradeoff, don't enable this rule.
