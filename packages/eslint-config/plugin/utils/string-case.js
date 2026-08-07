export const stringCaseOptionSchema = {
  kebabCase: { type: "boolean" },
  camelCase: { type: "boolean" },
  pascalCase: { type: "boolean" },
  snakeCase: { type: "boolean" },
}

export const defaultStringCaseOptions = {
  kebabCase: true,
  camelCase: false,
  pascalCase: false,
  snakeCase: false,
}

const stringCaseRegexp = {
  kebabCase: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  camelCase: /^[a-z][a-zA-Z0-9]*$/,
  pascalCase: /^[A-Z][a-zA-Z0-9]*$/,
  snakeCase: /^[a-z0-9]+(?:_[a-z0-9]+)*$/,
}

const stringCaseLabel = {
  kebabCase: "kebab-case",
  camelCase: "camelCase",
  pascalCase: "PascalCase",
  snakeCase: "snake_case",
}

const getEnabledStringCase = options =>
  Object.entries(options).flatMap(([key, value]) =>
    key in stringCaseRegexp && value ? key : [],
  )

export const getStringCases = options => {
  const casings = getEnabledStringCase(options)

  if (casings.length === 0) {
    throw new Error(
      "At least one casing option (kebabCase, camelCase, pascalCase, or snakeCase) must be enabled.",
    )
  }

  const labels = casings.map(casing => stringCaseLabel[casing])
  const isValidCase = name =>
    casings.some(casing => stringCaseRegexp[casing].test(name))

  return { labels, isValidCase }
}
