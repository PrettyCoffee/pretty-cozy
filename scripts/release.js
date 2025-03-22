#!/usr/bin/env node

const {
  promptVersion,
  setPackageVersion,
  git,
  createSpinner,
  npm,
} = require("@pretty-cozy/release-tools")
const { glob } = require("glob")

const { version } = require("../package.json")
const { promptOk } = require("./utils/prompt-ok")

const getPackages = () =>
  glob(["package.json", "packages/*/package.json"], { absolute: true })

const createCommitMessage = version =>
  version.includes("alpha")
    ? `chore: Pre-release v${version}`
    : `chore: Release v${version}`

const newLine = () => console.info("")

const spinner = createSpinner()

promptVersion(version)
  .then(async newVersion => {
    newLine()
    spinner.start("Updating package versions")

    const packagePaths = await getPackages()
    spinner.step("Retrieved package paths")

    const steps = packagePaths.map(async path => {
      const { name } = await setPackageVersion({
        packagePath: path,
        version: newVersion,
        scope: "@pretty-cozy",
      })
      spinner.step(`✅ ${name}`)
    })
    await Promise.all(steps)

    await npm.install()

    spinner.success("Updated package versions")

    newLine()
    await promptOk(`Do you want to commit, tag and push v${newVersion}?`)

    return newVersion
  })
  .then(async newVersion => {
    newLine()

    spinner.start("")
    await git.commit({
      message: createCommitMessage(newVersion),
    })
    spinner.step("Committed changes")

    await git.tag({
      version: `v${newVersion}`,
      message: `Release v${newVersion}`,
    })
    spinner.step("Created tag")

    await git.push()
    spinner.step("Pushed changes")

    spinner.success("Release completed")
  })
