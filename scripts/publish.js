#!/usr/bin/env node

const {
  npm,
  git,
  promptWorkspaces,
  updateVersions,
  promptVersion,
  createSpinner,
} = require("@pretty-cozy/release-tools")
const { prompt } = require("enquirer")

const promptOk = async text =>
  prompt({
    type: "toggle",
    name: "ok",
    message: text,
    initial: true,
  })

const createCommitMessage = version =>
  version.includes("alpha")
    ? `chore: Pre-release v${version}`
    : `chore: Release v${version}`

const spinner = createSpinner()
const newLine = () => console.info("")

const bumpVersions = async ({ root, workspaces, version }) => {
  spinner.start("Updating package versions")

  await updateVersions({ root, workspaces, version })
  spinner.step("Updated versions")

  await npm.install()
  spinner.success("Installed new versions")
}

const releaseVersion = async version => {
  spinner.start("Releasing version to github")

  await git.commit({
    message: createCommitMessage(version),
  })
  spinner.step("Committed changes")

  await git.tag({
    version: `v${version}`,
    message: `Release v${version}`,
  })
  spinner.step("Created tag")

  await git.push()
  spinner.success("Pushed changes")
}

const publishVersion = async workspaces => {
  spinner.start("Publishing the version")
  try {
    await npm.publish({
      workspace: workspaces.filter(ws => !ws.ignore).map(ws => ws.name),
      access: "public",
    })
    spinner.success("Published")
  } catch {
    spinner.error("Failed to publish. Did you already publish this version?\n")
  }
}

const run = async () => {
  const version = await promptVersion()
  const { root, workspaces } = await promptWorkspaces()

  await bumpVersions({ root, workspaces, version })
  newLine()

  /**
   * Commit and push the version
   **/
  const shouldPush = await promptOk(
    `Do you want to commit, tag and push v${version}?`
  )
  newLine()
  if (!shouldPush) {
    console.info("\n❌ Cancelled by user\n")
    return
  }
  await releaseVersion(version)

  /**
   * Publish version
   **/
  const shouldPublish = await promptOk(
    `Do you want to publish the selected packages?`
  )
  newLine()
  if (!shouldPublish) {
    console.info("\n❌ Cancelled by user\n")
    return
  }
  await publishVersion(workspaces)
}

void run()
