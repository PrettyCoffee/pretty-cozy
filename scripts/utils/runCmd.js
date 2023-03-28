const { exec } = require("child_process")

const runCmd = (command, { silent }) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (!silent) console.log(stdout)
      if (error) reject(error)
      else resolve(stdout)
    })
  })

module.exports = runCmd
