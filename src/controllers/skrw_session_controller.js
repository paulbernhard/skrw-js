import { Controller } from "stimulus"

export default class extends Controller {

  initialize() {
    this.pinned = this.pinned
  }

  toggle() {
    this.pinned = !this.pinned
  }

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
