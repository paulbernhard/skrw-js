import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

class Skrw {

  start() {
    console.log("start Skrw application")

    const application = Application.start()
    const context = require.context("./controllers", true, /_controller\.js$/)
    application.load(definitionsFromContext(context))
  }
}

export default Skrw
