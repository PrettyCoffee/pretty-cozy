const askToAccept = (question, fallback = false) => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const choice = fallback ? "(Y/n)" : "(y/N)"

  return new Promise(resolve => {
    readline.question(`${question} ${choice} `, answer => {
      readline.close()

      if (answer === "y" || answer === "Y") {
        resolve(true)
        return
      }

      if (answer === "n" || answer === "N") {
        resolve(false)
        return
      }

      resolve(fallback)
    })
  })
}

module.exports = askToAccept
