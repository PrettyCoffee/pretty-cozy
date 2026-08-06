import { type SharedOxlintConfig } from "./define-shared-config"

export const mergeConfigs = (...configs: SharedOxlintConfig[]) =>
  configs.reduce((merged, { jsPlugins, plugins, rules, overrides }) => {
    if (plugins) {
      merged.plugins ??= []
      merged.plugins.push(...plugins)
    }
    if (jsPlugins) {
      merged.jsPlugins ??= []
      merged.jsPlugins.push(...jsPlugins)
    }
    if (overrides) {
      merged.overrides ??= []
      merged.overrides.push(...overrides)
    }
    if (rules) {
      merged.rules ??= {}
      merged.rules = Object.assign(merged.rules, rules)
    }
    return merged
  }, {})
