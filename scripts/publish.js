#!/usr/bin/env node

const askToAccept = require("./utils/askToAccept")
const createSpinner = require("./utils/createSpinner")
const printHelp = require("./utils/printHelp")
const runCmd = require("./utils/runCmd")

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

const npmPublish = mode => {
  const publishCommand = "npm publish --workspaces --access public"

  switch (mode) {
    case "preview":
      return runCmd(`${publishCommand} --dry-run`, { silent: false })

    case "execute":
      return runCmd(`${publishCommand}`, { silent: true })
  }

  return Promise.reject(new Error("Bad mode"))
}

const run = async () => {
  const args = process.argv.slice(2)
  const options = getOptions(args)

  if (options.help) {
    printHelpPage()
    return
  }

  console.log("Packages to be published:\n")
  await npmPublish("preview")

  if (options.preview) return

  console.log("\n")

  const { start, stop } = createSpinner("Publishing the version")

  askToAccept("Do you want to publish this version?").then(accepted => {
    console.log("\n")
    if (!accepted) {
      console.log("❌ Publishing was canceled.\n")
      return
    }

    start()
    npmPublish("execute")
      .then(() => {
        stop("✅ Published")
      })
      .catch(() => {
        stop("⚠️  Failed to publish. Did you already publish this version?\n")
      })
  })
}

run()
