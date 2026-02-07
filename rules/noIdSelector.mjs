const noIdSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description: "Disallow ID selectors in Playwright locator()",
    },
  },

  create(context) {
    // Matches:
    // #id
    // div#id
    // #id-child
    const ID_REGEX = /#[A-Za-z0-9_-]+/;

    return {
      CallExpression(node) {
        if (node.callee?.property?.name !== "locator") return;

        const arg = node.arguments?.[0];
        if (!arg) return;

        // String literal
        if (
          arg.type === "Literal" &&
          typeof arg.value === "string" &&
          ID_REGEX.test(arg.value)
        ) {
          context.report({
            node: arg,
            message:
              "Do not use ID selectors in page.locator(). Use getByRole / getByTestId / getByText.",
          });
        }

        // Template literal
        if (arg.type === "TemplateLiteral") {
          const staticPart = arg.quasis
            .map((q) => q.value.cooked || "")
            .join("");

          if (ID_REGEX.test(staticPart)) {
            context.report({
              node: arg,
              message:
                "Do not use ID selectors in locator() template literals.",
            });
          }
        }
      },
    };
  },
};

export default noIdSelector;
