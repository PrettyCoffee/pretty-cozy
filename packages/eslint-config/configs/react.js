import imprt from "eslint-plugin-import"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactCompiler from "eslint-plugin-react-compiler"
import reactHooks from "eslint-plugin-react-hooks"
import preferFC from "eslint-plugin-react-prefer-function-component/config"
import ts from "typescript-eslint"

import { createImportOrder } from "./create-import-order.js"

export default ts.config(
  react.configs.flat.recommended,
  reactHooks.configs["recommended-latest"],
  preferFC.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  imprt.flatConfigs.react,

  {
    name: "@pretty-cozy/react",
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: { "react-compiler": reactCompiler },
    rules: {
      ...createImportOrder({ groups: ["{react,react-dom,react-dom/*}"] }),

      "react-compiler/react-compiler": "error",

      "react/destructuring-assignment": ["error", "always"],
      "react/hook-use-state": ["error", { allowDestructuredState: true }],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-max-depth": ["error", { max: 4 }],
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react/jsx-pascal-case": ["error", { allowNamespace: true }],
      "react/no-array-index-key": "error",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],

      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",

      "jsx-a11y/no-onchange": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/no-autofocus": "off",
    },
  }
)
