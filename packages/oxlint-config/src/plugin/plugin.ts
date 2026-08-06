import type { ESLint } from "eslint"

import { meta } from "./meta.ts"
import directoryNameCase from "./rules/directory-name-case.ts"
import fileNameCase from "./rules/file-name-case.ts"
import preferFunctionComponent from "./rules/prefer-function-component.ts"

type Plugin = ESLint.Plugin

const plugin = {
  meta: { name: meta.name },
  rules: {
    "directory-name-case": directoryNameCase,
    "file-name-case": fileNameCase,
    "prefer-function-component": preferFunctionComponent,
  },
} satisfies Plugin

export default plugin
