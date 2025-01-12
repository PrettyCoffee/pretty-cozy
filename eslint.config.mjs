import prettyCozy from "@pretty-cozy/eslint-config"

export default [
  ...prettyCozy.base,
  {
    files: ["eslint.config.mjs", "scripts/**"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },
]
