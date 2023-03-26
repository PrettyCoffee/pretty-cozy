module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["import", "sonarjs", "unused-imports", "check-file"],
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
  },
}
