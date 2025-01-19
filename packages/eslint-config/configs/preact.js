import ts from "typescript-eslint"

import { createImportOrder } from "./_create-import-order.js"
import react from "./react.js"

export default ts.config(react, {
  name: "@pretty-cozy/preact",
  extends: [createImportOrder({ groups: ["{preact,preact/*}"] })],
  settings: {
    react: {
      version: "16.0",
      pragma: "h",
    },
  },
})
