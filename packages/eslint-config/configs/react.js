import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import preferFC from "eslint-plugin-react-prefer-function-component/config"
import ts from "typescript-eslint"

import { createImportOrder } from "./_create-import-order.js"
import { prettier } from "./_prettier.js"

// TODO: Replace as soon as https://github.com/facebook/react/issues/28313 is resolved
const reactHooksConfig = ts.config({
  plugins: {
    "react-hooks": {
      rules: { ...reactHooks.rules },
    },
  },
  rules: reactHooks.configs.recommended.rules,
})

export default ts.config(
  react.configs.flat.recommended,
  reactHooksConfig,
  preferFC.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  createImportOrder({ main: ["react"] }),
  prettier,

  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/destructuring-assignment": ["error", "always"],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/hook-use-state": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-max-depth": ["error", { max: 4 }],
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react/jsx-pascal-case": ["error", { allowNamespace: true }],
      "react/no-array-index-key": "error",
      "react/prop-types": "off",

      "jsx-a11y/no-onchange": "off", // deprecated rule, will be deleted in a future release
      "jsx-a11y/label-has-associated-control": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
)
