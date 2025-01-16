import imprt from "eslint-plugin-import"
import ts from "typescript-eslint"

import base from "./base.js"

export default ts.config(
  base,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  imprt.flatConfigs.typescript,

  {
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
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unused-expressions": "off",

      "sonarjs/public-static-readonly": "error",
    },
  },
  {
    files: ["src/@types/**"],
    rules: {
      "check-file/folder-naming-convention": "off",
    },
  }
)
