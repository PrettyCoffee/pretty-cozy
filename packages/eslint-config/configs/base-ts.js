import { defineConfig } from "eslint/config"
import imprt from "eslint-plugin-import"
import ts from "typescript-eslint"

import baseJs from "./base-js.js"

export default defineConfig(
  baseJs,
  ts.configs.recommendedTypeChecked,
  ts.configs.stylisticTypeChecked,
  imprt.flatConfigs.typescript,

  {
    name: "@pretty-cozy/baseTs",

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },

    rules: {
      // duplicates that are handled by TypeScript or typescript-eslint rules
      "import/export": "off",
      "import/default": "off",

      "sonarjs/deprecation": "off",
      "import/no-deprecated": "off",
      "@typescript-eslint/no-deprecated": "error",

      "sonarjs/no-incorrect-string-concat": "off",
      "@typescript-eslint/restrict-plus-operands": "error",

      "sonarjs/prefer-regexp-exec": "off",
      "@typescript-eslint/prefer-regexp-exec": "error",

      // these interfere with DX too much in some scenarios
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/unbound-method": "off",

      // additional typescript rules
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": [
        "error",
        { typesToIgnore: ["const"] },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": "allow-with-description",
        },
      ],

      // Rules picked from ts.configs.strictTypeChecked
      "@typescript-eslint/no-misused-spread": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-template-expression": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-unnecessary-type-parameters": "error",
      "@typescript-eslint/prefer-reduce-type-parameter": "error",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
    },
  },

  {
    // test code may not need these strict type rules
    // -> e.g., there are problems with test tables
    name: "@pretty-cozy/baseTs/test-files",
    files: ["**/*.test.*"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  },

  {
    // types are annoying to define in js, which results in lots of `any` types
    name: "@pretty-cozy/baseTs/js-files",
    files: ["**/*.@(js|cjs|mjs)"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  }
)
