import { defineConfig } from "eslint/config"

import { createImportOrder } from "./create-import-order.js"
import react from "./react.js"

export default defineConfig(react, {
  name: "@pretty-cozy/preact",
  settings: {
    react: {
      version: "16.0",
      pragma: "h",
    },
  },
  rules: {
    ...createImportOrder({ groups: ["{preact,preact/*}"] }),
  },
})
