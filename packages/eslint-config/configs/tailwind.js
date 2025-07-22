import betterTailwindcss from "eslint-plugin-better-tailwindcss"
import ts from "typescript-eslint"

/** Function to create tailwind eslint rules
 *
 *  @param settings {object}
 *  @param settings.entryPoint {string | undefined} Path to css config (eg: `src/global.css`)
 *  @param settings.tailwindConfig {string | undefined} Path to js config (eg: `tailwind.config.js`)
 *
 *  @returns {import("typescript-eslint").ConfigArray}
 **/
const tailwind = settings =>
  ts.config({
    name: "@pretty-cozy/tailwind",
    plugins: { "better-tailwindcss": betterTailwindcss },
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

export default tailwind
