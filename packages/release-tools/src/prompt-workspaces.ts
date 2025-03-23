import { prompt } from "enquirer"

import { getWorkspaces } from "./utils/get-workspaces"

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

    // @ts-ignore -- types are not working here for some reason?
    choices: workspaces.map(ws => ({
      name: ws.name,
      message: ws.name,
      hint: `@${ws.version}`,
    })),
  })

  const wsResult = workspaces.map(ws => ({
    ...ws,
    selected: selectedWorkspaces.includes(ws.name),
  }))

  return { root, workspaces: wsResult }
}
