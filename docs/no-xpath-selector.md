---
title: no-xpath-selector
rule_type: problem
related_rules:
- no-id-selector
- no-data-attribute-selector
further_reading:
- https://playwright.dev/docs/locators
---
XPath selectors are verbose, tightly coupled to DOM structure, and break easily when markup changes.

This rule encourages using user-facing and accessibility-driven locator strategies instead of XPath expressions in `locator()`.

## Rule Details

This rule reports when a `locator()` call receives:

* a string starting with `xpath=`, `//`, or `/html`, or
* a template literal whose static text starts with `xpath=`, `//`, or `/html`.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-xpath-selector: "error"*/

await page.locator('//div[@class="login"]').click();
await page.locator('xpath=//button[text()="Submit"]').click();
await page.locator(`/html/body/div/button`).click();
```

### Correct

```js
/*eslint playwright-policy/no-xpath-selector: "error"*/

await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email').fill('alice@example.com');
await page.getByText('Login').click();
```

## When Not To Use It

If your team relies on XPath as the preferred selector strategy for tests, don't enable this rule.
