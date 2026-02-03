import { PackageInfo } from "./get-workspaces"

const unique = (items: string[]) => [...new Set(items)]

interface Tree {
  name: string
  dependents: Tree[]
}

const buildTree = (workspaces: PackageInfo[]) => {
  const tree = Object.fromEntries(
    workspaces.map<[string, Tree]>(ws => [
      ws.name,
      { name: ws.name, dependents: [] },
    ])
  )

  workspaces.forEach(ws => {
    const allDeps = unique(Object.values(ws.deps).flat())
    const internalDeps = allDeps.filter(name =>
      workspaces.some(ws => ws.name === name)
    )
    internalDeps.forEach(name => tree[name]!.dependents.push(tree[ws.name]!))
  })

  return tree
}

const flattenTree = (tree: Tree, current: string[] = []) => {
  const dependents = Object.values(tree.dependents)

  const tracked = new Set(current)
  dependents.forEach(dependent => {
    if (tracked.has(dependent.name)) return
    tracked.add(dependent.name)
    flattenTree(dependent, [...tracked]).forEach(item => tracked.add(item))
  })
  return [...tracked]
}

export const getInternalDependencies = (workspaces: PackageInfo[]) => {
  const tree = buildTree(workspaces)
  return Object.fromEntries(
    Object.values(tree).map(tree => [tree.name, flattenTree(tree)])
  )
}
