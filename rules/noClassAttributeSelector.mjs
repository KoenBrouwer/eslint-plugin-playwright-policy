const CLASS_ATTR_REGEX =
  /\[\s*class\s*(?:[*^$~|]?=)\s*(?:(['"])(?:\\.|(?!\1).)*\1|[^\]\s]+)\s*\]/i;

const noClassAttributeSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description:
        "Disallow [class=...] CSS attribute selectors in Playwright locator().",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee?.property?.name !== "locator") return;

        const arg = node.arguments?.[0];
        if (!arg) return;

        if (
          arg.type === "Literal" &&
          typeof arg.value === "string" &&
          CLASS_ATTR_REGEX.test(arg.value)
        ) {
          context.report({
            node: arg,
            message: "Do not use [class...] attribute selectors in locator()",
          });
        }
      },
    };
  },
};

export default noClassAttributeSelector;
