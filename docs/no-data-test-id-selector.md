---
title: no-data-test-id-selector
rule_type: problem
related_rules:
- no-id-selector
further_reading:
- https://playwright.dev/docs/locators
---
Some teams prefer tests to use selectors that represent user-observable behavior (role, label, text) rather than implementation hooks such as `data-testid`.

This rule flags CSS selectors that use `[data-testid=...]` inside `locator()`.

## Rule Details

This rule reports when a `locator()` call receives:

* a string containing `[data-testid=...]`, or
* a template literal whose static text contains `[data-testid=...]`.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-data-test-id-selector: "error"*/

await page.locator('[data-testid="search-result"]').click();
await page.locator(`[data-testid="${resultId}"] a`).click();
```

### Correct

```js
/*eslint playwright-policy/no-data-test-id-selector: "error"*/

await page.getByRole('link', { name: 'Search result' }).click();
await page.getByLabel('Search').fill('playwright');
await page.getByTestId('search-result').click();
```

## When Not To Use It

If your testing policy explicitly encourages `data-testid` usage, don't enable this rule.
