import { Linter, Rule } from "eslint"

type Config = Linter.Config
type RuleModule = Rule.RuleModule

declare const plugin: {
  configs: {
    flat: Config
    legacy: Config
  }
  meta: {
    name: string
    version: string
  }
  rules: {
    "no-unspecific-imports": RuleModule
  }
}

export default plugin
