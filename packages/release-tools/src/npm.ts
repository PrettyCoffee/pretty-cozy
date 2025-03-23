import { exec } from "./utils/exec"
import { stringifyArgs } from "./utils/stringify-args"

/** Run a npm script.
 * @param script The script to run.
 * @returns A promise that resolves to the script's text output or null if the script failed.
 */
const run = async (script: string) => {
  try {
    return await exec(`npm run ${script}`)
  } catch {
    return null
  }
}

/** Get the current user's npm username.
 * @returns A promise that resolves to the username
 */
const whoAmI = async () => {
  try {
    return await exec(`npm whoami`)
  } catch {
    return null
  }
}

interface LoginArgs {
  scope?: string
}
/** Log in to npm with the specified scope.
 * @param args.scope The npm scope to use.
 */
const login = async (args: LoginArgs) =>
  exec(`npm login ${stringifyArgs(args as Record<string, unknown>)}`)

interface InstallArgs {
  force?: boolean
  dryRun?: boolean
}
/** Install npm packages.
 * @param args.force If set to true, the installation is forced.
 * @param args.dryRun If set to true, the changes are not applied.
 * @returns A promise that resolves when the installation is complete.
 */
const install = async (args: InstallArgs) => {
  await exec(`npm i ${stringifyArgs(args as Record<string, unknown>)}`)
}

interface PublishArgs {
  dryRun?: boolean
  workspace?: string | string[]
  workspaces?: boolean
  access?: "restricted" | "public"
}
/** Publish npm packages.
 * @param args.dryRun If set to true, the changes are not applied.
 * @param args.workspace The specific workspace(s) to publish.
 * @param args.workspaces If set to true, all workspaces are published.
 * @param args.access Whether the access to the module should be public or restricted.
 * @returns A promise that resolves when all packages are published.
 */
const publish = (args: PublishArgs) =>
  exec(`npm publish ${stringifyArgs(args as Record<string, unknown>)}`)

export const npm = {
  run,
  whoAmI,
  login,
  install,
  publish,
}
