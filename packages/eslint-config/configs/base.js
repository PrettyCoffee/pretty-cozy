import js from "@eslint/js"
import prettyCozy from "@pretty-cozy/eslint-plugin"
import checkFile from "eslint-plugin-check-file"
import imprt from "eslint-plugin-import"
import sonarjs from "eslint-plugin-sonarjs"
import globals from "globals"
import ts from "typescript-eslint"

import { createImportOrder } from "./_create-import-order.js"

export default ts.config(
  js.configs.recommended,
  imprt.flatConfigs.recommended,
  prettyCozy.configs.flat,
  createImportOrder(),

  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      sonarjs,
      "check-file": checkFile,
    },
    rules: {
      "check-file/folder-naming-convention": [
        "error",
        { "*/**": "KEBAB_CASE" },
      ],

      "import/no-unresolved": "off",
      "import/no-deprecated": "error",
      "import/no-empty-named-blocks": "error",
      "import/no-self-import": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: false,
          optionalDependencies: false,
        },
      ],
      "import/no-useless-path-segments": [
        "error",
        {
          noUselessIndex: true,
        },
      ],

      "sonarjs/anchor-precedence": "error",
      "sonarjs/assertions-in-tests": "error",
      "sonarjs/cognitive-complexity": "error",
      "sonarjs/concise-regex": "error",
      "sonarjs/cyclomatic-complexity": "error",
      "sonarjs/deprecation": "error",
      "sonarjs/destructuring-assignment-syntax": "error",
      "sonarjs/duplicates-in-character-class": "error",
      "sonarjs/existing-groups": "error",
      "sonarjs/function-inside-loop": "error",
      "sonarjs/future-reserved-words": "error",
      "sonarjs/generator-without-yield": "error",
      "sonarjs/jsx-no-leaked-render": "error",
      "sonarjs/nested-control-flow": "error",
      "sonarjs/no-array-delete": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-duplicate-in-composite": "error",
      "sonarjs/no-empty-alternatives": "error",
      "sonarjs/no-exclusive-tests": "error",
      "sonarjs/no-globals-shadowing": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/no-ignored-exceptions": "error",
      "sonarjs/no-incorrect-string-concat": "error",
      "sonarjs/no-invalid-regexp": "error",
      "sonarjs/no-misleading-array-reverse": "error",
      "sonarjs/no-redundant-parentheses": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/no-try-promise": "error",
      "sonarjs/no-useless-react-setstate": "error",
      "sonarjs/prefer-regexp-exec": "error",
      "sonarjs/super-invocation": "error",
      "sonarjs/unused-import": "error",
    },
  },

  {
    files: ["**/*.test.*", "**/*.stories.*"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  }
)
