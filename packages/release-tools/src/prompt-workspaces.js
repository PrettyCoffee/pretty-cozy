import { prompt } from "enquirer"

import { getWorkspaces } from "./utils/get-workspaces"

/** @typedef {{ name: string, version: string, isPrivate?: boolean, path: string }} PackageInfo */
/** @returns {Promise<{ root: PackageInfo, workspaces: (PackageInfo & { selected: boolean })[] }>} */
export const promptWorkspaces = async ({
  message = "Which workspaces do you want to release?",
  allowPrivate = false,
} = {}) => {
  const { root, workspaces } = await getWorkspaces({ allowPrivate })

  const { selectedWorkspaces } = await prompt({
    type: "multiselect",
    name: "selectedWorkspaces",
    message: message + "\n  Press 'a' to toggle all.\n ",
    initial: workspaces.map(ws => ws.name),

    choices: workspaces.map(ws => ({
      name: ws.name,
      message: ws.name,
      hint: `@${ws.version}`,
      value: ws,
    })),
  })

  return {
    root,
    workspaces: workspaces.map(ws => ({
      ...ws,
      selected: selectedWorkspaces.includes(ws.name),
    })),
  }
}
