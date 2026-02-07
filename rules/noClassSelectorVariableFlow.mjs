const noClassSelectorVariableFlow = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description:
        "Disallow passing class-based selectors via variables into locator().",
    },
  },

  create(context) {
    const varMap = new Map();
    const regex = /\.[A-Za-z0-9_-]+/;

    return {
      VariableDeclarator(node) {
        if (
          node.id.type === "Identifier" &&
          node.init?.type === "Literal" &&
          typeof node.init.value === "string"
        ) {
          varMap.set(node.id.name, node.init.value);
        }
      },

      CallExpression(node) {
        if (node.callee?.property?.name !== "locator") return;

        const arg = node.arguments?.[0];
        if (!arg || arg.type !== "Identifier") return;

        const value = varMap.get(arg.name);
        if (value && regex.test(value)) {
          context.report({
            node: arg,
            message: "Do not pass class selectors via variables into locator()",
          });
        }
      },
    };
  },
};

export default noClassSelectorVariableFlow;
