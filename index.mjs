import fs from "node:fs";
import noClassAttributeSelector from "./rules/noClassAttributeSelector.mjs";
import noClassDotSelector from "./rules/noClassDotSelector.mjs";
import noClassSelectorVariableFlow from "./rules/noClassSelectorVariableFlow.mjs";
import noDataTestIdSelector from "./rules/noDataTestIdSelector.mjs";
import noIdSelector from "./rules/noIdSelector.mjs";
import noTemplateClassSelector from "./rules/noTemplateClassSelector.mjs";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const playwrightPolicy = {
  meta: {
    name: pkg.name,
    version: pkg.version,
    namespace: "playwright-policy",
  },
  configs: {},
  rules: {
    "no-class-attribute-selector": noClassAttributeSelector,
    "no-class-dot-selector": noClassDotSelector,
    "no-class-selector-variable-flow": noClassSelectorVariableFlow,
    "no-data-test-id-selector": noDataTestIdSelector,
    "no-id-selector": noIdSelector,
    "no-template-class-selector": noTemplateClassSelector,
  },
};

Object.assign(playwrightPolicy.configs, {
  "flat/recommended": [
    {
      name: "Playwright Policy",
      plugins: {
        "playwright-policy": playwrightPolicy,
      },
      rules: {
        "playwright-policy/no-class-attribute-selector": ["warn"],
        "playwright-policy/no-class-dot-selector": ["warn"],
        "playwright-policy/no-class-selector-variable-flow": ["warn"],
        "playwright-policy/no-data-test-id-selector": ["warn"],
        "playwright-policy/no-id-selector": ["warn"],
        "playwright-policy/no-template-class-selector": ["warn"],
      },
    },
  ],
});

export default playwrightPolicy;
