import { color } from "../color"

type Change = "current" | "major" | "minor" | "patch" | "extension"

type ParsedVersion = {major: number, minor: number, patch: number, extension?: string, extensionVersion?: number, full: string}

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
   *  - "extension" increments the extension version (1.1.1-alpha.X)
   **/
  bump(change: Change) {
    const { major, minor, patch, extension, extensionVersion } = this.current
    switch (change) {
      case "current":
        return `${major}.${minor}.${patch}`
      case "major":
        return `${major + 1}.0.0`
      case "minor":
        return `${major}.${minor + 1}.0`
      case "patch":
        return `${major}.${minor}.${patch + 1}`
      case "extension":
        return `${major}.${minor}.${patch}-${extension}.${(extensionVersion ?? -1) + 1}`
      default:
        throw new Error(`Invalid arg in version.getNext: ${change}`)
    }
  }

  /** Regex for semantic versions.
   *  Examples: 1.0.0, 1.0.0-alpha.1, 1.0.0-rc.1
   */
  static regex = /^(\d+)\.(\d+)\.(\d+)(?:-([a-z]+)\.(\d+))?$/

  /** Validate a version
   **/
  static isValid(version: string) {
    return Version.regex.test(version)
  }

  /** Split a version into it's segments
   **/
  static parse(version: string): ParsedVersion {
    const [major, minor, patch, extension, extensionVersion] = Version.regex
      .exec(version)
      ?.slice(1) ?? []

    return {
      major: Number(major),
      minor: Number(minor),
      patch: Number(patch),
      extension,
      extensionVersion: Number(extensionVersion),
      full: version,
    }
  }
}
