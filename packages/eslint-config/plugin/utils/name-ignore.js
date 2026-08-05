export const nameIgnoreOptionSchema = {
  ignore: { type: "array", items: { type: "string" } },
}

export const defaultNameIgnoreOptions = {
  ignore: [],
}

const parseRegex = pattern => {
  try {
    return new RegExp(pattern)
  } catch {
    return null
  }
}

const parseNameIgnoreOptions = ({ ignore }) => {
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
    { valid: [], invalid: [] }
  )

  if (invalid.length > 0) {
    throw new Error(`Ignore pattern not parsable as regex: ${invalid[0]}`)
  }

  return valid
}

export const getNameIgnore = options => {
  const regex = parseNameIgnoreOptions(options)
  const isIgnored = name => regex.some(regex => regex.test(name))
  return { isIgnored }
}
