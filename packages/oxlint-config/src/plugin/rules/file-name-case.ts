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

interface Options extends StringCaseOptions, NameIgnoreOptions {
  allowMiddleExtensions?: boolean
}

const optionsSchema = {
  ...stringCaseOptionSchema,
  ...nameIgnoreOptionSchema,
  allowMiddleExtensions: { type: "boolean" },
} as const

const defaultOptions: Required<Options> = {
  ...defaultStringCaseOptions,
  ...defaultNameIgnoreOptions,
  allowMiddleExtensions: false,
}

const getFileName = (relativePath: string, allowMiddleExtensions: boolean) => {
  const rawFileName = path.basename(relativePath)
  const baseName = rawFileName
    .replace(/^\./, "") // remove leading .
    .replace(/\.[^.]+$/, "") // remove file extension
  if (!allowMiddleExtensions) return baseName

  return baseName.split(".")[0] ?? ""
}

export default createRule({
  name: "file-name-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Requires file names to match the configured casing.",
      recommended: "error",
    },
    messages: {
      invalidFileCase:
        'File "{{name}}" does not match the expected casing ({{casings}}).',
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
        const rawFileName = path.basename(relativePath)
        const fileName = getFileName(
          relativePath,
          options.allowMiddleExtensions
        )

        const shouldIgnore = nameIgnore.isIgnored(rawFileName)
        const isValid = casings.isValidCase(fileName)
        if (shouldIgnore || isValid) return

        context.report({
          node,
          messageId: "invalidFileCase",
          data: { name: rawFileName, casings: casings.labels.join(", ") },
        })
      },
    }
  },
})
