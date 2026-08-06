import { defineSharedConfig } from "../utils/define-shared-config.ts"
import { mergeConfigs } from "../utils/merge-configs.ts"

const envs = defineSharedConfig({
  overrides: [
    {
      files: ["**/src/**", ".storybook/**"],
      env: { browser: true },
    },
  ],
})

const setup = defineSharedConfig({
  plugins: ["react", "react-perf", "jsx-a11y"],
  rules: {
    // ruleset that should always be enforced, no matter the enabled categories

    "react/react-compiler": "error",
    "react/exhaustive-deps": "error",
    "react/rules-of-hooks": "error",

    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-max-depth": ["error", { max: 4 }],
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-pascal-case": ["error", { allowNamespace: true }],
    "react/no-array-index-key": "error",
  },
})

// Disable rules that may be enabled by categories, but are not wanted
const disableUnwanted = defineSharedConfig({
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",

    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-autofocus": "off",
  },
})

const customRules = defineSharedConfig({
  jsPlugins: [
    { name: "@pretty-cozy", specifier: "@pretty-cozy/oxlint-config/plugin" },
  ],
  rules: {
    "@pretty-cozy/prefer-function-component": "error",
  },
})

export const react = mergeConfigs(envs, setup, disableUnwanted, customRules)
