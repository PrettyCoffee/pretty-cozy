const colors = {
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  gray: "\u001b[90m",
  reset: "\u001b[0m",
}

const color = {
  /** @param {string} message */
  red: message => colors.red + message + colors.reset,
  /** @param {string} message */
  green: message => colors.green + message + colors.reset,
  /** @param {string} message */
  yellow: message => colors.yellow + message + colors.reset,
  /** @param {string} message */
  blue: message => colors.blue + message + colors.reset,
  /** @param {string} message */
  gray: message => colors.gray + message + colors.reset,
}

module.exports = { color }
