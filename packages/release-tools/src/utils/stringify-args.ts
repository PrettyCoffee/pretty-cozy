import { color } from "./color"

const camelToKebab = (str: string) =>
  str.replaceAll(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()

const toArg = (cliName: string, value: unknown) => {
  switch (typeof value) {
    case "boolean":
      return value ? `--${cliName}` : undefined
    case "string":
    case "number":
      return `--${cliName}="${value}"`
    default:
      throw new Error(color.red(`Invalid type for ${cliName}: ${typeof value}`))
  }
}

export const stringifyArgs = (options: Record<string, unknown> = {}) => {
  const args = Object.entries(options).flatMap(([name, value]) => {
    const cliName = camelToKebab(name)
    return Array.isArray(value)
      ? value.map(value => toArg(cliName, value))
      : toArg(cliName, value)
  })

  return args.filter(Boolean).join(" ")
}
