import { access } from "node:fs/promises"
import { join } from "node:path"

import { glob } from "glob"

import { color } from "./color"
import { getInternalDependencies } from "./get-internal-dependencies"
import { type PackageJson, packageJson } from "./package-json"
import { $ } from "./shell"

export interface PackageInfo {
  name: string
  version: string
  path: string
  ignore: boolean
  isPrivate: boolean

  deps: {
    default: string[]
    dev: string[]
    peer: string[]
  }
}

const getPackageInfo = (pkg: PackageJson, path: string) =>
  ({
    name: pkg.name,
    version: pkg.version,
    path,
    ignore: false,
    isPrivate: pkg.private ?? false,

    deps: {
      default: Object.keys(pkg.dependencies ?? {}),
      dev: Object.keys(pkg.devDependencies ?? {}),
      peer: Object.keys(pkg.peerDependencies ?? {}),
    },
  }) satisfies PackageInfo

const getNpmWorkspaces = async (rootPath: string, rootPkg: PackageJson) => {
  if (!("workspaces" in rootPkg) || !Array.isArray(rootPkg.workspaces)) return

  const wsPaths = await Promise.all(
    rootPkg.workspaces.map(wsPath =>
      glob(`${rootPath}/${wsPath}`, { absolute: true }),
    ),
  )
  return wsPaths.flat()
}

const getPnpmWorkspaces = async (rootPath: string) => {
  try {
    const workspaceJson =
      await $`pnpm list -r --depth -1 --json --only-projects`
        .cwd(rootPath)
        .text()

    const workspaceEntries = JSON.parse(workspaceJson) as {
      name: string
      path: string
    }[]

    return workspaceEntries.map(({ path }) => path)
  } catch {
    return
  }
}

const getWorkspaceInfo = async (rootPath: string, rootPkg: PackageJson) => {
  const wsPaths =
    (await getNpmWorkspaces(rootPath, rootPkg)) ||
    (await getPnpmWorkspaces(rootPath)) ||
    []

  return Promise.all(
    wsPaths.map(async path => {
      const pkg = await packageJson.read(path)
      return getPackageInfo(pkg, path)
    }),
  )
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

  const deps = getInternalDependencies(workspaces)

  return {
    root,
    workspaces: workspaces
      .toSorted((a, b) => {
        const depsA = deps[a.name]
        const depsB = deps[b.name]
        return depsB?.includes(a.name) ? 1 : depsA?.includes(b.name) ? -1 : 0
      })
      .filter(({ isPrivate }) => allowPrivate || !isPrivate),
  }
}
