import { defineSharedConfig } from "../utils/define-shared-config.ts"
import { mergeConfigs } from "../utils/merge-configs.ts"
import { patterns } from "../utils/patterns.ts"

const envs = defineSharedConfig({
  overrides: [
    {
      files: ["**"],
      env: { builtin: true },
    },
    {
      files: [...patterns.configs, ...patterns.scripts],
      env: { node: true, commonjs: true },
    },
  ],
})

const setup = defineSharedConfig({
  plugins: [
    "oxc",
    "eslint",
    "import",
    "promise",
    "typescript",
    "unicorn",
    "jsdoc",
  ],
  rules: {
    // ruleset that should always be enforced, no matter the enabled categories

    "eslint/arrow-body-style": ["warn", "as-needed"],
    "eslint/complexity": ["error", 12],
    "eslint/no-unused-vars": [
      "error",
      { fix: { imports: "safe-fix", variables: "suggestion" } },
    ],

    "typescript/no-unnecessary-type-assertion": [
      "error",
      { typesToIgnore: ["const"] },
    ],
    "typescript/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
      },
    ],
    "typescript/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports", prefer: "type-imports" },
    ],

    "import/no-cycle": "error",

    "unicorn/no-thenable": "off",
  },
})

// Disable rules that may be enabled by categories, but are not wanted
const disableUnwanted = defineSharedConfig({
  rules: {
    "oxc/no-map-spread": "off",

    "eslint/no-await-in-loop": "off",
    "eslint/no-shadow": "off",

    "unicorn/no-thenable": "off",
  },
  overrides: [
    {
      // test code may not need these strict type rules
      // -> e.g., there are problems with test tables
      files: ["**/*.test.*"],
      rules: {
        "typescript/no-unsafe-argument": "off",
        "typescript/no-unsafe-assignment": "off",
        "typescript/no-unsafe-member-access": "off",
        "typescript/no-unsafe-call": "off",
        "typescript/no-non-null-assertion": "off",
        "typescript/unbound-method": "off",
      },
    },
    {
      // types are annoying to define in js, which results in lots of `any` types
      files: patterns.js,
      rules: {
        "typescript/no-require-imports": "off",
        "typescript/no-unsafe-assignment": "off",
        "typescript/no-unsafe-call": "off",
        "typescript/no-unsafe-member-access": "off",
        "typescript/no-unsafe-argument": "off",
        "typescript/no-unsafe-return": "off",
      },
    },
  ],
})

const customRules = defineSharedConfig({
  jsPlugins: [
    { name: "@pretty-cozy", specifier: "@pretty-cozy/oxlint-config/plugin" },
  ],
  rules: {
    "@pretty-cozy/directory-name-case": [
      "error",
      { kebabCase: true, ignore: ["^@types$", "^\\."] },
    ],
    "@pretty-cozy/file-name-case": [
      "error",
      { kebabCase: true, allowMiddleExtensions: true },
    ],
  },
})

export const base = mergeConfigs(envs, setup, disableUnwanted, customRules)
