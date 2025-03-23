import { prompt } from "enquirer"

import { getWorkspaces, PackageInfo } from "./utils/get-workspaces"

export const promptWorkspaces = async ({
  message = "Which workspaces do you want to release?",
  allowPrivate = false,
} = {}) => {
  const { root, workspaces } = await getWorkspaces({ allowPrivate })

  const { selectedWorkspaces } = await prompt<{ selectedWorkspaces: string }>({
    type: "multiselect",
    name: "selectedWorkspaces",
    message: message + "\n  Press 'a' to toggle all.\n ",
    initial: workspaces.map(ws => ws.name),

    // @ts-expect-error -- types are not working here for some reason?
    choices: workspaces.map(ws => ({
      name: ws.name,
      message: ws.name,
      hint: `@${ws.version}`,
    })),
  })

  return {
    root,
    workspaces: workspaces.map(
      workspace =>
        ({
          ...workspace,
          ignore: !selectedWorkspaces.includes(workspace.name),
        }) satisfies PackageInfo
    ),
  }
}
