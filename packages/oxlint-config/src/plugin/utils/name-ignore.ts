export interface NameIgnoreOptions {
  ignore?: string[]
}

export const nameIgnoreOptionSchema = {
  ignore: { type: "array", items: { type: "string" } },
} as const

export const defaultNameIgnoreOptions: Required<NameIgnoreOptions> = {
  ignore: [],
}

const parseRegex = (pattern: string) => {
  try {
    return new RegExp(pattern)
  } catch {
    return null
  }
}

const parseNameIgnoreOptions = ({ ignore }: NameIgnoreOptions) => {
  if (!ignore) return []

  const { valid, invalid } = ignore.reduce(
    (result, pattern) => {
      const regex = parseRegex(pattern)
      if (regex) {
        result.valid.push(regex)
      } else {
        result.invalid.push(pattern)
      }
      return result
    },
    { valid: [] as RegExp[], invalid: [] as string[] },
  )

  if (invalid.length > 0) {
    throw new Error(`Ignore pattern not parsable as regex: ${invalid[0]}`)
  }

  return valid
}

export const getNameIgnore = (options: NameIgnoreOptions) => {
  const regex = parseNameIgnoreOptions(options)
  const isIgnored = (name: string) => regex.some(regex => regex.test(name))
  return { isIgnored }
}
