#!/usr/bin/env node

const {
  npm,
  git,
  color,
  promptOk,
  promptWorkspaces,
  promptVersions,
  createSpinner,
  updateVersion,
} = require("@pretty-cozy/release-tools")

const createCommitMessage = version =>
  version.includes("alpha")
    ? `chore: Pre-release ${version}`
    : `chore: Release ${version}`

const spinner = createSpinner()
const newLine = () => console.info("")

const bumpVersions = async ({ root, workspaces, changes }) => {
  for (const name in changes) {
    const version = changes[name]
    const tag = `${name}@${version}`

    spinner.start(`Release ${tag}`)

    await updateVersion({ name, version, root, workspaces })
    await npm.install()

    spinner.step(`Updated package.json files`)

    await git.commit({
      message: createCommitMessage(tag),
    })
    await git.tag({
      version: tag,
      message: `Release ${tag}`,
    })

    spinner.success(`Created commit`)
  }
}

const run = async () => {
  const { root, workspaces } = await promptWorkspaces({
    enforceRootSelected: false,
  })
  newLine()

  const changes = await promptVersions({ root, workspaces })
  newLine()

  /**
   * Apply changes, commit, and push the version
   **/
  const tags = Object.entries(changes).map(
    ([name, version]) => `${name}${color.gray("@")}${color.blue(version)}`
  )
  const list = color.gray("\n - ")
  const shouldApply = await promptOk(
    `Do you want to apply and commit the new versions?${list}${tags.join(list)}\n`
  )
  newLine()
  if (!shouldApply) {
    console.info("\n❌ Cancelled by user\n")
    return
  }
  await bumpVersions({ root, workspaces, changes })

  const shouldPush = await promptOk(`Do you want to push the changes?`)
  newLine()
  if (!shouldPush) {
    console.info("\n❌ Cancelled by user\n")
    return
  }
  await git.push()
  await git.push({ tags: true })
}

void run()
