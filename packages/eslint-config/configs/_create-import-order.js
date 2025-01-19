import ts from "typescript-eslint"

/** Helper to create import order groups
 *  @param {{ groups: string[] } | undefined} options
 *  @params options.groups - most important packages of the project, e.g. ["react"]
 **/
export const createImportOrder = ({ groups = [] } = {}) => {
  const config = {
    groups: ["builtin", "external", "internal"],
    "newlines-between": "always",
    alphabetize: {
      order: "asc",
      caseInsensitive: true,
    },
  }

  if (groups.length > 0) {
    config.pathGroups = groups.map(name => ({
      pattern: name,
      group: "external",
      position: "before",
    }))
    config.pathGroupsExcludedImportTypes = groups
  }

  return ts.config({
    rules: {
      "import/order": ["error", config],
    },
  })
}
