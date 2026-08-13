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

test("root package import resolves and exposes flat config", async () => {
  const mod = await import("eslint-plugin-playwright-policy");

  assert.ok(mod.default);
  assert.ok(Array.isArray(mod.default.configs["flat/recommended"]));
});

test("flat/recommended can be consumed and reports namespaced rule IDs", async () => {
  const messages = await lintText(
    [
      {
        languageOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
        },
      },
      ...playwrightPolicy.configs["flat/recommended"],
    ],
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
    rule: "no-class-selector-variable-flow",
    bad: "const selector = '.cta-button'; page.locator(selector)",
    good: "const selector = 'button'; page.locator(selector)",
  },
  {
    rule: "no-data-test-id-selector",
    bad: "page.locator('[data-testid=\"search-result\"]')",
    good: "page.getByTestId('search-result')",
  },
  {
    rule: "no-id-selector",
    bad: "page.locator('#search-button')",
    good: "page.locator('button')",
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
