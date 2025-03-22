/** Helper to create import order groups
 *  @param {{ groups: string[] } | undefined} options
 *  @params options.groups - most important packages of the project, e.g. ["react"]
 *  @returns {Record<string, import("eslint").Linter.RuleEntry>}
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

  return {
    "import/order": ["error", config],
  }
}
