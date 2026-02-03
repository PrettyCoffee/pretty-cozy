import { spawn } from "node:child_process"
import { resolve } from "node:path"

export interface ShellResult {
  code: number | null
  stdout: string
  stderr: string
}

export interface ShellOptions {
  cwd: string
  quiet: boolean
  noThrow: boolean
  returnType: "raw" | "text" | "lines"
}

type Stringable = string | number | null | undefined

class ShellCommand<T = ShellResult> implements PromiseLike<T> {
  private command: string
  private options: ShellOptions = {
    cwd: process.cwd(),
    quiet: false,
    noThrow: false,
    returnType: "raw",
  }

  constructor(strings: TemplateStringsArray, ...values: Stringable[]) {
    this.command = strings.reduce(
      (result, string, index) => result + string + String(values[index] ?? ""),
      ""
    )
  }

  /** Change the working directory. Resovles relative to current cwd. */
  public cwd(path: string) {
    this.options.cwd = path.startsWith(".")
      ? resolve(this.options.cwd, path)
      : resolve(path)
    return this
  }

  /** Disable throwing errors */
  public noThrow() {
    this.options.noThrow = true
    return this
  }

  /** Silence the command */
  public quiet() {
    this.options.quiet = true
    return this
  }

  /** Change the return type to be a string.
   *  Silences terminal output.
   */
  public text() {
    this.options.returnType = "text"
    return this as ShellCommand<string>
  }

  /** Change the return type to be a string[] with all non-empty lines */
  public lines() {
    this.options.returnType = "lines"
    return this as ShellCommand<string[]>
  }

  /** Execute your command and use the result. */
  public then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): PromiseLike<TResult1 | TResult2> {
    return this.run().then(onfulfilled, onrejected)
  }

  private async run(): Promise<any> {
    return new Promise((resolve, reject) => {
      const [cmd = "", ...args] = this.command.trim().split(/\s+/)
      const child = spawn(cmd, args, { cwd: this.options.cwd, shell: true })

      let stdout = ""
      let stderr = ""

      if (!this.options.quiet && this.options.returnType === "raw") {
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
      }

      child.stdout.on("data", data => (stdout += data))
      child.stderr.on("data", data => (stderr += data))

      child.on("close", code => {
        if (code !== 0 && !this.options.noThrow) {
          return reject(
            new Error(`Command failed with code ${code}: ${stderr}`)
          )
        }

        const result = { code, stdout: stdout.trim(), stderr: stderr.trim() }

        switch (this.options.returnType) {
          case "raw":
            return resolve(result)
          case "text":
            return resolve(result.stdout)
          case "lines":
            return resolve(result.stdout.split("\n").filter(Boolean))
        }
      })
    })
  }
}

/** Shell utility function which mimics the bun shell command.
 *
 *  @example
 *  $`echo Hello world`.then(console.log) // -> { code: 0, stdout: "Hello world", stderr: "" }
 *  $`echo Hello world`.text().then(console.log) // -> "Hello world"
 *
 *  @result ShellCommand instance to set options and finally run the command.
 **/
export const $ = (strings: TemplateStringsArray, ...values: Stringable[]) =>
  new ShellCommand(strings, ...values)
