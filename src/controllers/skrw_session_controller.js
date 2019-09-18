import { Controller } from "stimulus"

export default class extends Controller {

  static targets = ["flash"]

  connect() {
    if (this.hasFlashTarget) {
      this.flashTimeout()
    }

    document.body.addEventListener("ajax:success", (event) => {
      console.log(event)
      this.flash(event)
    })

    document.body.addEventListener("ajax:error", (event) => {
      console.log(event)
      this.flash(event)
    })

    document.body.addEventListener("ajax:complete", (event) => {
      console.log(event)
    })

    if (this.hasFlashTarget) {
      this.flashTimeout()
    }
  }

  toggle() {
    this.element.classList.toggle("skrw-session--pinned")
  }

  // display flash messages from ajax / json responses
  flash(event) {
    window.clearTimeout(this.flashTimeoutId)
    const [response, status, xhr] = event.detail

    if (typeof response === "object" && "flash" in response) {
      let html = ""
      Object.keys(response.flash).forEach(key => {
        html += `<div class="${key}">${response.flash[key]}</div>`
      })
      this.flashTarget.innerHTML = html
      this.flashTimeout()
    }
  }

  // hide flash after n seconds
  flashTimeout() {
    this.flashTimeoutId = setTimeout(() => {
      this.flashTarget.innerHTML = ""
    }, 4000)
  }
}
