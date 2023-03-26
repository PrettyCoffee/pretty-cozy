const { execSync } = require("child_process")

const pipeSteps = require("./pipeSteps")

const git = {
  stash: () => execSync(`git stash --include-untracked`),
  stashPop: () => execSync(`git stash pop`),
  add: (pattern = "./") => execSync(`git add ${pattern}`),
  commit: message => execSync(`git commit -m "${message}"`),
  tag: (version, message) => execSync(`git tag -a v${version} -m "${message}"`),
}

/** Function to create git commits.
 *  Present changes are stashed before executing the callback and reapplied afterwards.
 *
 * @typedef {{ message: string, tag?: string, tagMessage?: string }} CommitConfig
 * @typedef {{ run: () => void, success: string, error: string, abortOnError?: boolean }} Step
 * @typedef {(commit: CommitConfig) => void} SetCommitConfig
 *
 * @param {(setCommit: SetCommitConfig) => Array<Step>} applyChanges Callback to apply changes that should be committed
 */
const gitCreateCommit = applyChanges => {
  let commit
  const setCommit = config => (commit = config)

  pipeSteps([
    {
      run: git.stash,
      success: "Stashed current changes",
      error: "Changes could not be stashed",
      abortOnError: true,
    },
    () => {
      try {
        return applyChanges(setCommit)
      } catch (error) {
        git.stashPop()
        console.error("Error: Failed to apply changes, aborting.")
        throw new Error(error)
      }
    },
    {
      run: () => {
        git.add()
        git.commit(commit.message)
      },
      success: "Committed changes to git",
      error: "Changes could not be committed",
    },
    {
      run: () => commit.tag && git.tag(commit.tag, commit.tagMessage),
      success: () => (!commit.tag ? "" : `Applied git tag v${commit.tag}`),
      error: () =>
        !commit.tag ? "" : `Could not apply git tag v${commit.tag}`,
    },
    {
      run: git.stashPop,
      success: "Re-applied stashed changes",
      error: "Could not reapply stash",
    },
  ])
}

module.exports = gitCreateCommit
