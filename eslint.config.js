import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import playwrightPolicy from "eslint-plugin-playwright-policy";
import prettier from "eslint-plugin-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...playwrightPolicy.configs["flat/recommended"],
  {
    name: "Prettier",
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": ["warn"],
    },
  },
];
