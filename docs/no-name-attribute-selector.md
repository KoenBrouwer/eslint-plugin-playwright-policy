---
title: no-name-attribute-selector
rule_type: problem
related_rules:
- no-data-selector
further_reading:
- https://playwright.dev/docs/locators
---
An exact-match `[name="..."]` selector on a plain HTML `name` attribute is generally stable. But partial-match operators (`*=`, `^=`, `$=`) are often used to reach into framework-generated, array-style field names — for example `select[name*="[field_taxonomy_filter]"]` — which are implementation details that shift when a form is restructured.

This rule flags `[name*=...]`, `[name^=...]`, and `[name$=...]` attribute selectors in `locator()`. Exact-match `[name=...]` is intentionally allowed.

## Rule Details

This rule reports when a `locator()` call receives:

* a string containing a partial-match `name` attribute selector, or
* a template literal whose static text contains one.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-name-attribute-selector: "error"*/

await container.locator('select[name*="[field_taxonomy_filter]"]').selectOption("value");
await page.locator('input[name^="field_"]').fill("value");
```

### Correct

```js
/*eslint playwright-policy/no-name-attribute-selector: "error"*/

await page.getByRole('combobox', { name: 'Taxonomy filter' }).selectOption("value");
await page.getByLabel('Taxonomy filter').selectOption("value");
await page.locator('input[name="email"]').fill("test@example.com");
```

## When Not To Use It

If your team relies on partial-match `name` attribute selectors as a deliberate selector strategy, don't enable this rule.
