module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
  },
  extends: [
    "./base.js",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": { typescript: {} },
  },
  overrides: [
    {
      files: ["src/@types/**"],
      rules: {
        "check-file/folder-naming-convention": "off",
      },
    },
  ],
}
