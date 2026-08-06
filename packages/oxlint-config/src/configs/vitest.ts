import { defineSharedConfig } from "../utils/define-shared-config.ts"
import { patterns } from "../utils/patterns.ts"

export const vitest = defineSharedConfig({
  overrides: [
    {
      files: patterns.tests,
      plugins: ["vitest"],
      env: { vitest: true },
    },
  ],
})
