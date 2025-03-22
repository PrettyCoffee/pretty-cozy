#!/usr/bin/env node

const { npm, color } = require("@pretty-cozy/release-tools")
const { createSpinner } = require("@pretty-cozy/release-tools")

const printHelp = require("./utils/print-help")
const { promptOk } = require("./utils/prompt-ok")

const printHelpPage = () => {
  printHelp(
    "Increase the release version in all workspaces, commit the changes and tag the commit.",
    "node release.js [options]",
    {
      "--preview": "Make a dry run, only previews what would be done",
      "-h, --help": "Show help page",
    }
  )
}

const argNotAvailable = arg => {
  console.error(`Error: ${arg} is not available\n`)
}

const getOptions = args =>
  args.reduce((options, arg) => {
    switch (arg) {
      case "--preview":
        return { ...options, preview: true }

      case "-h":
      case "--help":
        return { ...options, help: true }

      default:
        argNotAvailable(arg)
        return { ...options, help: true }
    }
  }, {})

const npmPublish = async mode => {
  switch (mode) {
    case "preview":
      return npm.publish({
        workspaces: true,
        access: "public",
        dryRun: true,
      })

    case "execute":
      return npm.publish({ workspaces: true, access: "public" })
  }

  throw new Error("Bad mode")
}

const run = async () => {
  const args = process.argv.slice(2)
  const options = getOptions(args)

  if (options.help) {
    printHelpPage()
    return
  }

  console.info("Packages to be published:\n")
  const preview = await npmPublish("preview")
  console.info(color.gray(preview))

  if (options.preview) return

  console.info("\n")

  const spinner = createSpinner()

  promptOk("Do you want to publish this version?").then(accepted => {
    console.info("\n")
    if (!accepted) {
      console.info("❌ Publishing was canceled.\n")
      return
    }

    spinner.start("Publishing the version")
    npmPublish("execute")
      .then(() => {
        spinner.success("Published")
      })
      .catch(() => {
        spinner.error(
          "Failed to publish. Did you already publish this version?\n"
        )
      })
  })
}

run()
