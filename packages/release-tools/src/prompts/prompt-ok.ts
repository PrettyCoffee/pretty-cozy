import { prompt } from "enquirer"

export const promptOk = async (text: string, initial = false) => {
  const { ok } = await prompt<{ ok: boolean }>({
    type: "toggle",
    name: "ok",
    message: text,
    initial,
  })
  return ok
}
