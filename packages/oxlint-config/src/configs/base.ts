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

const eslint = defineSharedConfig({
  plugins: ["eslint"],
  rules: {
    // Configuration of rules enabled by correctness / suspicious / perf category
    "eslint/no-unused-vars": [
      "error",
      { fix: { imports: "safe-fix", variables: "suggestion" } },
    ],

    // Picked from restriction category
    "eslint/complexity": ["error", 12],
    "eslint/no-empty-function": "error",
    "eslint/no-use-before-define": "error",
    "eslint/no-alert": "error",
    "eslint/no-var": "error",
    "eslint/no-empty": ["error", { allowEmptyCatch: false }],
    "eslint/class-methods-use-this": "error",
    "eslint/no-implicit-globals": "error",
    "eslint/no-bitwise": "error",
    "eslint/no-param-reassign": "error",
    "eslint/no-proto": "error",

    // Picked from style category
    "eslint/arrow-body-style": ["error", "as-needed"],
    "eslint/prefer-const": "error",
    "eslint/prefer-rest-params": "error",
    "eslint/prefer-spread": "error",
    "eslint/default-case-last": "error",
    "eslint/default-param-last": "error",
    "eslint/max-params": "error",
    "eslint/max-statements": ["error", 15],
    "eslint/no-duplicate-imports": "error",
    "eslint/no-multi-assign": "error",
    "eslint/no-template-curly-in-string": "error",
    "eslint/prefer-arrow-callback": "error",
    "eslint/prefer-regex-literals": "error",
    "eslint/yoda": "error",

    // Picked from pedantic category
    "eslint/require-await": "error",
    "eslint/no-throw-literal": "error",

    // Explicitly disable rules that may be enabled by categories
    "eslint/no-undefined": "off",
    "eslint/no-eq-null": "off",
    "eslint/no-plusplus": "off",
    "eslint/no-console": "off",
    "eslint/no-await-in-loop": "off",
    "eslint/no-magic-numbers": "off",
    "eslint/no-ternary": "off",
    "eslint/no-nested-ternary": "off",
    "eslint/no-shadow": "off",
    "eslint/no-underscore-dangle": "off",
  },
})

const oxc = defineSharedConfig({
  plugins: ["oxc"],
  rules: {
    // Explicitly disable rules that may be enabled by categories
    "oxc/no-map-spread": "off",
  },
})

const typescript = defineSharedConfig({
  plugins: ["typescript"],
  rules: {
    // Configuration of rules enabled by correctness / suspicious / perf category
    "typescript/no-unnecessary-type-assertion": [
      "error",
      { typesToIgnore: ["const"] },
    ],
    "typescript/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports", prefer: "type-imports" },
    ],

    // Picked from restriction category
    "typescript/no-explicit-any": "error",
    "typescript/no-namespace": "error",
    "typescript/no-require-imports": "error",
    "typescript/non-nullable-type-assertion-style": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error",
    "typescript/no-non-null-assertion": "error",

    // Picked from style category
    "typescript/array-type": "error",
    "typescript/adjacent-overload-signatures": "error",
    "typescript/ban-tslint-comment": "error",
    "typescript/class-literal-property-style": "error",
    "typescript/consistent-generic-constructors": "error",
    "typescript/consistent-indexed-object-style": "error",
    "typescript/consistent-type-assertions": "error",
    "typescript/consistent-type-definitions": "error",
    "typescript/dot-notation": [
      "error",
      {
        allowIndexSignaturePropertyAccess: false,
        allowKeywords: true,
        allowPattern: "",
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
      },
    ],
    "typescript/no-inferrable-types": "error",
    "typescript/prefer-find": "error",
    "typescript/prefer-for-of": "error",
    "typescript/prefer-function-type": "error",
    "typescript/prefer-regexp-exec": "error",
    "typescript/prefer-string-starts-ends-with": "error",
    "typescript/prefer-reduce-type-parameter": "error",
    "typescript/no-empty-interface": "error",

    // Picked from pedantic category
    "typescript/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
      },
    ],
    "typescript/no-misused-promises": "error",
    "typescript/no-unsafe-argument": "error",
    "typescript/no-unsafe-assignment": "error",
    "typescript/no-unsafe-call": "error",
    "typescript/no-unsafe-function-type": "error",
    "typescript/no-unsafe-member-access": "error",
    "typescript/no-unsafe-return": "error",
    "typescript/restrict-plus-operands": "error",
    "typescript/prefer-includes": "error",
    "typescript/no-deprecated": "error",
    "typescript/only-throw-error": "error",
    "typescript/prefer-promise-reject-errors": "error",
    "typescript/prefer-ts-expect-error": "error",
    "typescript/require-await": "error",

    // Picked from nursery category
    "typescript/prefer-optional-chain": "error",
    "typescript/no-unnecessary-condition": "error",

    // Explicitly disable rules that may be enabled by categories
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/consistent-return": "off",
    "typescript/restrict-template-expressions": "off",
    "typescript/unbound-method": "off",
    "typescript/no-unnecessary-boolean-literal-compare": "off",
    "typescript/no-empty-object-type": "off",
    "typescript/prefer-nullish-coalescing": "off",
    "typescript/explicit-function-return-type": "off",
    "typescript/explicit-module-boundary-types": "off",
    "typescript/no-invalid-void-type": "off",
    "typescript/no-confusing-void-expression": "off",
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

