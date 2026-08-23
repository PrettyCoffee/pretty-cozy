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

const reactHooks = defineSharedConfig({
  plugins: ["react"],
  rules: {
    // Always enable all react-hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/static-components": "error",
    "react-hooks/use-memo": "error",
    "react-hooks/preserve-manual-memoization": "error",
    "react-hooks/incompatible-library": "error",
    "react-hooks/immutability": "error",
    "react-hooks/globals": "error",
    "react-hooks/refs": "error",
    "react-hooks/set-state-in-effect": "error",
    "react-hooks/error-boundaries": "error",
    "react-hooks/purity": "error",
    "react-hooks/set-state-in-render": "error",
    "react-hooks/unsupported-syntax": "error",
    "react-hooks/invariant": "error",
    "react-hooks/syntax": "error",
  },
})

const reactPlugin = defineSharedConfig({
  plugins: ["react"],
  rules: {
    // Picked from restriction category
    "react/no-unknown-property": "error",
    "react/jsx-filename-extension": ["error", { extensions: ["jsx", "tsx"] }],
    "react/no-danger": "error",
    "react/unsupported-syntax": "error",

    // Picked from style category
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/hook-use-state": ["error", { allowDestructuredState: true }],
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-max-depth": ["error", { max: 4 }],
    "react/jsx-pascal-case": ["error", { allowNamespace: true }],
    "react/self-closing-comp": "error",

    // Picked from pedantic category
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/display-name": "error",
    "react/jsx-no-target-blank": "error",

    // Explicitly disable rules that may be enabled by categories
    "react/no-unescaped-entities": "off",
    "react/no-unsafe": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-multi-comp": "off",

    // Not yet implemented, see https://github.com/oxc-project/oxc/issues/1022
    // TODO: Add when oxlint implemented the rules
    // "react/destructuring-assignment": ["error", "always"],
  },
})

const reactPerf = defineSharedConfig({
  plugins: ["react-perf"],
  rules: {
    // Explicitly disable rules that may be enabled by categories
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-array-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",
  },
})

const jsxAlly = defineSharedConfig({
  plugins: ["jsx-a11y"],
  rules: {
    // Explicitly disable rules that may be enabled by categories
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/anchor-ambiguous-text": "off",
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

export const react = mergeConfigs(
  envs,
  reactHooks,
  reactPlugin,
  reactPerf,
  jsxAlly,
  customRules,
)
