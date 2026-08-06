import type { ESLint } from "eslint"

import { meta } from "./meta.ts"
import directoryNameCase from "./rules/directory-name-case.ts"
import fileNameCase from "./rules/file-name-case.ts"

type Plugin = ESLint.Plugin

const plugin = {
  meta: { name: meta.name },
  rules: {
    "directory-name-case": directoryNameCase,
    "file-name-case": fileNameCase,
  },
} satisfies Plugin

export default plugin
