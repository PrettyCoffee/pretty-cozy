import { PackageInfo } from "./utils/get-workspaces"
import { packageJson } from "./utils/package-json"
import { Version } from "./version/version"

const updatePackage = async ({
  path,
  version,
  updatedNames,
  modifier = "",
}: {
  path: string
  updatedNames: string[]
  version: string
  modifier?: ">=" | "^" | "~" | ""
}) => {
  const json = await packageJson.read(path)

  if (updatedNames.includes(json.name)) {
    json.version = version
  }

  const depScopes = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
  ] as const

  depScopes.forEach(depScope => {
    updatedNames.forEach(name => {
      if (!json[depScope]) return
      const installed = json[depScope][name]
      // If a version is a monorepo workspace path, we don't want to replace that
      if (installed && Version.isValid(installed)) {
        json[depScope][name] = modifier + version
      }
    })
  })

  await packageJson.write(path, json)
}

interface Args {
  root: PackageInfo
  workspaces: PackageInfo[]
  version: string
}
export const updateVersions = async ({ root, workspaces, version }: Args) => {
  const updatedNames = [root, ...workspaces]
    .filter(ws => !ws.ignore)
    .map(ws => ws.name)

  await Promise.all([
    updatePackage({ path: root.path, version, updatedNames }),
    ...workspaces.map(ws =>
      updatePackage({ path: ws.path, version, updatedNames })
    ),
  ])
}
