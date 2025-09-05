import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default [
  { files: ["**/*.{js, mjs, cjs, ts, jsx, tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    stylistic.configs.customize({
      indent: 2,
      quotes: "single",
      semi: true,
      jsx: true,
      arrowParens: true,
      quoteProps: "as-needed",
      commaDangle: "always-multiline",
    }),
];