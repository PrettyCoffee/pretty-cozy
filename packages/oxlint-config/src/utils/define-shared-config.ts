import { type OxlintConfig } from "oxlint"

export type SharedOxlintConfig = Pick<
  OxlintConfig,
  "rules" | "overrides" | "plugins" | "jsPlugins"
>

export const defineSharedConfig = (config: SharedOxlintConfig) => config
