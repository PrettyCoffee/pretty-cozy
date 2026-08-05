import path from "node:path"

import { createRule } from "../utils/create-rule.js"
import {
  defaultNameIgnoreOptions,
  getNameIgnore,
  nameIgnoreOptionSchema,
} from "../utils/name-ignore.js"
import {
  defaultStringCaseOptions,
  getStringCases,
  stringCaseOptionSchema,
} from "../utils/string-case.js"

const optionsSchema = {
  ...stringCaseOptionSchema,
  ...nameIgnoreOptionSchema,
  allowMiddleExtensions: { type: "boolean" },
}

const defaultOptions = {
  ...defaultStringCaseOptions,
  ...defaultNameIgnoreOptions,
  allowMiddleExtensions: false,
}

const getFileName = (relativePath, allowMiddleExtensions) => {
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
      ...context.options[0],
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
