import assert from "node:assert/strict";
import test from "node:test";

import { ESLint } from "eslint";
import playwrightPolicy from "../index.mjs";

async function lintText(config, code) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config,
  });

  const [result] = await eslint.lintText(code, {
    filePath: "example.spec.mjs",
  });
  return result.messages;
}

function singleRuleConfig(ruleName) {
  return [
    {
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: {
        "playwright-policy": playwrightPolicy,
      },
      rules: {
        [`playwright-policy/${ruleName}`]: "error",
      },
    },
  ];
}

function flatRecommendedConfig() {
  return [
    {
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    ...playwrightPolicy.configs["flat/recommended"],
  ];
}

test("root package import resolves and exposes flat config", async () => {
  const mod = await import("eslint-plugin-playwright-policy");

  assert.ok(mod.default);
  assert.ok(Array.isArray(mod.default.configs["flat/recommended"]));
});

test("flat/recommended can be consumed and reports namespaced rule IDs", async () => {
  const messages = await lintText(
    flatRecommendedConfig(),
    "page.locator('#login-button')",
  );

  assert.ok(messages.length > 0);
  assert.ok(
    messages.some((m) => m.ruleId === "playwright-policy/no-id-selector"),
  );
});

const cases = [
  {
    rule: "no-class-attribute-selector",
    bad: "page.locator('[class=\"cta\"]')",
    good: "page.getByRole('button', { name: 'Continue' })",
  },
  {
    rule: "no-class-dot-selector",
    bad: "page.locator('.cta-button')",
    good: "page.locator('button')",
  },
  {
    rule: "no-class-dot-selector",
    bad: "expect(page.locator('.error-message')).toBeVisible()",
    good: "expect(page.getByRole('alert')).toBeVisible()",
  },
  {
    rule: "no-class-dot-selector",
    bad: "page.locator('.card:has-text(\"Active\")').click()",
    good: "page.getByText('Active').click()",
  },
  {
    rule: "no-class-dot-selector",
    bad: "page.locator('.button').or(page.locator('.link')).click()",
    good: "page.getByRole('button').or(page.getByRole('link')).click()",
  },
  {
    rule: "no-class-dot-selector",
    bad: "page.frameLocator('.iframe-container').locator('.inner-button').click()",
    good: "page.frameLocator('iframe').getByRole('button').click()",
  },
  {
    rule: "no-class-dot-selector",
    bad: "page.locator('.block__element--modifier').click()",
    good: "page.getByTestId('block-element').click()",
  },
  {
    rule: "no-class-attribute-selector",
    bad: "page.locator('[class^=\"MuiButton-\"]').click()",
    good: "page.getByRole('button', { name: 'Continue' }).click()",
  },
  {
    rule: "no-class-selector-variable-flow",
    bad: "const selector = '.cta-button'; page.locator(selector)",
    good: "const selector = 'button'; page.locator(selector)",
  },
  {
    rule: "no-data-selector",
    bad: "page.locator('[data-drupal-selector=\"edit-field-example\"]')",
    good: "page.getByLabel('Example field')",
  },
  {
    rule: "no-data-test-id-selector",
    bad: "page.locator('[data-testid=\"search-result\"]')",
    good: "page.getByTestId('search-result')",
  },
  {
    rule: "no-data-test-id-selector",
    bad: "page.locator('[data-testid=\"search-result\"] h3 a').click()",
    good: "page.getByTestId('search-result').getByRole('link').click()",
  },
  {
    rule: "no-id-selector",
    bad: "page.locator('#search-button')",
    good: "page.locator('button')",
  },
  {
    rule: "no-id-selector",
    bad: "page.locator('#rvo-autocomplete-listbox').isVisible()",
    good: "page.getByRole('listbox').isVisible()",
  },
  {
    rule: "no-name-attribute-selector",
    bad: "container.locator('select[name*=\"[field_taxonomy_filter]\"]')",
    good: "page.getByRole('combobox', { name: 'Taxonomy filter' })",
  },
  {
    rule: "no-template-class-selector",
    bad: "const size = 'lg'; page.locator(`.button-${size}`)",
    good: "const kind = 'primary'; page.locator(`button-${kind}`)",
  },
  {
    rule: "no-xpath-selector",
    bad: "page.locator('//div[@class=\"login\"]')",
    good: "page.getByRole('button', { name: 'Login' })",
  },
];

for (const ruleCase of cases) {
  test(`${ruleCase.rule} reports disallowed selector`, async () => {
    const messages = await lintText(
      singleRuleConfig(ruleCase.rule),
      ruleCase.bad,
    );

    assert.ok(messages.length > 0);
    assert.ok(
      messages.some((m) => m.ruleId === `playwright-policy/${ruleCase.rule}`),
    );
  });

  test(`${ruleCase.rule} allows valid usage`, async () => {
    const messages = await lintText(
      singleRuleConfig(ruleCase.rule),
      ruleCase.good,
    );

    assert.equal(messages.length, 0);
  });
}

// GOOD examples from examples.spec.js's "GOOD practices" test, linted
// against the full flat/recommended config rather than a single rule — a
// good example must not violate ANY rule, not just the one it's meant to
// demonstrate avoiding. This is what would have caught the bug where
// examples.spec.js listed ID selectors as GOOD despite no-id-selector
// flagging them.
const goodExamples = [
  'page.getByRole("navigation").click()',
  'page.getByRole("button", { name: "Continue" }).click()',
  'page.getByRole("button", { name: "Submit" }).click()',
  'page.getByTestId("intro").isVisible()',
  'const kind = "primary"; page.locator(`button-${kind}`).click()',
  'const goodSelector = "button"; page.locator(goodSelector).click()',
  'page.getByRole("button", { name: "Log in" }).click()',
  'page.getByLabel("Email").fill("alice@example.com")',
  'page.getByTestId("search-result").click()',
  'page.getByLabel("Username").fill("alice")',
  'page.getByText("Forgot password?").click()',
  'page.getByRole("combobox", { name: "Taxonomy filter" }).selectOption("value")',
  'page.getByTestId("submit-button").click()',
  'page.getByLabel("Taxonomy filter").selectOption("value")',
  'page.locator(\'input[name="username"]\').fill("alice")',
];

for (const [index, code] of goodExamples.entries()) {
  test(`good example #${index + 1} triggers no playwright-policy warnings: "${code}"`, async () => {
    const messages = await lintText(flatRecommendedConfig(), code);

    const policyMessages = messages.filter((m) =>
      m.ruleId?.startsWith("playwright-policy/"),
    );
    assert.deepEqual(policyMessages, []);
  });
}
