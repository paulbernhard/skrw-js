import { Controller } from "stimulus"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.css"

export default class extends Controller {

  static targets = ["datetime", "markdown"]

  connect() {
    // init datetime
    this.datetimeTargets.forEach(datetime => {
      this.initDatetime(datetime)
    })
  }

  initDatetime(element) {
    flatpickr(element, {
      enableTime: true,
      altInput: true,
      time_24hr: true
    })
  }

  toggleMarkdown(event) {
    const markdown = event.target.closest("[data-target*='skrw-form.markdown']")
    markdown.classList.toggle("instructions--markdown--expanded")
  }
}
