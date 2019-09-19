import { Controller } from "stimulus"

export default class extends Controller {

  initialize() {
    this.pinned = this.pinned
  }

  toggle() {
    this.pinned = !this.pinned
  }

  // display flash messages from ajax / json responses
  // flash(event) {
  //   window.clearTimeout(this.flashTimeoutId)
  //   const [response, status, xhr] = event.detail
  //
  //   if (typeof response === "object" && "flash" in response) {
  //     let html = ""
  //     Object.keys(response.flash).forEach(key => {
  //       html += `<div class="${key}">${response.flash[key]}</div>`
  //     })
  //     this.flashTarget.innerHTML = html
  //     this.flashTimeout()
  //   }
  // }
  //
  // // hide flash after n seconds
  // flashTimeout() {
  //   this.flashTimeoutId = setTimeout(() => {
  //     this.flashTarget.innerHTML = ""
  //   }, 4000)
  // }

  get pinned() {
    return this.data.get("pinned") == "true" ? true : false
  }

  set pinned(boolean) {
    this.data.set("pinned", boolean)

    const className = "skrw-session--pinned"

    if (this.pinned) {
      this.element.classList.add(className)
    } else {
      this.element.classList.remove(className)
    }
  }
}
