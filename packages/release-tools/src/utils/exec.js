import { exec as nodeExec } from "node:child_process"

/**
 *
 * @param {string} command
 * @returns {Promise<string>}
 */
export const exec = command =>
  new Promise((resolve, reject) => {
    nodeExec(command, {}, (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout.trim())
      }
    })
  })
