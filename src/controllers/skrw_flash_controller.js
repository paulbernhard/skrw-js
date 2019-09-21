import { Controller } from "stimulus"

export default class extends Controller {

  initialize() {
    document.addEventListener("ajax:success", (event) => {
      this.flash(event)
    })

    document.addEventListener("ajax:error", (event) => {
      this.flash(event)
    })

    if (this.element.innerHTML != "") {
      this.timeout()
    }
  }

  flash(event) {
    window.clearTimeout(this.timeoutId)
    const [response, status, xhr] = event.detail

    if (typeof response === "object" && "flash" in response) {
      let html = ""
      Object.keys(response.flash).forEach(key => {
        html += `<div class="${key}">${response.flash[key]}</div>`
      })
      this.element.innerHTML = html
      this.timeout()
    }
  }

  timeout() {
    this.timeoutId = window.setTimeout(() => {
      this.element.innerHTML = ""
    }, this.timeoutDelay)
  }

  get timeoutDelay() {
    return 5000
  }
}
