module.exports = {
  ...require("./version/promptVersion"),
  ...require("./version/Version"),
  ...require("./color"),
  ...require("./git"),
  ...require("./npm"),
  ...require("./setPackageVersion"),
  ...require("./createSpinner"),
}
