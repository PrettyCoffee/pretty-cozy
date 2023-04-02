const hasTargetName = text => text.match(/[a-zA-Z]+\/?$/)

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires import statements to specify a file or folder name.",
      category: "Possible Errors",
      recommended: true,
    },
  },

  create: context => ({
    ImportDeclaration: node => {
      const source = node.source.value
      if (hasTargetName(source)) return

      context.report({
        node,
        message: `Import statement for "${source}" should specify a file or folder name.`,
      })
    },
  }),
}
