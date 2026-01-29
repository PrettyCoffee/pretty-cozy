import { color } from "./color"

const nextMajor = ({ major, minor, patch, extension }: ParsedVersion) => {
  if (extension && major !== 0 && minor === 0 && patch === 0) {
    return major
  }
  return major + 1
}

const nextMinor = ({ minor, patch, extension }: ParsedVersion) => {
  if (extension && minor !== 0 && patch === 0) {
    return minor
  }
  return minor + 1
}

const nextPatch = ({ patch, extension }: ParsedVersion) => {
  if (extension && patch !== 0) {
    return patch
  }
  return patch + 1
}

const nextExtension = (
  { extension, extensionVersion = 0 }: ParsedVersion,
  newExtension: string
) => {
  if (extension && extension === newExtension) {
    return `${extension}.${extensionVersion + 1}`
  }
  return `${newExtension}.0`
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- keep string literals for type hints
type Change = "current" | "major" | "minor" | "patch" | string

interface ParsedVersion {
  modifier?: string
  major: number
  minor: number
  patch: number
  extension?: string
  extensionVersion?: number
  full: string
}

export class Version {
  current: ParsedVersion

  constructor(currentVersion: string) {
    if (!Version.isValid(currentVersion)) {
      throw new Error(color.red(`Invalid version: ${currentVersion}`))
    }
    this.current = Version.parse(currentVersion)
  }

  /** Get the next version:
   *  - "current" removes the extension if there is one
   *  - "major" increments the major version (X.0.0)
   *  - "minor" increments the minor version (1.X.0)
   *  - "patch" increments the patch version (1.1.X)
   *  - others are used as extension (i.e. alpha -> 1.1.1-alpha.X)
   **/
  bump(change: Change) {
    const { major, minor, patch } = this.current

    switch (change) {
      case "current":
        return `${major}.${minor}.${patch}`
      case "major":
        return `${nextMajor(this.current)}.0.0`
      case "minor":
        return `${major}.${nextMinor(this.current)}.0`
      case "patch":
        return `${major}.${minor}.${nextPatch(this.current)}`
      default:
        return `${major}.${minor}.${patch}-${nextExtension(this.current, change)}`
    }
  }

  /** Regex for semantic versions.
   *  Examples: 1.0.0, 1.0.0-alpha.1, 1.0.0-rc.1
   */
  static regex = /^(\^|~|[<>]?=?)?(\d+)\.(\d+)\.(\d+)(?:-([a-z]+)\.(\d+))?$/

  /** Validate a version
   **/
  static isValid(version: string) {
    return Version.regex.test(version)
  }

  /** Split a version into it's segments
   **/
  static parse(version: string): ParsedVersion {
    const [modifier, major, minor, patch, extension, extensionVersion] =
      Version.regex.exec(version)?.slice(1) ?? []

    return {
      modifier,
      major: Number(major),
      minor: Number(minor),
      patch: Number(patch),
      extension,
      extensionVersion: Number(extensionVersion),
      full: version,
    }
  }
}
