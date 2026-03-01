import vitestPlugin from "@vitest/eslint-plugin"
import { defineConfig, type OxlintConfig } from "oxlint"
import betterTailwindcss from "eslint-plugin-better-tailwindcss"


const nodeConfig = defineConfig({
  env: {
    node: true,
  },
  plugins: ["node"],
  rules: {
    "eslint/no-console": "off",
    "typescript/no-require-imports": "off",
    "import/no-commonjs": "off",
  },
})

const tailwind = (settings: {
  entryPoint?: string,
  tailwindConfig?: string
}) => defineConfig({
  jsPlugins: ["eslint-plugin-better-tailwindcss"],
  settings: {
    "better-tailwindcss": {
      ...settings,
      callees: ["classnames", "cn", "cva", "clsx"],
    },
  },
  rules: {
    ...betterTailwindcss.configs.recommended.rules,
    "better-tailwindcss/no-conflicting-classes": "error",
    "better-tailwindcss/enforce-shorthand-classes": "error",
    "better-tailwindcss/enforce-consistent-line-wrapping": "off",
  },
})

const reactConfig = defineConfig({
  env: {
    browser: true,
  },
  plugins: ["react", "react-perf", "jsx-a11y"],
  jsPlugins: [
    { name: "react-hooks-js", specifier: "eslint-plugin-react-hooks" },
    "eslint-plugin-react-prefer-function-component"
  ],
  rules: {
    "react-prefer-function-component/react-prefer-function-component": "error",
    
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    
    "react-hooks-js/config": "error",
    "react-hooks-js/error-boundaries": "error",
    "react-hooks-js/component-hook-factories": "error",
    "react-hooks-js/gating": "error",
    "react-hooks-js/globals": "error",
    "react-hooks-js/immutability": "error",
    "react-hooks-js/preserve-manual-memoization": "error",
    "react-hooks-js/purity": "error",
    "react-hooks-js/refs": "error",
    "react-hooks-js/set-state-in-effect": "error",
    "react-hooks-js/set-state-in-render": "error",
    "react-hooks-js/static-components": "error",
    "react-hooks-js/unsupported-syntax": "warn",
    "react-hooks-js/use-memo": "error",
    "react-hooks-js/incompatible-library": "warn",
    
    "react/display-name": "error",
    "react/jsx-no-target-blank": "error",
    "react/destructuring-assignment": ["error", "always"],
    "react/hook-use-state": ["error", { allowDestructuredState: true }],
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-max-depth": ["error", { max: 4 }],
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-pascal-case": ["error", { allowNamespace: true }],
    "react/no-array-index-key": "error",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],

    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",

    "jsx-a11y/no-onchange": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/anchor-ambiguous-text": "off",
    "jsx-a11y/label-has-for": "off",
  },
})

const vitestConfig = defineConfig({
  overrides: [
    {
      plugins: ["vitest"],
      files: ["**/*.test.*"],
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
    },
  ],
})

const recommendedTypeChecked: OxlintConfig["rules"] = {
  "typescript/await-thenable": "error",
  "typescript/ban-ts-comment": "error",
  "eslint/no-array-constructor": "off",
  "typescript/no-array-constructor": "error",
  "typescript/no-array-delete": "error",
  "typescript/no-base-to-string": "error",
  "typescript/no-duplicate-enum-values": "error",
  "typescript/no-duplicate-type-constituents": "error",
  "typescript/no-empty-object-type": "error",
  "typescript/no-explicit-any": "error",
  "typescript/no-extra-non-null-assertion": "error",
  "typescript/no-floating-promises": "error",
  "typescript/no-for-in-array": "error",
  "eslint/no-implied-eval": "off",
  "typescript/no-implied-eval": "error",
  "typescript/no-misused-new": "error",
  "typescript/no-misused-promises": "error",
  "typescript/no-namespace": "error",
  "typescript/no-non-null-asserted-optional-chain": "error",
  "typescript/no-redundant-type-constituents": "error",
  "typescript/no-require-imports": "error",
  "typescript/no-this-alias": "error",
  "typescript/no-unnecessary-type-assertion": "error",
  "typescript/no-unnecessary-type-constraint": "error",
  "typescript/no-unsafe-argument": "error",
  "typescript/no-unsafe-assignment": "error",
  "typescript/no-unsafe-call": "error",
  "typescript/no-unsafe-declaration-merging": "error",
  "typescript/no-unsafe-enum-comparison": "error",
  "typescript/no-unsafe-function-type": "error",
  "typescript/no-unsafe-member-access": "error",
  "typescript/no-unsafe-return": "error",
  "typescript/no-unsafe-unary-minus": "error",
  "eslint/no-unused-expressions": "off",
  "typescript/no-unused-expressions": "error",
  "eslint/no-unused-vars": "off",
  "typescript/no-unused-vars": "error",
  "typescript/no-wrapper-object-types": "error",
  "eslint/no-throw-literal": "off",
  "typescript/only-throw-error": "error",
  "typescript/prefer-as-const": "error",
  "typescript/prefer-namespace-keyword": "error",
  "eslint/prefer-promise-reject-errors": "off",
  "typescript/prefer-promise-reject-errors": "error",
  "eslint/require-await": "off",
  "typescript/require-await": "error",
  "typescript/restrict-plus-operands": "error",
  "typescript/restrict-template-expressions": "error",
  "typescript/triple-slash-reference": "error",
  "typescript/unbound-method": "error",
}

