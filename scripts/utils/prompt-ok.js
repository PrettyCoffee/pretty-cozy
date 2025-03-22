const { prompt } = require("enquirer")

const promptOk = async text => {
  const { ok } = await prompt({
    type: "toggle",
    name: "ok",
    message: text,
    initial: true,
  })

  if (!ok) {
    throw new Error("Cancelled by user")
  }

  return true
}

module.exports = { promptOk }
