const { prompt } = require("enquirer")

export const promptOk = async (text: string, initial = false) => {
  const { ok } = await prompt({
    type: "toggle",
    name: "ok",
    message: text,
    initial,
  })
  return ok
}
