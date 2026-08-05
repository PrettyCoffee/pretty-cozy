import { meta } from "./meta.js"
import directoryNameCase from "./rules/directory-name-case.js"
import fileNameCase from "./rules/file-name-case.js"

const plugin = {
  meta: { name: meta.name },
  rules: {
    "directory-name-case": directoryNameCase,
    "file-name-case": fileNameCase,
  },
}

export default plugin
