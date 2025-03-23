import { setPackageVersion } from "./set-package-version"
import { PackageInfo } from "./utils/get-workspaces"

interface Args {
  root: PackageInfo
  workspaces: PackageInfo[]
  version: string
  scope: string
}
export const updateVersions = async ({
  root,
  workspaces,
  version,
  scope,
}: Args) => {
  await Promise.all([
    setPackageVersion({ packagePath: root.path, version, scope }),
    ...workspaces.map(ws =>
      setPackageVersion({ packagePath: ws.path, version, scope })
    ),
  ])
}
