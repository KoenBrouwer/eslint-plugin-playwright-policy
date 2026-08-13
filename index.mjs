import fs from "node:fs";
import noClassAttributeSelector from "./rules/noClassAttributeSelector.mjs";
import noClassDotSelector from "./rules/noClassDotSelector.mjs";
import noClassSelectorVariableFlow from "./rules/noClassSelectorVariableFlow.mjs";
import noDataAttributeSelector from "./rules/noDataAttributeSelector.mjs";
import noIdSelector from "./rules/noIdSelector.mjs";
import noNameAttributeSelector from "./rules/noNameAttributeSelector.mjs";
import noTemplateClassSelector from "./rules/noTemplateClassSelector.mjs";
import noXpathSelector from "./rules/noXpathSelector.mjs";

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
    "no-data-attribute-selector": noDataAttributeSelector,
    "no-id-selector": noIdSelector,
    "no-name-attribute-selector": noNameAttributeSelector,
    "no-template-class-selector": noTemplateClassSelector,
    "no-xpath-selector": noXpathSelector,
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
        "playwright-policy/no-data-attribute-selector": ["warn"],
        "playwright-policy/no-id-selector": ["warn"],
        "playwright-policy/no-name-attribute-selector": ["warn"],
        "playwright-policy/no-template-class-selector": ["warn"],
        "playwright-policy/no-xpath-selector": ["warn"],
      },
    },
  ],
});

export default playwrightPolicy;
