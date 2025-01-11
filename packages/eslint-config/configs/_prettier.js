import prettierPlugin from "eslint-plugin-prettier"
import prettierConfig from "eslint-plugin-prettier/recommended"
import ts from "typescript-eslint"

export const prettier = ts.config(prettierConfig, {
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        singleQuote: false,
        trailingComma: "es5",
        semi: false,
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "auto",
        jsxSingleQuote: false,
      },
    ],
  },
})
