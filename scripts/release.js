#!/usr/bin/env node

const { execSync } = require("child_process")

const gitCreateCommit = require("./utils/createGitCommit")
const printHelp = require("./utils/printHelp")
const pkg = require("../package.json")

const printHelpPage = () => {
  printHelp(
    "Increase the release version in all workspaces, commit the changes and tag the commit.",
    "node release.js [options]",
    {
      "--major": "vX.0.0 - Mark the releases scope as major (breaking changes)",
      "--minor": "v0.X.0 - Mark the releases scope as minor (new features)",
      "--patch": "v0.0.X - Mark the releases scope as patch (bug fixes)",
      "-p, --pre":
        "v0.0.0-alpha.X - Mark the release as pre-release (internal)\nNeeds a scope of the above (major | minor | patch)",
      "-h, --help": "Show help page",
    }
  )
}

const argNotAvailable = arg => {
  console.error(`Error: ${arg} is not available\n`)
}

const parseVersion = version => {
  const matchVersion = /v?(\d+)\.(\d+)\.(\d+)(?:-alpha\.(\d+))?/
  const [, major, minor, patch, alpha] = matchVersion
    .exec(version)
    .map(value => {
      const number = Number(value)
      return Number.isNaN(number) ? value : number
    })
  return { major, minor, patch, alpha }
}

const getOptions = args =>
  args.reduce((options, arg) => {
    switch (arg) {
      case "--major":
      case "--minor":
      case "--patch":
        return { ...options, scope: arg.replace("--", "") }

      case "-p":
      case "--pre":
        return { ...options, pre: true }

      case "-h":
      case "--help":
        return { ...options, help: true }

      default:
        argNotAvailable(arg)
        return { ...options, help: true }
    }
  }, {})

const increaseVersion = ({ major, minor, patch }, scope) =>
  scope === "major"
    ? { major: major + 1, minor: 0, patch: 0 }
    : scope === "minor"
    ? { major, minor: minor + 1, patch: 0 }
    : { major, minor, patch: patch + 1 }

const createVersion = ({ scope, pre }) => {
  const version = parseVersion(pkg.version)
  const newVersion = increaseVersion(version, scope)

  if (pre) {
    if (version.alpha != null) return { ...version, alpha: version.alpha + 1 }

    return { ...newVersion, alpha: 0 }
  }

  if (version.alpha != null) return { ...version, alpha: undefined }

  return newVersion
}

const stringifyVersion = ({ major, minor, patch, alpha }) =>
  alpha != null
    ? `${major}.${minor}.${patch}-alpha.${alpha}`
    : `${major}.${minor}.${patch}`

const applyVersion = version => {
  execSync(`npm --no-git-tag-version version ${version} --workspaces`)
  execSync(`npm --no-git-tag-version version ${version}`)
}

const createCommitMessage = version =>
  version.includes("alpha")
    ? `chore: Prerelease v${version}`
    : `chore: Release v${version}`

const run = () => {
  const args = process.argv.slice(2)
  const options = getOptions(args)

  if (!options.scope || options.help) {
    printHelpPage()
    return
  }

  gitCreateCommit(setCommit => {
    const oldVersion = pkg.version
    let version
    return [
      {
        run: () => {
          version = stringifyVersion(createVersion(options))
          applyVersion(version)
          setCommit({
            message: createCommitMessage(version),
            tag: version,
            tagMessage: options.pre
              ? "Internal release only"
              : `Release v${version}`,
          })
        },
        success: () => `Version updated: v${oldVersion} -> v${version}`,
        error: () => `Version v${version || "undefined"} could not be applied`,
        abortOnError: true,
      },
    ]
  })
}

run()