const stylisticTypeChecked: OxlintConfig["rules"] = {
  "typescript/adjacent-overload-signatures": "error",
  "typescript/array-type": "error",
  "typescript/ban-tslint-comment": "error",
  "typescript/class-literal-property-style": "error",
  "typescript/consistent-generic-constructors": "error",
  "typescript/consistent-indexed-object-style": "error",
  "typescript/consistent-type-assertions": "error",
  "typescript/consistent-type-definitions": "error",
  "eslint/dot-notation": "off",
  "typescript/dot-notation": "error",
  "typescript/no-confusing-non-null-assertion": "error",
  "eslint/no-empty-function": "off",
  "typescript/no-empty-function": "error",
  "typescript/no-inferrable-types": "error",
  "typescript/non-nullable-type-assertion-style": "error",
  "typescript/prefer-find": "error",
  "typescript/prefer-for-of": "error",
  "typescript/prefer-function-type": "error",
  "typescript/prefer-includes": "error",
  "typescript/prefer-nullish-coalescing": "error",
  "typescript/prefer-optional-chain": "error",
  "typescript/prefer-regexp-exec": "error",
  "typescript/prefer-string-starts-ends-with": "error",
}

const typescript = defineConfig({
  plugins: ["typescript"],
  rules: {
    ...recommendedTypeChecked,
    ...stylisticTypeChecked,
    "sonarjs/deprecation": "off",
    "import/no-deprecated": "off",
    "typescript/no-deprecated": "error",

    "sonarjs/no-incorrect-string-concat": "off",
    "typescript/restrict-plus-operands": "error",

    "sonarjs/prefer-regexp-exec": "off",
    "typescript/prefer-regexp-exec": "error",

    // these interfere with DX too much in some scenarios
    "typescript/no-unused-vars": "off",
    "typescript/explicit-function-return-type": "off",
    "typescript/explicit-module-boundary-types": "off",
    "typescript/restrict-template-expressions": "off",
    "typescript/prefer-promise-reject-errors": "off",
    "typescript/no-empty-object-type": "off",
    "typescript/no-explicit-any": "off",
    "typescript/no-invalid-void-type": "off",
    "typescript/no-confusing-void-expression": "off",
    "typescript/prefer-nullish-coalescing": "off",
    "typescript/array-type": "off",
    "typescript/no-unnecessary-boolean-literal-compare": "off",
    "typescript/unbound-method": "off",

    // additional typescript rules
    "typescript/no-use-before-define": "error",
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

    // Rules picked from ts.configs.strictTypeChecked
    "typescript/no-misused-spread": "error",
    "typescript/no-unnecessary-condition": "error",
    "typescript/no-unnecessary-template-expression": "error",
    "typescript/no-unnecessary-type-arguments": "error",
    "typescript/no-unnecessary-type-parameters": "error",
    "typescript/prefer-reduce-type-parameter": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error",
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
      files: ["**/*.@(js|cjs|mjs)"],
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

const sonarJs = defineConfig({
  jsPlugins: ["eslint-plugin-sonarjs"],
  rules: {
    "sonarjs/anchor-precedence": "error",
    "sonarjs/assertions-in-tests": "error",
    "sonarjs/cognitive-complexity": "error",
    "sonarjs/concise-regex": "error",
    "sonarjs/destructuring-assignment-syntax": "error",
    "sonarjs/duplicates-in-character-class": "error",
    "sonarjs/existing-groups": "error",
    "sonarjs/function-inside-loop": "error",
    "sonarjs/future-reserved-words": "error",
    "sonarjs/generator-without-yield": "error",
    "sonarjs/jsx-no-leaked-render": "error",
    "sonarjs/nested-control-flow": "error",
    "sonarjs/no-array-delete": "error",
    "sonarjs/no-collapsible-if": "error",
    "sonarjs/no-duplicate-in-composite": "error",
    "sonarjs/no-empty-alternatives": "error",
    "sonarjs/no-exclusive-tests": "error",
    "sonarjs/no-globals-shadowing": "error",
    "sonarjs/no-identical-conditions": "error",
    "sonarjs/no-identical-expressions": "error",
    "sonarjs/no-identical-functions": "error",
    "sonarjs/no-ignored-exceptions": "error",
    "sonarjs/no-incorrect-string-concat": "error",
    "sonarjs/no-invalid-regexp": "error",
    "sonarjs/no-misleading-array-reverse": "error",
    "sonarjs/no-redundant-parentheses": "error",
    "sonarjs/no-small-switch": "error",
    "sonarjs/no-try-promise": "error",
    "sonarjs/no-useless-react-setstate": "error",
    "sonarjs/prefer-regexp-exec": "error",
    "sonarjs/super-invocation": "error",
  },
})

const unicorn = defineConfig({
  plugins: ["unicorn"],
  rules: {
    "unicorn/no-thenable": "off",
    "unicorn/prefer-module": "off",
    "unicorn/no-array-for-each": "off",

    "unicorn/consistent-destructuring": "error",
    "unicorn/consistent-function-scoping": "error",
    "unicorn/error-message": "error",
    "unicorn/expiring-todo-comments": "error",
    "unicorn/explicit-length-check": "error",
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/no-await-expression-member": "error",
    "unicorn/no-await-in-promise-methods": "error",
    "unicorn/no-empty-file": "error",
    "unicorn/no-hex-escape": "error",
    "unicorn/no-unused-properties": "error",
    "unicorn/no-useless-length-check": "error",
    "unicorn/no-useless-promise-resolve-reject": "error",
    "unicorn/no-useless-switch-case": "error",
    "unicorn/numeric-separators-style": "error",
    "unicorn/prefer-array-flat-map": "error",
    "unicorn/prefer-array-some": "error",
    "unicorn/prefer-date-now": "error",
    "unicorn/prefer-default-parameters": "error",
    "unicorn/prefer-logical-operator-over-ternary": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/prefer-object-from-entries": "error",
    "unicorn/prefer-set-has": "error",
    "unicorn/prefer-spread": "error",
    "unicorn/prefer-string-replace-all": "error",
    "unicorn/prefer-string-starts-ends-with": "error",
    "unicorn/prefer-structured-clone": "error",
    "unicorn/prefer-switch": "error",
    "unicorn/require-array-join-separator": "error",
    "unicorn/switch-case-braces": ["error", "avoid"],
    "unicorn/template-indent": "error",
  },
})

const checkFile = defineConfig({
  jsPlugins: ["eslint-plugin-check-file"],
  rules: {
    "check-file/folder-naming-convention": [
      "error",
      { "**/!(@types|.*)/": "KEBAB_CASE" },
    ],
    "check-file/filename-naming-convention": [
      "error",
      { "*/**": "KEBAB_CASE" },
      { ignoreMiddleExtensions: true },
    ],
  },
  overrides: [
    {
      files: ["*", ".storybook/**"],
      rules: {
        "check-file/folder-naming-convention": "off",
        "check-file/filename-naming-convention": "off",
      },
    },
  ],
})

const imprt = defineConfig({
  plugins: ["import"],
  rules: {
    "import/no-default-export": "off",
    "import/no-relative-parent-imports": "off",

    "import/no-cycle": "error",
    "import/namespace": "error",
    "import/no-deprecated": "warn",
    "import/no-duplicates": "error",
    "import/no-empty-named-blocks": "error",
    "import/no-self-import": "error",
    "import/newline-after-import": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
  },
  overrides: [
    {
      files: ["scripts/**"],
      rules: {
        "import/unambiguous": "off",
      },
    },
    {
      files: [
        "*",
        "scripts/**",
        ".storybook/**",
        "**/*.test.*",
        "**/*.stories.*",
      ],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
})

const eslint = defineConfig({
  plugins: ["eslint"],
  rules: {
    "eslint/no-shadow": "off",
    "eslint/no-await-in-loop": "off",
    "eslint/no-undefined": "off",
    "eslint/no-plusplus": "off",
    "eslint/no-void": "off",
    "eslint/no-eq-null": "off",

    "eslint/arrow-body-style": ["warn", "as-needed"],
    "eslint/no-alert": "error",
    "eslint/complexity": ["error", 10],

    /** TODO: Enable autofix when published
     *  This replaces the unused-imports plugin
     *  @see https://github.com/oxc-project/oxc/issues/18301
     **/
    // "eslint/no-unused-vars": ["error", { fix: { imports: "fix", variables: "fix", }, }, ],
    "eslint/no-unused-vars": "error",
  },
})

const baseConfig = defineConfig({
  env: {
    builtin: true,
    es2024: true,
    "shared-node-browser": true,
  },
  categories: {
    correctness: "error",
    nursery: "error",
    perf: "error",
    restriction: "error",
    suspicious: "error",
  },
  plugins: ["jsdoc", "promise"],
  extends: [eslint, imprt, unicorn, sonarJs, checkFile],
})

export default defineConfig({
  extends: [baseConfig, typescript, tailwind({}), nodeConfig, vitestConfig, reactConfig],
  env: {
    // seems like a bug in oxlint?
    ...baseConfig.env,
    ...nodeConfig.env,
    ...reactConfig.env,
  },
  rules: {
    "typescript/no-non-null-assertion": "off",
  },
})
