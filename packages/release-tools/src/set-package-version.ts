import { writeFile } from "node:fs/promises"

const bumpWorkspaceDeps = ({
  packageJson,
  version,
  scope,
}: {
  packageJson: Record<string, unknown>
  version: string
  scope: string
}) => {
  const bump = (dependencyKey: string) => {
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

interface Args {
  packagePath: string
  version: string
  scope?: string
}
/** Set the version in a package.json
 * @param args
 * @param args.packagePath The path to the package.json
 * @param args.version The version to set
 * @param args.scope If applicable, the monorepo scope to update all modules with the scope (e.g. "@pretty-cozy")
 **/
export const setPackageVersion = async ({
  packagePath,
  version,
  scope,
}: Args) => {
  const packageJson = require(packagePath)
  packageJson.version = version
  if (scope) {
    bumpWorkspaceDeps({ packageJson, version, scope })
  }
  await writeFile(packagePath, JSON.stringify(packageJson, null, 2) + "\n")
  return { version, name: String(packageJson.name) }
}
