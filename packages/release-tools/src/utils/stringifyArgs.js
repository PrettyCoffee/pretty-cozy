const { color } = require("../color")

const camelToKebab = str =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()

/**
 * @param {Record<string, string | number | boolean>} options
 * @returns {string}
 */
const stringifyArgs = (options = {}) => {
  const args = Object.entries(options).map(([name, value]) => {
    const cliName = camelToKebab(name)
    switch (typeof value) {
      case "boolean":
        return value ? `--${cliName}` : undefined
      case "string":
      case "number":
        return `--${cliName}="${value}"`
      default:
        throw new Error(color.red(`Invalid type for ${name}: ${typeof value}`))
    }
  })

  return args.filter(Boolean).join(" ")
}

module.exports = { stringifyArgs }
