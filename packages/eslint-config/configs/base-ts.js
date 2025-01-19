import imprt from "eslint-plugin-import"
import ts from "typescript-eslint"

import baseJs from "./base-js.js"

export default ts.config(
  baseJs,
  ts.configs.strictTypeChecked,
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
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "@typescript-eslint/no-use-before-define": "error",

      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",

      "sonarjs/public-static-readonly": "error",
      "sonarjs/deprecation": "off",
    },
  },
  {
    name: "@pretty-cozy/baseTs",
    files: ["src/@types/**"],
    rules: {
      "check-file/folder-naming-convention": "off",
    },
  }
)
