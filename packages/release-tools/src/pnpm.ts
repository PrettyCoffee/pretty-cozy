import { $ } from "./utils/shell"
import { stringifyArgs } from "./utils/stringify-args"

/** Run a npm script.
 * @param script The script to run.
 * @returns A promise that resolves to the script's text output or null if the script failed.
 */
const run = async (script: string) => {
  try {
    return await $`pnpm run ${script}`.text()
  } catch {
    return null
  }
}

interface InstallArgs {
  force?: boolean
}
/** Install npm packages.
 * @param args.force If set to true, the installation is forced.
 * @param args.dryRun If set to true, the changes are not applied.
 * @returns A promise that resolves when the installation is complete.
 */
const install = async (args: InstallArgs) => {
  await $`pnpm i ${stringifyArgs(args as Record<string, unknown>)}`.quiet()
}

export const pnpm = {
  run,
  install,
}
