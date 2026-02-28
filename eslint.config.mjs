import prettyCozy from "@pretty-cozy/eslint-config"
import { defineConfig } from "eslint/config"

export default defineConfig(
  prettyCozy.baseJs,
  {
    files: ["**/*.ts"],
    extends: prettyCozy.baseTs,
  },
  {
    files: ["eslint.config.mjs", "scripts/**"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },
  prettyCozy.prettier
)
