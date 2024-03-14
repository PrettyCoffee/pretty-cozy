const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
  reset: "\x1b[0m",
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
