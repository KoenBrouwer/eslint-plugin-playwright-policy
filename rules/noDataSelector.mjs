// Matches [data-*-selector...] attribute selectors, e.g. Drupal's
// auto-generated data-drupal-selector attribute. Deliberately excludes
// data-testid, which is covered by no-data-test-id-selector instead.
const DATA_SELECTOR_REGEX =
  /\[\s*data-(?!testid\b)[a-z0-9_-]*-selector\s*(?:[~^$*]?=[^\]]*)?\]/i;

const noDataSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description:
        "Disallow [data-*-selector] attribute selectors (e.g. data-drupal-selector) in Playwright locator().",
    },
  },

  create(context) {
    function extractTemplateStatic(node) {
      return node.quasis.map((q) => q.value.cooked || "").join("");
    }

    function check(value, node) {
      if (typeof value !== "string") return;

      if (DATA_SELECTOR_REGEX.test(value)) {
        context.report({
          node,
          message:
            "Do not use [data-*-selector] attribute selectors in locator(). Use getByRole / getByLabel / getByText / getByTestId instead.",
        });
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

export default noDataSelector;
