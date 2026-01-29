import { prompt } from "enquirer"

import { PackageInfo } from "../utils/get-workspaces"
import { Version } from "../utils/version"

const promptExactVersion = (currentVersion: string) =>
  prompt<{ version: string }>({
    type: "input",
    name: "version",
    message: "Enter a version",
    initial: currentVersion,
    validate: value =>
      Version.isValid(value) ? true : "Format must be x.x.x or x.x.x-ext.x",
  }).then(({ version }) => version)

const getVersionChoices = (currentVersion: string) => {
  const exact = {
    message: "exact",
    name: "exact",
    value: "exact",
    hint: "x.x.x",
  }
  const version = new Version(currentVersion)

  const { extension } = version.current
  if (extension) {
    const current = version.bump("current")
    const extensionBump = version.bump(extension)

    return [
      {
        message: "release",
        name: current,
        value: current,
        hint: `${current} (remove ${extension})`,
      },
      {
        message: `bump ${extension}`,
        name: extensionBump,
        value: extensionBump,
        hint: extensionBump,
      },
      exact,
    ]
  }

  const nextMajor = version.bump("major")
  const nextMinor = version.bump("minor")
  const nextPatch = version.bump("patch")

  return [
    { message: "major", name: nextMajor, value: nextMajor, hint: nextMajor },
    { message: "minor", name: nextMinor, value: nextMinor, hint: nextMinor },
    { message: "patch", name: nextPatch, value: nextPatch, hint: nextPatch },
    exact,
  ]
}

const promptVersion = async (name: string, currentVersion: string) => {
  const { version } = await prompt<{ version: string }>({
    type: "select",
    name: "version",
    message: `Pick a version for ${name}`,
    choices: getVersionChoices(currentVersion),
  })

  return version !== "exact" ? version : promptExactVersion(currentVersion)
}

interface Args {
  root: PackageInfo
  workspaces: PackageInfo[]
}
export const promptVersions = async ({ root, workspaces }: Args) => {
  const changes: Record<string, string> = {}
  for (const ws of [root, ...workspaces]) {
    if (ws.ignore) continue
    changes[ws.name] = await promptVersion(ws.name, ws.version)
  }

  return changes
}
