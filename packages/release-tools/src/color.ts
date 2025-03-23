const colors = {
  red: "\u001b[31m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  blue: "\u001b[34m",
  gray: "\u001b[90m",
  reset: "\u001b[0m",
}

export const color = {
  red: (message: string) => colors.red + message + colors.reset,
  green: (message: string) => colors.green + message + colors.reset,
  yellow: (message: string) => colors.yellow + message + colors.reset,
  blue: (message: string) => colors.blue + message + colors.reset,
  gray: (message: string) => colors.gray + message + colors.reset,
}
