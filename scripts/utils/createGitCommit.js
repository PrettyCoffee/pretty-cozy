#!/usr/bin/env node

const { execSync } = require("child_process")

const git = {
  stash: () => execSync(`git stash --include-untracked`),
  stashPop: () => execSync(`git stash pop`),
  add: (pattern = "./") => execSync(`git add ${pattern}`),
  commit: (message) => execSync(`git commit -m "${message}"`),
  tag: (version, message) => execSync(`git tag -a v${version} -m "${message}"`)
}

/** Function to create git commits.
 *  Present changes are stashed before executing the callback and reapplied afterwards.
 * 
 * @param {() => { message: string, tag?: string, tagMessage?: string }} callback Callback to apply changes that should be committed
 */
const gitCreateCommit = callback => {
  git.stash()
  console.log("✅ Stashed current changes")

  const { message, tag, tagMessage } = callback()
  git.add()
  git.commit(message)
  console.log(`✅ Committed "${message}"`)

  if (tag != null) {
    try {
      git.tag(tag, tagMessage)
      console.log(`✅ Applied git tag v${tag}`)
    } catch {
      console.error(`❌ Could not apply git tag v${tag}`)
    }
  }

  git.stashPop()
  console.log("✅ Re-applied stashed changes")
}

module.exports = gitCreateCommit
