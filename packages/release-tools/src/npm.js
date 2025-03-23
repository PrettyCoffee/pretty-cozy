const { exec } = require("./utils/exec")
const { stringifyArgs } = require("./utils/stringify-args")

const npm = {
  /**
   * Run an npm script.
   * @param {string} script The script to run.
   * @returns {Promise<string|null>} A promise that resolves to the script's text output or null if the script failed.
   */
  run: script => {
    try {
      return exec(`npm run ${script}`)
    } catch {
      return Promise.resolve(null)
    }
  },
  /**
   * Get the current user's npm username.
   * @returns {Promise<string|null>} A promise that resolves to the username
   */
  whoAmI: () => {
    try {
      return exec(`npm whoami`)
    } catch {
      return Promise.resolve(null)
    }
  },
  /**
   * Log in to npm with the specified scope.
   * @param {{scope?: string}} args
   * @param {string | undefined} args.scope The npm scope to use.
   * @returns {Promise<string>}
   */
  login: async args => exec(`npm login ${stringifyArgs(args)}`),
  /**
   * Install npm packages.
   * @param {{ force?: boolean, dryRun?: boolean }} args
   * @param args.force If set to true, the installation is forced.
   * @param args.dryRun If set to true, the changes are not applied.
   * @returns {Promise<void>} A promise that resolves when the installation is complete.
   */
  install: async args => {
    await exec(`npm i ${stringifyArgs(args)}`)
  },
  /**
   * Publish npm packages.
   * @param {{ dryRun?: boolean, workspace?: string | string[], workspaces?: boolean, access?: "restricted" | "public" }} args
   * @param args.dryRun If set to true, the changes are not applied.
   * @param args.workspace The specific workspace(s) to publish.
   * @param args.workspaces If set to true, all workspaces are published.
   * @param args.access Whether the access to the module should be public or restricted.
   * @returns {Promise<string>} A promise that resolves when all packages are published.
   */
  publish: args => exec(`npm publish ${stringifyArgs(args)}`),
}

module.exports = { npm }
