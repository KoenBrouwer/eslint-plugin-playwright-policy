---
title: no-class-attribute-selector
rule_type: problem
related_rules:
- no-class-dot-selector
- no-template-class-selector
further_reading:
- https://playwright.dev/docs/locators
---
Attribute selectors based on the `class` attribute (for example, `[class="card"]`) are usually coupled to visual styling rather than user-facing semantics. Tests written this way are more likely to break on refactors that do not change behavior.

This rule prevents `locator()` usage that targets elements through `[class=...]` selectors.

## Rule Details

This rule reports when a `locator()` call receives a string that contains a `[class=...]` selector pattern.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-class-attribute-selector: "error"*/

await page.locator('[class="search-result"]').click();
await page.locator('section [class*=promo]').isVisible();
```

### Correct

```js
/*eslint playwright-policy/no-class-attribute-selector: "error"*/

await page.getByRole('heading', { name: 'Search results' }).isVisible();
await page.getByText('Promo').first().click();
await page.getByTestId('promo-card').isVisible();
```

## When Not To Use It

If your test strategy explicitly allows selecting elements by class attribute values, don't enable this rule.
