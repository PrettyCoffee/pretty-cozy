import { access } from "node:fs/promises"
import { join } from "node:path"

import { glob } from "glob"

import { color } from "../color"
import { PackageJson, packageJson } from "./package-json"

export interface PackageInfo {
  name: string
  version: string
  path: string
  ignore: boolean
  isPrivate: boolean
}

const getPackageInfo = (pkg: PackageJson, path: string) =>
  ({
    name: pkg.name,
    version: pkg.version,
    path,
    ignore: false,
    isPrivate: pkg.private ?? false,
  }) satisfies PackageInfo

const getWorkspaceInfo = async (rootPath: string, rootPkg: PackageJson) => {
  if (!("workspaces" in rootPkg) || !Array.isArray(rootPkg.workspaces)) {
    return []
  }

  const wsPaths = await Promise.all(
    rootPkg.workspaces.map(wsPath =>
      glob(`${rootPath}/${wsPath}`, { absolute: true })
    )
  )
  const workspaces = await Promise.all(
    wsPaths
      .flat()
      .map(path =>
        packageJson.read(path).then(pkg => getPackageInfo(pkg, path))
      )
  )
  return workspaces.flat()
}

const getNearestPackage = async (path = process.cwd()): Promise<string> => {
  try {
    const pkgPath = join(path, "package.json")
    await access(pkgPath)
    return path
  } catch {
    const systemRoot = /^([^\\/]*[\\/]).*/.exec(process.cwd())?.[1]
    if (path !== systemRoot) return getNearestPackage(join(path, ".."))
    throw new Error(color.red(`Could not find a package.json file`))
  }
}

export const getWorkspaces = async ({ allowPrivate = false } = {}) => {
  const rootPath = await getNearestPackage()
  const rootPkg = await packageJson.read(rootPath)
  const root = getPackageInfo(rootPkg, rootPath)
  const workspaces = await getWorkspaceInfo(rootPath, rootPkg)

  return {
    root,
    workspaces: workspaces.filter(
      ({ isPrivate }) => allowPrivate || !isPrivate
    ),
  }
}
