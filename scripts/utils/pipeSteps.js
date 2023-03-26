const resolveMessage = message =>
  typeof message === "function" ? message() : message

/** Handles executing different cli steps subsequently.
 *
 * @typedef {{ run: () => void, success: string | () => string, error: string | () => string, abortOnError?: boolean }} Step
 * @param {Array<Step | () => Array<Step>>} steps
 */
const pipeSteps = steps => {
  steps.forEach(step => {
    if (typeof step === "function") {
      pipeSteps(step())
      return
    }

    const { run, success, error, abortOnError } = step
    try {
      run()
      console.log(`✅ ${resolveMessage(success)}`)
    } catch {
      console.error(`⚠️ ${resolveMessage(error)}`)
      if (abortOnError) {
        throw new Error("❌ Process was aborted")
      }
    }
  })
}

module.exports = pipeSteps
