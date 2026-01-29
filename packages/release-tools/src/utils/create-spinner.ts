import { color } from "./color"

const writeLine = (text: string, resetLine = false) => {
  process.stdout.cursorTo(0)
  process.stdout.write(text)
  process.stdout.clearLine(1)
  if (resetLine) {
    process.stdout.write("\r")
  } else {
    process.stdout.write("\n")
  }
}

const cursor = {
  isHidden: false,
  show: () => {
    if (!cursor.isHidden) return
    cursor.isHidden = false
    process.stdout.write("\u001B[?25h")
  },
  hide: () => {
    if (cursor.isHidden) return
    cursor.isHidden = true
    process.stdout.write("\u001B[?25l")
  },
}

const userInput = {
  isBlocked: false,
  enable: () => {
    if (!userInput.isBlocked) return
    userInput.isBlocked = false
    process.stdin.setRawMode(true)
  },
  disable: () => {
    if (userInput.isBlocked) return
    userInput.isBlocked = true
    process.stdin.setRawMode(false)
  },
}

export const createSpinner = () => {
  let intervalId: NodeJS.Timeout | undefined = undefined
  let current = 0
  let curentStep = 0
  let text = ""
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"] as const

  const update = () => {
    const frame = frames[current++ % frames.length] ?? frames[0]
    const line = `${color.blue(frame)} ${text}`

    writeLine(line, true)
  }

  const setText = (newText: string) => {
    text = newText
  }

  const start = (text: string) => {
    if (intervalId) {
      throw new Error("Spinner is already running")
    }

    setText(text)
    cursor.hide()
    userInput.disable()
    intervalId = setInterval(update, 50)
  }

  const reset = () => {
    clearInterval(intervalId)
    intervalId = undefined
    current = 0
    curentStep = 0
    setText("")
    cursor.show()
    userInput.enable()
  }

  const stop = (text: string) => {
    if (!intervalId) return

    if (curentStep > 0) {
      writeLine(`${color.gray("└─")}${text}`)
    } else {
      writeLine(text)
    }
    reset()
  }

  const success = (text: string) => {
    stop(`${color.green("√")} ${text}`)
  }

  const error = (text: string) => {
    stop(`${color.red("✖")} ${text}`)
  }

  const step = (text: string) => {
    curentStep++
    if (curentStep === 1) {
      writeLine(`${color.gray("┌─»")} ${text}`)
    } else {
      writeLine(`${color.gray("├─»")} ${text}`)
    }
  }

  return { start, setText, success, error, step }
}
