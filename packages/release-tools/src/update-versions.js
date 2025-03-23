const { setPackageVersion } = require("./set-package-version")

const updateVersions = async ({ root, workspaces, version, scope }) =>
  Promise.all([
    setPackageVersion({ packagePath: root.path, version, scope }),
    ...workspaces.map(ws =>
      setPackageVersion({ packagePath: ws.path, version, scope })
    ),
  ])

module.exports = { updateVersions }
