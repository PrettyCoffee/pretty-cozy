import js from "@eslint/js"
import prettyCozy from "@pretty-cozy/eslint-plugin"
import checkFile from "eslint-plugin-check-file"
import imprt from "eslint-plugin-import"
import sonarjs from "eslint-plugin-sonarjs"
import globals from "globals"
import ts from "typescript-eslint"

import { createImportOrder } from "./_create-import-order.js"
import { prettier } from "./_prettier.js"

export default ts.config(
  js.configs.recommended,
  imprt.flatConfigs.recommended,
  sonarjs.configs.recommended,
  prettyCozy.configs.flat,
  prettier,
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
      "check-file": checkFile,
    },
    rules: {
      "check-file/folder-naming-convention": [
        "error",
        { "src/**": "KEBAB_CASE" },
      ],

      "sonarjs/unused-import": "error",
      "sonarjs/todo-tag": "off",
      "sonarjs/public-static-readonly": "off",

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
    },
  },

  {
    files: ["*.test.*"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  }
)
