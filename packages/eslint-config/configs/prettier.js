import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import ts from "typescript-eslint"

export default ts.config({
  name: "@pretty-cozy/prettier",
  extends: [prettierConfig],
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
