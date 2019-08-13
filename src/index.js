// start a stimulus application with all controllers in
// skrw/app/javascript/controllers (including subdirectories)

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /_controller\.js$/)
application.load(definitionsFromContext(context))
