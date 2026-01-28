import vitestPlugin from "@vitest/eslint-plugin"
import { defineConfig } from "eslint/config"
import globals from "globals"

export default defineConfig({
  name: "@ptvgroup/vitest",
  files: ["**/*.test.*"],
  plugins: {
    vitest: vitestPlugin,
  },
  languageOptions: {
    globals: globals.vitest,
  },
  rules: {
    ...vitestPlugin.configs.recommended.rules,
    "vitest/no-disabled-tests": "off",

    "vitest/no-alias-methods": "error",
    "vitest/no-conditional-expect": "error",
    "vitest/no-done-callback": "error",
    "vitest/no-focused-tests": "error",
    "vitest/no-interpolation-in-snapshots": "error",
    "vitest/no-mocks-import": "error",
    "vitest/no-standalone-expect": "error",
    "vitest/no-test-prefixes": "error",
    "vitest/valid-expect-in-promise": "error",
    "vitest/prefer-to-be": "error",
    "vitest/prefer-to-contain": "error",
    "vitest/prefer-to-have-length": "error",
  },
})