const imports = defineSharedConfig({
  plugins: ["import"],
  rules: {
    // Configuration of rules enabled by correctness / suspicious / perf category

    // Picked from restriction category
    "import/no-cycle": "error",

    // Picked from style category
    "import/no-duplicates": "error",
    "import/newline-after-import": "error",
    "import/first": "error",

    // Explicitly disable rules that may be enabled by categories
    "import/default": "off",
    "import/namespace": "off",
    "import/named": "off",
    "import/export": "off",

    // Not yet implemented, see https://github.com/oxc-project/oxc/issues/1117
    // TODO: Add when oxlint implemented the rules
    // "import/no-useless-path-segments": ["error", { "noUselessIndex": true }],
    // "import/no-extraneous-dependencies": "error",
  },
})

const unicorn = defineSharedConfig({
  plugins: ["unicorn"],
  rules: {
    // Configuration of rules enabled by correctness / suspicious / perf category

    // Picked from restriction category
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/prefer-modern-math-apis": "error",

    // Picked from style category
    "unicorn/error-message": "error",
    "unicorn/no-await-expression-member": "error",
    "unicorn/numeric-separators-style": "error",
    "unicorn/prefer-default-parameters": "error",
    "unicorn/prefer-logical-operator-over-ternary": "error",
    "unicorn/prefer-object-from-entries": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-structured-clone": "error",
    "unicorn/prefer-ternary": ["error", "only-single-line"],
    "unicorn/prefer-modern-dom-apis": "error",
    "unicorn/require-array-join-separator": "error",
    "unicorn/max-nested-calls": "error",
    "unicorn/prefer-class-fields": "error",
    "unicorn/prefer-negative-index": "error",

    // Picked from pedantic category
    "unicorn/explicit-length-check": "error",
    "unicorn/no-hex-escape": "error",
    "unicorn/no-lonely-if": "error",
    "unicorn/no-useless-promise-resolve-reject": "error",
    "unicorn/no-useless-switch-case": "error",
    "unicorn/no-unreadable-iife": "error",
    "unicorn/prefer-array-some": "error",
    "unicorn/prefer-date-now": "error",
    "unicorn/prefer-string-replace-all": "error",
    "unicorn/no-useless-undefined": "error",
    "unicorn/prefer-dom-node-append": "error",
    "unicorn/prefer-dom-node-dataset": "error",
    "unicorn/prefer-dom-node-remove": "error",
    "unicorn/prefer-math-min-max": "error",
    "unicorn/prefer-math-trunc": "error",
    "unicorn/prefer-regexp-test": "error",
    "unicorn/prefer-single-call": "error",
    "unicorn/prefer-string-slice": "error",
    "unicorn/prefer-type-error": "error",

    // Explicitly disable rules that may be enabled by categories
    "unicorn/no-thenable": "off",

    // Not yet implemented, see https://github.com/oxc-project/oxc/issues/684
    // TODO: Add when oxlint implemented the rules
    //"unicorn/consistent-destructuring": "error",
    //"unicorn/expiring-todo-comments": "error",
    //"unicorn/no-unused-properties": "error",
    //"unicorn/prefer-switch": "error",
  },
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

export const base = mergeConfigs(
  envs,
  setup,
  eslint,
  oxc,
  typescript,
  imports,
  unicorn,
  customRules,
)
