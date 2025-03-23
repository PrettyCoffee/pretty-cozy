import { prompt } from "enquirer"

import { Version } from "./version"

/**
 * @param {string} currentVersion
 * @returns {Promise<string>}
 **/
const promptExactVersion = currentVersion =>
  prompt({
    type: "input",
    name: "version",
    message: "Enter a version",
    initial: currentVersion,
    validate: value =>
      Version.isValid(value) ? true : "Format must be x.x.x or x.x.x-ext.x",
  }).then(({ version }) => version)

/** @param {string} currentVersion */
const getVersionChoices = currentVersion => {
  const exact = { message: "exact", value: "exact", hint: "x.x.x" }
  const version = new Version(currentVersion)

  const { extension } = version.current
  if (extension) {
    const current = version.bump("current")
    const extensionBump = version.bump("extension")

    return [
      {
        message: "release",
        value: current,
        hint: `${current} (remove ${extension})`,
      },
      {
        message: `bump ${extension}`,
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
    { message: "major", value: nextMajor, hint: nextMajor },
    { message: "minor", value: nextMinor, hint: nextMinor },
    { message: "patch", value: nextPatch, hint: nextPatch },
    exact,
  ]
}

/** Prompt the user to pick the next version
 *
 * @param {string} currentVersion The current version in your package.json
 *
 * @returns {Promise<string>}
 **/
export const promptVersion = async currentVersion => {
  const { version } = await prompt({
    type: "select",
    name: "version",
    message: "Pick a version to release",
    choices: getVersionChoices(currentVersion),
  })

  return version !== "exact" ? version : promptExactVersion(currentVersion)
}
