const XPATH_REGEX = /^(xpath=|\/\/|\/html)/;

const noXpathSelector = {
  meta: {
    type: "problem",
    schema: [],
    docs: {
      description: "Disallow XPath selectors in Playwright locator().",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee?.property?.name !== "locator") return;

        const arg = node.arguments?.[0];
        if (!arg) return;

        // String literal
        if (
          arg.type === "Literal" &&
          typeof arg.value === "string" &&
          XPATH_REGEX.test(arg.value)
        ) {
          context.report({
            node: arg,
            message:
              "Do not use XPath selectors in locator(). Use role-, label-, or text-based locators instead (getByRole, getByLabel, getByText, etc.).",
          });
        }

        // Template literal
        if (arg.type === "TemplateLiteral") {
          const startsWithXpath = arg.quasis.some((quasi) =>
            XPATH_REGEX.test(quasi.value.raw || ""),
          );

          if (startsWithXpath) {
            context.report({
              node: arg,
              message:
                "Do not use XPath selectors in locator() template literals. Use role-, label-, or text-based locators instead (getByRole, getByLabel, getByText, etc.).",
            });
          }
        }
      },
    };
  },
};

export default noXpathSelector;
