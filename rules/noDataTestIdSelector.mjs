const noDataTestIdSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description:
        "Disallow [data-testid=] CSS selectors in locator(). Use getByTestId().",
    },
  },

  create(context) {
    const TESTID_REGEX = /\[\s*data-testid\s*=[^\]]+\]/i;

    function extractTemplateStatic(node) {
      return node.quasis.map((q) => q.value.cooked || "").join("");
    }

    function check(value, node) {
      if (typeof value !== "string") return;

      if (TESTID_REGEX.test(value)) {
        context.report({
          node,
          message:
            "Using test ids is not recommended. Please use accessibility selectors instead.",
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

export default noDataTestIdSelector;
