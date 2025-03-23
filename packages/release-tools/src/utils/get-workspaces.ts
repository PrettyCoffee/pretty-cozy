import { readFile, access } from "node:fs/promises"
import { join } from "node:path"

import { glob } from "glob"

import { color } from "../color"

interface Package {
  name: string
  version: string
  private?: boolean
}
export interface PackageInfo {
  name: string
  version: string
  isPrivate?: boolean
  path: string
}

const getPackageInfo = (pkg: Package, path: string) => {
  const result: PackageInfo = {
    name: pkg.name,
    version: pkg.version,
    path,
  }
  if (pkg.private) {
    result.isPrivate = pkg.private
  }
  return result
}

const readPackage = async (path: string) => {
  const pkgPath = join(path, "package.json")
  const pkgContent = await readFile(pkgPath)
  return JSON.parse(pkgContent.toString()) as Package
}

const getWorkspaceInfo = async (rootPath: string, rootPkg: Package) => {
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
      .map(path => readPackage(path).then(pkg => getPackageInfo(pkg, path)))
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
  const rootPkg = await readPackage(rootPath)
  const root = getPackageInfo(rootPkg, rootPath)
  const workspaces = await getWorkspaceInfo(rootPath, rootPkg)

  const result = {
    root,
    workspaces: workspaces.filter(
      ({ isPrivate }) => allowPrivate || !isPrivate
    ),
  }

  return result
}
