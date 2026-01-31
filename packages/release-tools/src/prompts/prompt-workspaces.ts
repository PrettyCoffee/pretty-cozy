import { prompt } from "enquirer"

import { getWorkspaces, PackageInfo } from "../utils/get-workspaces"

interface Options {
  message?: string
  allowPrivate?: boolean
  enforceRootSelected?: boolean
}

export const promptWorkspaces = async ({
  message = "Which workspaces do you want to release?",
  allowPrivate = false,
  enforceRootSelected,
}: Options = {}) => {
  const { root, workspaces } = await getWorkspaces({ allowPrivate })

  const options =
    enforceRootSelected != null ? workspaces : [root, ...workspaces]

  const { selectedWorkspaces } = await prompt<{ selectedWorkspaces: string }>({
    type: "multiselect",
    name: "selectedWorkspaces",
    message: message + "\n  Press 'a' to toggle all.\n ",
    initial: [],

    // @ts-expect-error -- types are not working here for some reason?
    choices: options.map(ws => ({
      name: ws.name,
      message: ws.name,
      hint: `@${ws.version}`,
    })),
  })

  const isRootSelected =
    enforceRootSelected ?? selectedWorkspaces.includes(root.name)

  return {
    root: { ...root, ignore: !isRootSelected },
    workspaces: workspaces.map(
      workspace =>
        ({
          ...workspace,
          ignore: !selectedWorkspaces.includes(workspace.name),
        }) satisfies PackageInfo
    ),
  }
}
