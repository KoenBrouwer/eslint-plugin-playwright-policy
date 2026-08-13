---
title: no-data-selector
rule_type: problem
related_rules:
- no-data-test-id-selector
further_reading:
- https://playwright.dev/docs/locators
- https://www.drupal.org/node/2340683
---
Some frameworks auto-generate their own `data-*-selector` attributes as automation hooks — for example, Drupal's `data-drupal-selector`, which is derived from a field's machine name. These are framework internals, not user-facing behavior, and can change when a form or field is restructured.

This rule flags attribute selectors targeting any `data-*-selector` attribute other than `data-testid`, which is already covered by [`no-data-test-id-selector`](no-data-test-id-selector.md).

## Rule Details

This rule reports when a `locator()` call receives:

* a string containing a `[data-*-selector...]` attribute selector (e.g. `[data-drupal-selector=...]`), or
* a template literal whose static text contains one.

## Options

This rule has no options.

### Incorrect

```js
/*eslint playwright-policy/no-data-selector: "error"*/

await page.locator('[data-drupal-selector="edit-field-example"]').click();
await page.locator('[data-drupal-selector$="-subform"]').last().click();
```

### Correct

```js
/*eslint playwright-policy/no-data-selector: "error"*/

await page.getByRole('button', { name: 'Save' }).click();
await page.getByLabel('Example field').fill('value');
await page.getByTestId('example-subform').click();
```

## When Not To Use It

If your team explicitly relies on framework-generated `data-*-selector` attributes as a stable selector strategy, don't enable this rule.
