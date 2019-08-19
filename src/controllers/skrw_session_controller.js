import { Controller } from "stimulus"

export default class extends Controller {

  static targets = ["flash"]

  connect() {
    if (this.hasFlashTarget) {
      this.timeoutFlash()
    }

    document.addEventListener("ajax:success", (event) => {
      this.flash(event)
    })
  }

  toggle() {
    this.element.classList.toggle("skrw-session--pinned")
  }

  // display flash messages from ajax / json responses
  flash(event) {
    const [response, status, xhr] = event.detail
    console.log(response)

    if ("flash" in response) {
      console.log(response.flash)
      let html = ""
      Object.keys(response.flash).forEach(key => {
        html += `<div class="${key}">${response.flash[key]}</div>`
      })
      this.flashTarget.innerHTML = html
      this.timeoutFlash()
    }
  }

  // hide flash after n seconds
  timeoutFlash() {
    const timer = setTimeout(() => {
      this.flashTarget.innerHTML = ""
    }, 2200)
  }

  // get isExpanded() {
  //   return this.element.classList.contains("skrw-session--expanded") ? true : false
  // }
}
