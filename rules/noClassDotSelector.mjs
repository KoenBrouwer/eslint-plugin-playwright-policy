const noClassDotSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description: "Disallow .class CSS selectors in Playwright locator().",
    },
  },

  create(context) {
    const regex = /\.[A-Za-z0-9_-]+/;

    return {
      CallExpression(node) {
        if (node.callee?.property?.name !== "locator") return;

        const arg = node.arguments?.[0];
        if (!arg) return;

        if (arg.type === "Literal" && regex.test(arg.value)) {
          context.report({
            node: arg,
            message: "Do not use .class selectors in locator()",
          });
        }
      },
    };
  },
};

export default noClassDotSelector;
