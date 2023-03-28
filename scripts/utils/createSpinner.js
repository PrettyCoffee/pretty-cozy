const cyan = text => `\x1b[36m${text}\x1b[0m`
const spinner = ["⠟", "⠻", "⠽", "⠾", "⠷", "⠯"]

const createSpinner = (text = "Loading") => {
  let interval = undefined
  let currentFrame = 0

  const replaceLine = text => process.stdout.write(`\r${text}`)

  const start = () => {
    interval = setInterval(() => {
      currentFrame += 1
      const frame = spinner[currentFrame % spinner.length]
      replaceLine(`${cyan(frame)} ${text}`)
    }, 100)
  }

  const stop = finalText => {
    clearInterval(interval)
    interval = undefined
    replaceLine(finalText)
    console.log("\n")
  }
  return {
    start,
    stop,
  }
}

module.exports = createSpinner
