import { defineSharedConfig } from "../utils/define-shared-config.ts"
import { mergeConfigs } from "../utils/merge-configs.ts"

const forbiddenGlobals = [
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "indexedDb",
  "location",
  "navigator",
  "history",
]

const reactHooks = defineSharedConfig({
  plugins: ["react"],
  rules: {
    "eslint/no-restricted-globals": [
      "error",
      ...forbiddenGlobals.map(globalVar => ({
        name: globalVar,
        message:
          "Don't access globals directly, they might not be defined in ssr environments.\n" +
          "Use a helper like this instead:\n" +
          'const getWindow = () => typeof window === "object" ? window : undefined\n' +
          "getWindow()?.localStorage...",
      })),
    ],
  },
})

export const reactRsc = mergeConfigs(reactHooks)
