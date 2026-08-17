// Matches [name*=...], [name^=...], [name$=...] attribute selectors.
// Exact-match [name=...] is intentionally allowed: it's a stable selector
// on a plain HTML attribute. Partial-match operators are the brittle case,
// e.g. matching Drupal's generated array-style field names.
const NAME_ATTR_REGEX =
  /\[\s*name\s*[~^$*]=\s*(?:(['"])(?:\\.|(?!\1).)*\1|[^\]\s]+)\s*\]/i;

const noNameAttributeSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description:
        "Disallow [name*=...] / [name^=...] / [name$=...] partial-match attribute selectors in Playwright locator().",
    },
  },

  create(context) {
    function extractTemplateStatic(node) {
      return node.quasis.map((q) => q.value.cooked || "").join("");
    }

    function check(value, node) {
      if (typeof value !== "string") return;

      if (NAME_ATTR_REGEX.test(value)) {
        context.report({
          node,
          message:
            "Do not use partial-match [name] attribute selectors in locator(). Use getByRole / getByLabel instead.",
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

export default noNameAttributeSelector;
