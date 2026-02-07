const noTemplateClassSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description:
        "Disallow class-based selectors in template literals passed to locator().",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee?.property?.name !== "locator") return;

        const arg = node.arguments?.[0];
        if (!arg || arg.type !== "TemplateLiteral") return;

        const first = arg.quasis?.[0]?.value?.cooked || "";

        if (first.trim().startsWith(".")) {
          context.report({
            node: arg,
            message:
              "Do not use class selectors in locator() template literals",
          });
        }
      },
    };
  },
};

export default noTemplateClassSelector;
