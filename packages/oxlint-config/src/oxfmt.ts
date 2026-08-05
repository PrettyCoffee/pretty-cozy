import { defineConfig } from "oxfmt"

export const oxfmt = defineConfig({
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "pnpm-lock.yaml",
  ],

  semi: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "lf",
  insertFinalNewline: true,

  arrowParens: "avoid",

  singleQuote: false,
  jsxSingleQuote: false,

  jsdoc: {
    preferCodeFences: true,
    separateReturnsFromParam: true,
    separateTagGroups: true,
    descriptionWithDot: true,
  },

  sortPackageJson: false,
  sortImports: {
    newlinesBetween: true,
    groups: [
      "builtin", // node internals (i.e. node:fs)
      "react", // react core modules
      "external", // npm packages
      "internal", // monorepo packages
      "subpath", // local subpath imports
      ["parent", "sibling", "index", "type"], // relative imports
    ],
    customGroups: [
      {
        groupName: "react",
        elementNamePattern: [
          "react",
          "react-dom",
          "react-dom/**",
          "preact",
          "preact/*",
        ],
      },
    ],
  },

  overrides: [
    {
      // Windows-specific files should use CRLF line endings
      files: ["*.bat", "*.cmd", "*.ps1"],
      endOfLine: "crlf",
    },
  ],
})
