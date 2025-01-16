// eslint-disable-next-line import/no-useless-path-segments
import rules from "./rules/index.js"

const plugin = {
  meta: {
    name: "@pretty-cozy",
    version: "0.4.0",
  },
  rules,
}

const configs = {
  flat: {
    name: "@pretty-cozy/plugin",
    plugins: {
      [plugin.meta.name]: plugin,
    },
    rules: {
      "@pretty-cozy/no-unspecific-imports": "error",
    },
  },
  legacy: {
    plugins: [plugin.meta.name],
    rules: {
      "@pretty-cozy/no-unspecific-imports": "error",
    },
  },
}

export default {
  ...plugin,
  configs,
}
