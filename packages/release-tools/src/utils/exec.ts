import { exec as nodeExec } from "node:child_process"

export const exec = (command: string) =>
  new Promise<string>((resolve, reject) => {
    nodeExec(command, {}, (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout.trim())
      }
    })
  })
