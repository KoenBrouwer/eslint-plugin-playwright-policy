---
title: no-data-attribute-selector
rule_type: problem
further_reading:
- https://playwright.dev/docs/locators
- https://www.drupal.org/node/2340683
---
`data-*` attributes are commonly used as automation hooks, but they come from a few different sources with different stability guarantees: hand-written test ids (`data-testid`, `data-cy`, `data-qa`, ...), and framework-generated internals (e.g. Drupal's `data-drupal-selector`, derived from a field's machine name) that can change when a form or field is restructured.

This rule flags `locator()` calls that select on any `[data-*]` attribute. If your team has specific `data-*` attributes it considers a stable, intentional test hook (e.g. `data-testid` via `getByTestId()`), allow them explicitly with the `allow` option rather than leaving the rule to flag every `data-*` attribute uniformly.

## Rule Details

This rule reports when a `locator()` call receives:

* a string containing a `[data-*...]` attribute selector (e.g. `[data-drupal-selector=...]`, `[data-testid=...]`, `[data-cy=...]`), or
* a template literal whose static text contains one.

## Options

```js
{
  "playwright-policy/no-data-attribute-selector": ["error", {
    "allow": ["data-testid"]
  }]
}
```

* `allow` (`string[]`, default `[]`): a list of exact `data-*` attribute names (case-insensitive) that are exempt from this rule. Any attribute not in this list is flagged. Leaving `allow` unset (or empty) means every `data-*` attribute selector is flagged, including `data-testid`.

### Incorrect

```js
/*eslint playwright-policy/no-data-attribute-selector: "error"*/

await page.locator('[data-drupal-selector="edit-field-example"]').click();
await page.locator('[data-drupal-selector$="-subform"]').last().click();
await page.locator('[data-testid="search-result"]').click();
await page.locator('[data-cy="submit-button"]').click();
```

### Correct

```js
/*eslint playwright-policy/no-data-attribute-selector: "error"*/

await page.getByRole('button', { name: 'Save' }).click();
await page.getByLabel('Example field').fill('value');
await page.getByTestId('example-subform').click();
```

```js
/*eslint playwright-policy/no-data-attribute-selector: ["error", { "allow": ["data-testid"] }]*/

// Still flagged: not in the allow list.
await page.locator('[data-drupal-selector="edit-field-example"]').click();

// Allowed: data-testid is explicitly exempted.
await page.locator('[data-testid="search-result"]').click();
```

## When Not To Use It

If your team explicitly relies on `data-*` attributes as a stable selector strategy across the board, don't enable this rule.
