import { exec } from "./utils/exec"
import { stringifyArgs } from "./utils/stringify-args"

const removeCommitHash = (commit: string) => commit.replace(/^[a-f0-9]+ /, "")

interface CommitArgs { message: string, dryRun?: boolean, allowEmpty?: boolean }

/** Commits all pending changes to the repository.
 *  @param args.message The commit message.
 *  @param args.dryRun If set to true, the changes are not applied.
 *  @param args.allowEmpty If set to true, an empty commit is allowed.
 **/
const commit = async ({ message, ...args }: CommitArgs) => {
  await exec(`git add -A`)
  await exec(`git commit -m "${message}" ${stringifyArgs(args)}`)
}

interface PushArgs { dryRun?: boolean }

/** Pushes changes to the remote repository.
 *  @param args.dryRun If set to true, the changes are not applied.
 **/
const push = async (args: PushArgs) => {
  await exec(`git push ${stringifyArgs(args as Record<string, unknown>)}`)
}

interface TagArgs { version: string, message?: string, dryRun?: boolean }
/** Creates a new tag on the current commit.
 *  @param args.version The version number to tag the latest commit with.
 *  @param args.dryRun If set to true, the changes are not applied.
 **/
const tag = async ({ version, dryRun, ...args }: TagArgs) => {
  if (dryRun) return
  await exec(`git tag -a ${version} ${stringifyArgs(args)}`)
}

/** Stashes all pending changes in the repository.
 **/
const stash = async () => {
  await exec(`git stash --include-untracked`)
}

/** Applies the latest stash to the repository.
 **/
const stashPop = async () => {
  await exec(`git stash pop`)
}

/** Retrieves the latest tag in the repository.
 *  @returns A promise that resolves to the latest tag.
 **/
const latestTag = () => exec(`git describe --tags --abbrev=0`)

/** Retrieves all tags in the repository.
 *  @returns A promise that resolves to an array of all tags.
 **/
const allTags = () =>
  exec(`git tag -l --sort=version:refname`).then(tags =>
    tags.split("\n").filter(version => /^\d+\.\d+\.\d+$/.test(version))
  )

/** Retrieves the commits between two tags.
 *  @param startTag The starting tag.
 *  @param endTag The ending tag.
 *  @returns A promise that resolves to an array of commits between the specified tags.
 **/
const getCommits = async (startTag?: string, endTag?: string) => {
  const tags = await allTags()
  const start = startTag ?? tags.at(-1)
  const end = endTag ?? "HEAD"

  const command = `git log ${start}..${end} --oneline`
  return exec(command).then(commits =>
    commits.split("\n").filter(Boolean).map(removeCommitHash)
  )
}

/**
 * Promise bindings for git commands.
 **/
export const git = {
  commit,
  push,
  tag,
  stash,
  stashPop,
  latestTag,
  allTags,
  getCommits,
}
