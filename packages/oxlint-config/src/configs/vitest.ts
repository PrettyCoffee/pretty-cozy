import { defineSharedConfig } from "../utils/define-shared-config.ts"
import { patterns } from "../utils/patterns.ts"

export const vitest = defineSharedConfig({
  overrides: [
    {
      files: patterns.tests,
      plugins: ["vitest"],
      env: { vitest: true },
      rules: {
        // Picked from style category
        "vitest/consistent-test-filename": [
          "error",
          { pattern: ".+\\.test\\.[a-zA-Z]+$" },
        ],
        "vitest/consistent-each-for": [
          "error",
          { it: "each", describe: "each" },
        ],
        "vitest/consistent-test-it": [
          "error",
          { fn: "it", withinDescribe: "it" },
        ],
        "vitest/consistent-vitest-vi": ["error", { fn: "vi" }],
        "vitest/no-alias-methods": "error",
        "vitest/no-duplicate-hooks": "error",
        "vitest/no-identical-title": "error",
        "vitest/no-import-node-test": "error",
        "vitest/no-interpolation-in-snapshots": "error",
        "vitest/no-large-snapshots": "error",
        "vitest/no-test-prefixes": "error",
        "vitest/no-test-return-statement": "error",
        "vitest/no-unneeded-async-expect-function": "error",
        "vitest/padding-around-after-all-blocks": "error",
        "vitest/padding-around-test-blocks": "error",
        "vitest/prefer-each": "error",
        "vitest/prefer-equality-matcher": "error",
        "vitest/prefer-expect-resolves": "error",
        "vitest/prefer-expect-type-of": "error",
        "vitest/prefer-hooks-in-order": "error",
        "vitest/prefer-hooks-on-top": "error",
        "vitest/prefer-import-in-mock": "error",
        "vitest/prefer-mock-promise-shorthand": "error",
        "vitest/prefer-mock-return-shorthand": "error",
        "vitest/prefer-strict-equal": "error",
        "vitest/prefer-to-be": "error",
        "vitest/prefer-to-be-falsy": "error",
        "vitest/prefer-to-be-object": "error",
        "vitest/prefer-to-be-truthy": "error",
        "vitest/prefer-to-contain": "error",
        "vitest/prefer-to-have-been-called-times": "error",
        "vitest/prefer-to-have-length": "error",
        "vitest/prefer-todo": "error",
        "vitest/require-hook": "error",
        "vitest/require-top-level-describe": "error",

        // Explicitly disable rules that may be enabled by categories
        "vitest/require-mock-type-parameters": "off",
      },
    },
  ],
})
