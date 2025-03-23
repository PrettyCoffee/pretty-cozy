import { access, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export interface PackageJson {
  name: string
  version: string
  private?: boolean

  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const safePackagePath = async (path: string) => {
  const packagePath = path.endsWith("package.json")
    ? path
    : join(path, "package.json")

  try {
    await access(packagePath)
    return packagePath
  } catch {
    throw new Error(`Could not access package.json at path:\n${packagePath}`)
  }
}

const read = async (path: string) => {
  const packagePath = await safePackagePath(path)
  const packageContent = await readFile(packagePath)
  return JSON.parse(packageContent.toString()) as PackageJson
}
const write = async (path: string, packageContent: PackageJson) => {
  const packagePath = await safePackagePath(path)
  await writeFile(packagePath, JSON.stringify(packageContent, null, 2) + "\n")
}

export const packageJson = { read, write }
