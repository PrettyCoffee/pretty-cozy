module.exports = {
  ...require("./version/prompt-version"),
  ...require("./version/version"),
  ...require("./color"),
  ...require("./git"),
  ...require("./npm"),
  ...require("./set-package-version"),
  ...require("./create-spinner"),
  ...require("./prompt-workspaces"),
  ...require("./update-versions"),
}
