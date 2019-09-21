import { Controller } from "stimulus"

export default class extends Controller {

  static targets = ["template", "fields"]

  connect() {

  }

  add(event) {
    event.preventDefault()
    const html = this.build()
    event.originalTarget.insertAdjacentHTML("beforebegin", html)
  }

  remove(event) {
    event.preventDefault()
    const fields = event.originalTarget.closest("[data-target*='fields']")

    if (fields.dataset.newRecord == "true") {
      fields.parentNode.removeChild(fields)
    } else {
      const destroy = fields.querySelector("input[name*='_destroy']")
      destroy.value = 1
      fields.style.display = "none"
    }
  }

  build() {
    let html = this.templateTarget.innerHTML
    html = html.replace(/NEW_RECORD/g, new Date().getTime())
    return html
  }
}
