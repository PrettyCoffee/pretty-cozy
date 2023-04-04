const base = require("./base")

const importOrder = base.rules["import/order"].find(
  item => typeof item === "object"
)

module.exports = {
  extends: ["@pretty-cozy/eslint-config/react"],
  rules: {
    "import/order": [
      "error",
      {
        ...importOrder,
        pathGroups: [
          {
            pattern: "preact",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["preact"],
      },
    ],
  },
  settings: {
    react: {
      version: "16.0",
      pragma: "h",
    },
  },
}
