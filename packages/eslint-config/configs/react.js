const base = require("./base")

const importOrder = base.rules["import/order"].find(
  item => typeof item === "object"
)

module.exports = {
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-prefer-function-component/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["jsx-a11y", "react", "react-prefer-function-component"],
  rules: {
    "import/order": [
      "error",
      {
        ...importOrder,
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
      },
    ],

    "react/react-in-jsx-scope": "off",
    "react/destructuring-assignment": ["error", "always"],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/hook-use-state": "error",
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-max-depth": ["error", { max: 4 }],
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-pascal-case": ["error", { allowNamespace: true }],
    "react/no-array-index-key": "error",

    "jsx-a11y/no-onchange": "off", // deprecated rule, will be deleted in a future release
    "jsx-a11y/label-has-associated-control": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
