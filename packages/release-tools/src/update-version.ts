import { PackageInfo } from "./utils/get-workspaces"
import { packageJson } from "./utils/package-json"
import { Version } from "./utils/version"

const updatePackage = async ({
  name,
  version,
  path,
}: {
  name: string
  version: string
  path: string
}) => {
  const json = await packageJson.read(path)

  if (json.name === name) {
    json.version = version
  }

  const depScopes = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
  ] as const

  depScopes.forEach(depScope => {
    if (!json[depScope]) return
    const installed = json[depScope][name]
    // If a version is a monorepo workspace path, we don't want to replace that
    if (installed && Version.isValid(installed)) {
      const { current } = new Version(installed)
      json[depScope][name] = current.modifier + version
    }
  })

  await packageJson.write(path, json)
}

interface Args {
  name: string
  version: string
  root: PackageInfo
  workspaces: PackageInfo[]
}
export const updateVersion = async ({
  name,
  version,
  root,
  workspaces,
}: Args) => {
  await Promise.all([
    updatePackage({ name, version, path: root.path }),
    ...workspaces.map(ws => updatePackage({ name, version, path: ws.path })),
  ])
}
