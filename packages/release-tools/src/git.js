const { exec } = require("./utils/exec")
const { stringifyArgs } = require("./utils/stringifyArgs")

const removeCommitHash = commit => commit.replace(/^[a-f0-9]+ /, "")

/**
 * Promise bindings for git commands.
 */
const git = {
  /** Commits all pending changes to the repository.
   *
   *  @param {{ message: string, dryRun?: boolean, allowEmpty?: boolean }} args
   *  @param args.message The commit message.
   *  @param args.dryRun If set to true, the changes are not applied.
   *  @param args.allowEmpty If set to true, an empty commit is allowed.
   *
   *  @returns {Promise<void>}
   */
  commit: async ({ message, ...args }) => {
    await exec(`git add -A`)
    await exec(`git commit -m "${message}" ${stringifyArgs(args)}`)
  },

  /** Pushes changes to the remote repository.
   *
   *  @param {{ dryRun?: boolean }} args
   *  @param args.dryRun If set to true, the changes are not applied.
   *
   *  @returns {Promise<void>}
   */
  push: async args => {
    await exec(`git push ${stringifyArgs(args)}`)
  },

  /** Creates a new tag on the current commit.
   *
   *  @param {{ version: string, message?: string, dryRun?: boolean }} args
   *  @param args.version The version number to tag the latest commit with.
   *  @param args.dryRun If set to true, the changes are not applied.
   *
   *  @returns {Promise<void>}
   */
  tag: async ({ version, dryRun, ...args }) => {
    if (dryRun) return
    await exec(`git tag -a ${version} ${stringifyArgs(args)}`)
  },

  /** Stashes all pending changes in the repository.
   *
   *  @returns {Promise<void>}
   */
  stash: async () => {
    await exec(`git stash --include-untracked`)
  },

  /** Applies the latest stash to the repository.
   *
   *  @returns {Promise<void>}
   */
  stashPop: async () => {
    await exec(`git stash pop`)
  },

  /** Retrieves the latest tag in the repository.
   *
   *  @returns {Promise<string>} A promise that resolves to the latest tag.
   */
  latestTag: () => exec(`git describe --tags --abbrev=0`),

  /** Retrieves all tags in the repository.
   *
   *  @returns {Promise<string[]>} A promise that resolves to an array of all tags.
   */
  allTags: () =>
    exec(`git tag -l --sort=version:refname`).then(tags =>
      tags.split("\n").filter(version => /^\d+\.\d+\.\d+$/.test(version))
    ),

  /** Retrieves the commits between two tags.
   *
   *  @param {string | undefined} startTag The starting tag.
   *  @param {string | undefined} endTag The ending tag.
   *
   *  @returns {Promise<string[]>} A promise that resolves to an array of commits between the specified tags.
   */
  getCommits: async (startTag, endTag) => {
    const tags = await git.allTags()
    const start = startTag ?? tags.at(-1)
    const end = endTag ?? "HEAD"

    const command = `git log ${start}..${end} --oneline`
    return exec(command).then(commits =>
      commits.split("\n").filter(Boolean).map(removeCommitHash)
    )
  },
}

module.exports = { git }
