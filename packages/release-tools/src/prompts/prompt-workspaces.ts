import { prompt } from "enquirer"

import { getWorkspaces, PackageInfo } from "../utils/get-workspaces"

export const promptWorkspaces = async ({
  message = "Which workspaces do you want to release?",
  allowPrivate = false,
} = {}) => {
  const { root, workspaces } = await getWorkspaces({ allowPrivate })

  const { selectedWorkspaces } = await prompt<{ selectedWorkspaces: string }>({
    type: "multiselect",
    name: "selectedWorkspaces",
    message: message + "\n  Press 'a' to toggle all.\n ",
    initial: [],

    // @ts-expect-error -- types are not working here for some reason?
    choices: [root, ...workspaces].map(ws => ({
      name: ws.name,
      message: ws.name,
      hint: `@${ws.version}`,
    })),
  })

  return {
    root: { ...root, ignore: !selectedWorkspaces.includes(root.name) },
    workspaces: workspaces.map(
      workspace =>
        ({
          ...workspace,
          ignore: !selectedWorkspaces.includes(workspace.name),
        }) satisfies PackageInfo
    ),
  }
}
