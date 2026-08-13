// Matches any [data-*] attribute selector, e.g. Drupal's auto-generated
// data-drupal-selector, [data-testid], or ad-hoc test hooks like [data-cy] /
// [data-qa]. Specific attribute names can be exempted via the `allow`
// option (e.g. `{ allow: ["data-testid"] }` to permit that one).
const DATA_ATTR_REGEX = /\[\s*(data-[a-z0-9_-]*)\s*(?:[~^$*|]?=[^\]]*)?\]/gi;

const noDataAttributeSelector = {
  meta: {
    type: "problem",
    schema: [
      {
        type: "object",
        properties: {
          allow: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    docs: {
      description:
        "Disallow [data-*] attribute selectors (including [data-testid]) in Playwright locator(), with an `allow` option to exempt specific attribute names.",
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const allow = new Set(
      (options.allow || []).map((name) => name.toLowerCase()),
    );

    function extractTemplateStatic(node) {
      return node.quasis.map((q) => q.value.cooked || "").join("");
    }

    function check(value, node) {
      if (typeof value !== "string") return;

      DATA_ATTR_REGEX.lastIndex = 0;
      let match;
      while ((match = DATA_ATTR_REGEX.exec(value))) {
        const attrName = match[1].toLowerCase();
        if (allow.has(attrName)) continue;

        context.report({
          node,
          message: `Do not use [${attrName}] attribute selectors in locator(). Use getByRole / getByLabel / getByText / getByTestId instead.`,
        });
        return;
      }
    }

    return {
      CallExpression(node) {
        if (node.callee?.property?.name !== "locator") return;

        const arg = node.arguments?.[0];
        if (!arg) return;

        if (arg.type === "Literal") {
          check(arg.value, arg);
        }

        if (arg.type === "TemplateLiteral") {
          check(extractTemplateStatic(arg), arg);
        }
      },
    };
  },
};

export default noDataAttributeSelector;
