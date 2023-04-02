module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:sonarjs/recommended",
    "plugin:@pretty-cozy/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["check-file", "import", "sonarjs", "unused-imports"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        singleQuote: false,
        trailingComma: "es5",
        semi: false,
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "auto",
        jsxSingleQuote: false,
      },
    ],

    "check-file/folder-naming-convention": [
      "error",
      { "src/**": "KEBAB_CASE" },
    ],

    "unused-imports/no-unused-imports": "error",

    "import/no-deprecated": "error",
    "import/no-empty-named-blocks": "error",
    "import/no-self-import": "error",
    "import/newline-after-import": ["error", { count: 1 }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: false,
        optionalDependencies: false,
      },
    ],
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true,
      },
    ],
  },
}
