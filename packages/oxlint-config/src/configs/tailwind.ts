import betterTailwindcss from "eslint-plugin-better-tailwindcss"

import { defineSharedConfig } from "../utils/define-shared-config.ts"

export const tailwind = defineSharedConfig({
  jsPlugins: ["eslint-plugin-better-tailwindcss"],
  rules: {
    ...betterTailwindcss.configs.recommended.rules,
    "better-tailwindcss/no-conflicting-classes": "error",
    "better-tailwindcss/enforce-shorthand-classes": "error",
    "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    "better-tailwindcss/enforce-consistent-class-order": "off", // handled by oxfmt
  },
})
