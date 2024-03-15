const getFlagsLength = options =>
  Object.keys(options).reduce(
    (result, flag) => (flag.length > result ? flag.length : result),
    0
  )

const formatOptions = options => {
  const flagLength = getFlagsLength(options)
  const flags = Object.keys(options)
  return flags.reduce((result, flag) => {
    const description = options[flag].replaceAll(
      "\n",
      "\n".padEnd(flagLength + 5)
    )
    return `${result}\n  ${flag.padEnd(flagLength)}  ${description}`
  }, "")
}

const helpTemplate = (description, usage, options) => `
${description}

Usage: ${usage}

Options:
${options}
`

/** Formats the help page of a cli application
 *
 * @param {string} description
 * @param {Array<string> | string} usage
 * @param {Record<string, string>} options
 */
const printHelp = (description, usage, options) => {
  const help = helpTemplate(description, usage, formatOptions(options))
  console.info(help)
}

module.exports = printHelp
