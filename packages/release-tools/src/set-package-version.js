import { writeFile } from "node:fs/promises"

/** @param {{ packageJson: object, version: string, scope: string }} args */
const bumpWorkspaceDeps = ({ packageJson, version, scope }) => {
  const bump = dependencyKey => {
    const current = packageJson[dependencyKey]
    if (!current) return
    packageJson[dependencyKey] = Object.fromEntries(
      Object.entries(current).map(([key, value]) =>
        key.startsWith(scope) ? [key, version] : [key, value]
      )
    )
  }
  bump("dependencies")
  bump("devDependencies")
  bump("peerDependencies")
}

/** Set the version in a package.json
 * @param {{ packagePath: string, version: string, scope?: string }} args
 * @param {string} args.packagePath The path to the package.json
 * @param {string} args.version The version to set
 * @param {string | undefined} args.scope If applicable, the monorepo scope to update all modules with the scope (e.g. "@pretty-cozy")
 * @returns {Promise<void>}
 **/
export const setPackageVersion = ({ packagePath, version, scope }) => {
  const packageJson = require(packagePath)
  packageJson.version = version
  if (scope) {
    bumpWorkspaceDeps({ packageJson, version, scope })
  }
  return writeFile(
    packagePath,
    JSON.stringify(packageJson, null, 2) + "\n"
  ).then(() => ({ version, name: packageJson.name }))
}
