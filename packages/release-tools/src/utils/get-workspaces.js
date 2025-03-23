#!/usr/bin/env node

import { readFile, access } from "node:fs/promises"
import { join } from "node:path"

import { glob } from "glob"

import { color } from "../color"

/** @typedef {{ name: string, version: string, isPrivate?: boolean, path: string }} PackageInfo */
/** @returns {PackageInfo} */
const getPackageInfo = (pkg, path) => {
  const result = {
    name: pkg.name,
    version: pkg.version,
    path,
  }
  if (pkg.private) {
    result.isPrivate = pkg.private
  }
  return result
}

/** @returns {Promise<object>} */
const readPackage = async path => {
  const pkgPath = join(path, "package.json")
  const pkgContent = await readFile(pkgPath)
  return JSON.parse(pkgContent.toString())
}

/**
 *  @param {string} rootPath
 *  @param {object} rootPkg
 *  @returns {Promise<PackageInfo[]>}
 **/
const getWorkspaceInfo = async (rootPath, rootPkg) => {
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

/** @returns {Promise<string>} */
const getNearestPackage = async (path = process.cwd()) => {
  try {
    const pkgPath = join(path, "package.json")
    await access(pkgPath)
    return path
  } catch {
    const systemRoot = /^([^\\/]*[\\/]).*/.exec(process.cwd())[1]
    if (path !== systemRoot) return getNearestPackage(join(path, ".."))
    throw new Error(color.red(`Could not find a package.json file`))
  }
}

/**
 *  @param {{ allowPrivate?: boolean }} args
 *  @returns {Promise<{ root: PackageInfo, workspaces: PackageInfo[] }>}
 **/
export const getWorkspaces = async ({ allowPrivate = false } = {}) => {
  const rootPath = await getNearestPackage()
  const rootPkg = await readPackage(rootPath)
  const root = getPackageInfo(rootPkg, rootPath)
  const workspaces = await getWorkspaceInfo(rootPath, rootPkg)

  return {
    root,
    workspaces: workspaces.filter(
      ({ isPrivate }) => allowPrivate || !isPrivate
    ),
  }
}
