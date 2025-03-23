import { prompt } from "enquirer"

import { Version } from "./version"
import { packageJson } from "../utils/package-json"

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
    const extensionBump = version.bump("extension")

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

const findVersion = async () => {
  const path = await packageJson.findNearest()
  const json = await packageJson.read(path)
  return json.version
}

export const promptVersion = async (currentVersion?: string) => {
  const oldVersion = currentVersion ?? (await findVersion())

  const { version } = await prompt<{ version: string }>({
    type: "select",
    name: "version",
    message: "Pick a version to release",
    choices: getVersionChoices(oldVersion),
  })

  return version !== "exact" ? version : promptExactVersion(oldVersion)
}
