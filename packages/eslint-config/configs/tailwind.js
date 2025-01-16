import tailwind from "eslint-plugin-tailwindcss"
import ts from "typescript-eslint"

/** @type {["error", { callees: string[] }]} */
const tailwindConfig = [
  "error",
  { callees: ["classnames", "cn", "cva", "clsx"] },
]

export default ts.config({
  name: "@pretty-cozy/tailwind",
  plugins: {
    tailwindcss: tailwind,
  },
  rules: {
    "tailwindcss/classnames-order": tailwindConfig,
    "tailwindcss/no-contradicting-classname": tailwindConfig,
    "tailwindcss/no-unnecessary-arbitrary-value": tailwindConfig,
    "tailwindcss/enforces-shorthand": tailwindConfig,
  },
})
