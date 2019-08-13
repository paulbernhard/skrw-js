import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

// start a stimulus application with all controllers in
// usage:
//   import start from "skrw-js"
//   start()

export default function start() {
  const application = Application.start()
  const context = require.context("./controllers", true, /_controller\.js$/)
  application.load(definitionsFromContext(context))
}
