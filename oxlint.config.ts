import cozy from "@pretty-cozy/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [cozy.base],
  ignorePatterns: ["**/dist/**"],
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error",
  },
})
