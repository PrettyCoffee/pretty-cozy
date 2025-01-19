import prettyCozy from "@pretty-cozy/eslint-config"
import ts from "typescript-eslint"

export default ts.config(
  prettyCozy.baseJs,
  {
    files: ["eslint.config.mjs", "scripts/**"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },
  prettyCozy.prettier
)
