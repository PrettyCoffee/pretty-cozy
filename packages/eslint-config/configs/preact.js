import ts from "typescript-eslint"

import { createImportOrder } from "./_create-import-order.js"
import { prettier } from "./_prettier.js"
import react from "./react.js"

export default ts.config(
  react,
  createImportOrder({ main: ["preact", "preact/hooks"] }),
  prettier,

  {
    settings: {
      react: {
        version: "16.0",
        pragma: "h",
      },
    },
  }
)
