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

const eslintRecommended = {
  name: "eslint/recommended",
  ...js.configs.recommended,
}

export default ts.config(
  eslintRecommended,
  imprt.flatConfigs.recommended,
  prettyCozy.configs.flat,

  {
    name: "@pretty-cozy/baseJs",
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2020,
      },
    },
    plugins: { "unused-imports": unusedImports },
    rules: {
      "arrow-body-style": ["warn", "as-needed"],
      "no-alert": "error",
      complexity: ["error", 10],

      // auto-fix unused imports
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",

      "import/no-cycle": "off", // tends to be very performance heavy
      "import/namespace": "off", // tends to be very performance heavy
      "import/no-unresolved": "off", // modules cannot be resolved correctly without a resolver

      ...createImportOrder(),
      "import/no-deprecated": "warn",
      "import/no-duplicates": "error",
      "import/no-empty-named-blocks": "error",
      "import/no-self-import": "error",
      "import/newline-after-import": "error",
      "import/no-extraneous-dependencies": "error",
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    },
  },

  {
    // Manual selection of unicorn rules, since the recommended config enables >100 rules
    // @see https://github.com/sindresorhus/eslint-plugin-unicorn#rules
    name: "@pretty-cozy/baseJs/unicorn",
    plugins: { unicorn },
    rules: {
      "unicorn/consistent-destructuring": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/error-message": "error",
      "unicorn/expiring-todo-comments": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-await-expression-member": "error",
      "unicorn/no-await-in-promise-methods": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-hex-escape": "error",
      "unicorn/no-unused-properties": "error",
      "unicorn/no-useless-length-check": "error",
      "unicorn/no-useless-promise-resolve-reject": "error",
      "unicorn/no-useless-switch-case": "error",
      "unicorn/numeric-separators-style": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-date-now": "error",
      "unicorn/prefer-default-parameters": "error",
      "unicorn/prefer-export-from": "error",
      "unicorn/prefer-logical-operator-over-ternary": "error",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-set-has": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-string-replace-all": "error",
      "unicorn/prefer-string-starts-ends-with": "error",
      "unicorn/prefer-structured-clone": "error",
      "unicorn/prefer-switch": "error",
      "unicorn/require-array-join-separator": "error",
      "unicorn/switch-case-braces": ["error", "avoid"],
      "unicorn/template-indent": "error",
    },
  },

  {
    // Manual selection of sonarjs rules, since the recommended config enables >200 rules
    // @see https://github.com/SonarSource/SonarJS/blob/master/packages/jsts/src/rules/README.md#rules
    name: "@pretty-cozy/baseJs/sonarjs",
    plugins: { sonarjs },
    rules: {
      "sonarjs/anchor-precedence": "error",
      "sonarjs/assertions-in-tests": "error",
      "sonarjs/cognitive-complexity": "error",
      "sonarjs/concise-regex": "error",
      "sonarjs/cyclomatic-complexity": "error",
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
      "sonarjs/no-identical-functions": "error",
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
    },
  },

  {
    name: "@pretty-cozy/baseJs/checkFile",
    // Only apply the naming conventions on files that are within a directory.
    // This will fix the issue where the root directory is not named with kebab-case.
    files: ["*/**"],
    plugins: { checkFile },
    rules: {
      "checkFile/folder-naming-convention": [
        "error",
        { "**/!(@types|.*)/": "KEBAB_CASE" },
      ],
      "checkFile/filename-naming-convention": [
        "error",
        { "*/**": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },

  {
    name: "@pretty-cozy/baseJs",
    files: ["*", "**/*.test.*", "**/*.stories.*"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  }
)
