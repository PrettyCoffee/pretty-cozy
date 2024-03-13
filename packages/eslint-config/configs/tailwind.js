const tailwindConfig = [
  "error",
  { callees: ["classnames", "cn", "cva", "clsx"] },
]

module.exports = {
  plugins: ["tailwindcss"],
  rules: {
    "tailwindcss/classnames-order": tailwindConfig,
    "tailwindcss/no-contradicting-classname": tailwindConfig,
    "tailwindcss/no-unnecessary-arbitrary-value": tailwindConfig,
    "tailwindcss/enforces-shorthand": tailwindConfig,
  },
}
