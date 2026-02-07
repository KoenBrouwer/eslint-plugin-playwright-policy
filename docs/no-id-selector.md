---
title: no-id-selector
rule_type: problem
related_rules:
- no-data-test-id-selector
further_reading:
- https://playwright.dev/docs/locators
---
ID-based CSS selectors (for example, `#login`) can look stable but frequently become coupling points between tests and implementation details.

This rule encourages using user-facing and accessibility-driven locator strategies instead of `#id` selectors in `locator()`.

## Rule Details

This rule reports when a `locator()` call receives:

* a string containing an ID selector (`#...`), or
* a template literal whose static text contains an ID selector.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-id-selector: "error"*/

await page.locator('#login-button').click();
await page.locator(`form #${fieldId}`).fill('alice@example.com');
```

### Correct

```js
/*eslint playwright-policy/no-id-selector: "error"*/

await page.getByRole('button', { name: 'Log in' }).click();
await page.getByLabel('Email').fill('alice@example.com');
await page.getByTestId('login-button').click();
```

## When Not To Use It

If your team treats element IDs as the preferred long-term selector API for tests, don't enable this rule.
