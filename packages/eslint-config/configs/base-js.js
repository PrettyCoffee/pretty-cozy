import js from "@eslint/js"
import prettyCozy from "@pretty-cozy/eslint-plugin"
import checkFile from "eslint-plugin-check-file"
import imprt from "eslint-plugin-import"
import sonarjs from "eslint-plugin-sonarjs"
import unicorn from "eslint-plugin-unicorn"
import unusedImports from "eslint-plugin-unused-imports"
import globals from "globals"
import ts from "typescript-eslint"

import { createImportOrder } from "./create-import-order.js"

export default ts.config(
  js.configs.recommended,
  prettyCozy.configs.flat,

  {
    name: "@pretty-cozy/base",
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      "check-file": checkFile,
      import: imprt,
      sonarjs,
      unicorn,
      "unused-imports": unusedImports,
    },
    rules: {
      ...createImportOrder(),

      "check-file/folder-naming-convention": [
        "error",
        { "*/**": "KEBAB_CASE" },
      ],
      "check-file/filename-naming-convention": [
        "error",
        { "*/**": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],

      "unused-imports/no-unused-imports": "error",

      // import/no-cycle is very performance heavy, therefore it is deactivated for now
      //"import/no-cycle": "error",

      "import/no-deprecated": "error",
      "import/no-duplicates": "error",
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

      "unicorn/consistent-destructuring": "error",
      "unicorn/expiring-todo-comments": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/no-await-expression-member": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-useless-switch-case": "error",
      "unicorn/prefer-date-now": "error",
      "unicorn/prefer-default-parameters": "error",
      "unicorn/prefer-logical-operator-over-ternary": "error",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-regexp-test": "error",
      "unicorn/prefer-set-has": "error",
      "unicorn/prefer-string-replace-all": "error",
      "unicorn/prefer-string-starts-ends-with": "error",
      "unicorn/prefer-structured-clone": "error",
      "unicorn/prefer-switch": "error",
      "unicorn/require-array-join-separator": "error",
      "unicorn/template-indent": "error",
    },
  },

  {
    name: "@pretty-cozy/base",
    files: ["*", "**/*.test.*", "**/*.stories.*"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  }
)
