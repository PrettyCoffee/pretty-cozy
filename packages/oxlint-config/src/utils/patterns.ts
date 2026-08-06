const js = "js,cjs,mjs,jsx"

export const patterns = {
  stories: [`**/*.stories.*`],
  tests: [`**/*.test.*`, "**/tests/**", "**/__tests__/**"],
  js: [`**/*.{${js}}`],
  scripts: ["**/scripts/**"],
  configs: ["./*", ".storybook/**"],
}
