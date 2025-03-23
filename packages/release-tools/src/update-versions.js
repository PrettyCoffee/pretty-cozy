import { setPackageVersion } from "./set-package-version"

export const updateVersions = async ({ root, workspaces, version, scope }) =>
  Promise.all([
    setPackageVersion({ packagePath: root.path, version, scope }),
    ...workspaces.map(ws =>
      setPackageVersion({ packagePath: ws.path, version, scope })
    ),
  ])
