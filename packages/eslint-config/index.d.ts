import { ConfigArray } from "typescript-eslint"

declare const configs: {
  baseJs: ConfigArray
  baseTs: ConfigArray
  react: ConfigArray
  preact: ConfigArray
  prettier: ConfigArray
  tailwind: (settings: {
    entryPoint?: string
    tailwindConfig?: string
  }) => ConfigArray
  vitest: ConfigArray
}
export default configs
