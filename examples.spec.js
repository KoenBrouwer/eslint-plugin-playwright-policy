// Rule-by-rule usage examples for eslint-plugin-playwright-policy. Each
// numbered section below appears in both tests, in the same order, so a BAD
// section and its matching GOOD section can be compared directly.
//
// This file is for manual/editor review (open it and look at the squiggles)
// — it isn't linted or run by `pnpm lint` / `pnpm test`. For real, enforced
// regression coverage — including selectors chained through various
// Playwright APIs (expect(), pseudo-classes, frameLocator, or()/and(), etc.)
// — see the `cases` array in tests/plugin.test.mjs.
//
// Known detection gaps (not yet caught by any rule) are tracked in TODO.md.

import { test, expect } from "@playwright/test";

test("comprehensive selector examples - all bad practices", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveTitle(/Playwright/);

  // ========================================
  // 1. no-class-dot-selector
  // ========================================

  // ❌ BAD: Single class
  await page.locator(".navbar").click();

  // ❌ BAD: Multiple classes
  await page.locator(".btn.btn-primary").click();

  // ❌ BAD: Class with descendant/child combinators
  await page.locator(".header .logo").click();
  await page.locator(".container > .item").click();

  // ❌ BAD: Element with class
  await page.locator("button.submit-btn").click();

  // ========================================
  // 2. no-class-attribute-selector
  // ========================================

  // ❌ BAD: Exact class attribute match
  await page.locator('[class="cta"]').click();

  // ❌ BAD: Substring/prefix/suffix class attribute match
  await page.locator('[class*="Intro_m-intro"] p').isVisible();
  await page.locator('[class^="MuiButton-"]').click();
  await page.locator('[class$="-primary"]').click();

  // ========================================
  // 3. no-template-class-selector
  // ========================================

  // ❌ BAD: Class in template literal
  await page.locator(`.sidebar`).click();

  // ❌ BAD: Class with variable in template literal
  const className = "menu-item";
  await page.locator(`.${className}`).click();

  // ========================================
  // 4. no-class-selector-variable-flow
  // ========================================

  // ❌ BAD: Class selector stored in a variable, then passed to locator()
  const selector = ".cta-button";
  await page.locator(selector).click();

  // ========================================
  // 5. no-id-selector
  // ========================================

  // ❌ BAD: ID selector
  await page.locator("#login-button").click();

  // ❌ BAD: ID selector in template literal
  const fieldId = "email";
  await page.locator(`form #${fieldId}`).fill("alice@example.com");

  // ========================================
  // 6. no-data-test-id-selector
  // ========================================

  // ❌ BAD: [data-testid=...] used directly as a CSS selector
  await page.locator('[data-testid="search-result"]').click();
  await page.locator(`[data-testid="${fieldId}"] a`).click();

  // ========================================
  // 7. no-xpath-selector
  // ========================================

  // ❌ BAD: Relative XPath
  await page.locator('//div[@class="login"]').click();

  // ❌ BAD: Explicit xpath= prefix
  await page.locator('xpath=//button[text()="Submit"]').click();

  // ❌ BAD: Absolute XPath from document root
  await page.locator("/html/body/div/main/button").click();

  // ❌ BAD: XPath in template literal
  await page.locator(`//input[@name="email"]`).fill("test@example.com");

  // ❌ BAD: XPath with variable
  const fieldName = "email";
  await page.locator(`//input[@name="${fieldName}"]`).fill("test@example.com");

  // ========================================
  // 8. no-data-selector
  // ========================================

  // ❌ BAD: Drupal's auto-generated data-drupal-selector
  await page
    .locator('[data-drupal-selector="edit-field-taxonomy-filter"]')
    .selectOption("value");

  // ❌ BAD: data-drupal-selector with substring match
  await page.locator('[data-drupal-selector$="-subform"]').last().click();

  // ❌ BAD: Other framework-generated *-selector attributes
  await page.locator('[data-qa-selector="submit-button"]').click();

  // ========================================
  // 9. no-name-attribute-selector
  // ========================================

  // ❌ BAD: Substring match on a generated array-style field name
  const container = page.locator("form");
  const select = container.locator('select[name*="[field_taxonomy_filter]"]');
  await select.selectOption("value");

  // ❌ BAD: Prefix match on name
  await page.locator('input[name^="field_"]').fill("value");

  // ❌ BAD: Suffix match on name
  await page.locator('input[name$="_taxonomy_filter]"]').fill("value");
});

test("GOOD practices - recommended approaches", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // ========================================
  // 1. no-class-dot-selector
  // ========================================

  // ✅ GOOD: Use getByRole instead of .navbar / .btn.btn-primary / etc.
  await page.getByRole("navigation").click();
  await page.getByRole("button", { name: "Continue" }).click();

  // ========================================
  // 2. no-class-attribute-selector
  // ========================================

  // ✅ GOOD: Use getByRole/getByTestId instead of [class...] attribute selectors
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByTestId("intro").isVisible();

  // ========================================
  // 3. no-template-class-selector
  // ========================================

  // ✅ GOOD: Template literal that isn't a class selector
  const kind = "primary";
  await page.locator(`button-${kind}`).click();

  // ========================================
  // 4. no-class-selector-variable-flow
  // ========================================

  // ✅ GOOD: Variable holding a non-class selector
  const goodSelector = "button";
  await page.locator(goodSelector).click();

  // ========================================
  // 5. no-id-selector
  // ========================================

  // ✅ GOOD: Use getByRole/getByLabel instead of #id selectors
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByLabel("Email").fill("alice@example.com");

  // ========================================
  // 6. no-data-test-id-selector
  // ========================================

  // ✅ GOOD: Use getByTestId instead of [data-testid=...]
  await page.getByTestId("search-result").click();

  // ========================================
  // 7. no-xpath-selector
  // ========================================

  // ✅ GOOD: Use getByRole instead of //button[text()="..."]
  await page.getByRole("button", { name: "Log in" }).click();

  // ✅ GOOD: Use getByLabel instead of //input[@name="username"]
  await page.getByLabel("Username").fill("alice");

  // ✅ GOOD: Use getByText instead of //div[text()="..."]
  await page.getByText("Forgot password?").click();

  // ========================================
  // 8. no-data-selector
  // ========================================

  // ✅ GOOD: Use getByRole instead of [data-drupal-selector*="..."]
  await page
    .getByRole("combobox", { name: "Taxonomy filter" })
    .selectOption("value");

  // ✅ GOOD: Use getByTestId instead of [data-qa-selector="..."]
  await page.getByTestId("submit-button").click();

  // ========================================
  // 9. no-name-attribute-selector
  // ========================================

  // ✅ GOOD: Use getByRole instead of select[name*="[field_taxonomy_filter]"]
  await page
    .getByRole("combobox", { name: "Taxonomy filter" })
    .selectOption("value");

  // ✅ GOOD: Use getByLabel instead of input[name^="field_"]
  await page.getByLabel("Taxonomy filter").selectOption("value");

  // ✅ GOOD: Exact-match name selectors are still fine
  await page.locator('input[name="username"]').fill("alice");
});
