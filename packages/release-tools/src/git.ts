import { $ } from "./utils/shell"
import { stringifyArgs } from "./utils/stringify-args"

interface CommitArgs {
  message: string
  dryRun?: boolean
  allowEmpty?: boolean
}

/** Commits all pending changes to the repository.
 *  @param args.message The commit message.
 *  @param args.dryRun If set to true, the changes are not applied.
 *  @param args.allowEmpty If set to true, an empty commit is allowed.
 **/
const commit = async ({ message, ...args }: CommitArgs) => {
  await $`git add -A`.quiet()
  await $`git commit -m "${message}" ${stringifyArgs(args)}`.quiet()
}

interface PushArgs {
  dryRun?: boolean
  tags?: boolean
}

/** Pushes changes to the remote repository.
 *  @param args.dryRun If set to true, the changes are not applied.
 **/
const push = async (args: PushArgs) => {
  await $`git push ${stringifyArgs(args as Record<string, unknown>)}`.quiet()
}

interface TagArgs {
  version: string
  message?: string
  dryRun?: boolean
}
/** Creates a new tag on the current commit.
 *  @param args.version The version number to tag the latest commit with.
 *  @param args.dryRun If set to true, the changes are not applied.
 **/
const tag = async ({ version, dryRun, ...args }: TagArgs) => {
  if (dryRun) return
  await $`git tag -a ${version} ${stringifyArgs(args)}`.quiet()
}

/** Stashes all pending changes in the repository.
 **/
const stash = async () => {
  await $`git stash --include-untracked`.quiet()
}

/** Applies the latest stash to the repository.
 **/
const stashPop = async () => {
  await $`git stash pop`.quiet()
}

/** Retrieves the latest tag in the repository.
 *  @returns A promise that resolves to the latest tag.
 **/
const latestTag = async () => await $`git describe --tags --abbrev=0`.text()

/** Retrieves all tags in the repository.
 *  @returns A promise that resolves to an array of all tags.
 **/
const allTags = () =>
  $`git tag -l --sort=version:refname`
    .lines()
    .then(out => out.filter(version => /\d+\.\d+\.\d+$/.test(version)))

const getChangedFiles = async (commitHash: string) =>
  await $`git diff-tree --no-commit-id --name-only ${commitHash} -r`.lines()

const commitRegex = /^([a-z]+)(?:\((.+)\))?(!)?:\s*(.+)/
const parseCommit = (commit: string) => {
  const match = commitRegex.exec(commit)
  if (!match) return null
  const [, type, scope, breaking, message] = commitRegex.exec(commit) ?? []
  return { type, scope, breaking: !!breaking, message }
}

const getCommitDetails = async (commit: string) => {
  const [, hash = "", message = ""] = /([a-z0-9]+) (.*)/.exec(commit) ?? []
  return {
    hash,
    raw: message,
    parsed: parseCommit(message),
    files: await getChangedFiles(hash),
  }
}

/** Retrieves the commits between two tags.
 *  @param startTag The starting tag. Defaults to the latest tag.
 *  @param endTag The ending tag.
 *  @returns A promise that resolves to an array of commits between the specified tags.
 **/
const getCommits = async (startTag?: string, endTag?: string) => {
  const start = startTag ?? (await allTags().then(tags => tags.at(-1)))
  const end = endTag ?? "HEAD"

  const commits = await $`git log ${start}..${end} --oneline`.lines()

  return Promise.all(commits.map(getCommitDetails))
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
