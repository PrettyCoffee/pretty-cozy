import ts from "typescript-eslint"

/** Helper to create import order groups
 *  @param {{ main: string[] } | undefined} options
 *  @params options.main - most important packages of the project, e.g. ["react"]
 **/
export const createImportOrder = ({ main = [] } = {}) => {
  const config = {
    groups: ["builtin", "external", "internal"],
    "newlines-between": "always",
    alphabetize: {
      order: "asc",
      caseInsensitive: true,
    },
  }

  if (main.length > 0) {
    config.pathGroups = main.map(name => ({
      pattern: name,
      group: "external",
      position: "before",
    }))
    config.pathGroupsExcludedImportTypes = main
  }

  return ts.config({
    rules: {
      "import/order": ["error", config],
    },
  })
}
