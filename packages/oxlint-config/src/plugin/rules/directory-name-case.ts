import path from "node:path"

import { createRule } from "../utils/create-rule.ts"
import {
  defaultNameIgnoreOptions,
  getNameIgnore,
  type NameIgnoreOptions,
  nameIgnoreOptionSchema,
} from "../utils/name-ignore.ts"
import {
  defaultStringCaseOptions,
  getStringCases,
  type StringCaseOptions,
  stringCaseOptionSchema,
} from "../utils/string-case.ts"

interface Options extends StringCaseOptions, NameIgnoreOptions {}

const optionsSchema = {
  ...stringCaseOptionSchema,
  ...nameIgnoreOptionSchema,
} as const

const defaultOptions: Required<Options> = {
  ...defaultStringCaseOptions,
  ...defaultNameIgnoreOptions,
}

const getDirectorySegments = (relativePath: string): string[] =>
  path
    .dirname(relativePath)
    .split(/[/\\]/)
    .filter(segment => segment && segment !== "." && segment !== "..")

export default createRule({
  name: "directory-name-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Requires directory names to match the configured casing.",
      recommended: "error",
    },
    messages: {
      invalidDirectoryCase:
        'Directory "{{name}}" in path "{{relativePath}}" does not match the expected casing ({{casings}}).',
    },
    schema: [
      {
        type: "object",
        properties: optionsSchema,
        additionalProperties: false,
      },
    ],
    defaultOptions: [defaultOptions],
  },
  create: context => {
    const options = {
      ...defaultOptions,
      ...(context.options[0] as Options | undefined),
    }

    const casings = getStringCases(options)
    const nameIgnore = getNameIgnore(options)

    return {
      Program: node => {
        const relativePath = path.relative(context.cwd, context.filename)
        const segments = getDirectorySegments(relativePath)

        for (const name of segments) {
          const shouldIgnore = nameIgnore.isIgnored(name)
          const isValid = casings.isValidCase(name)
          if (shouldIgnore || isValid) continue

          context.report({
            node,
            messageId: "invalidDirectoryCase",
            data: { name, relativePath, casings: casings.labels.join(", ") },
          })
        }
      },
    }
  },
})
