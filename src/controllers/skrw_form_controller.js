import { Controller } from "stimulus"
import autosize from "autosize"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.css"

export default class extends Controller {

  static targets = ["datetime", "markdown"]

  connect() {
    console.log("wtf!!!!!!")
    // init autosize for textareas
    this.textareas = this.element.querySelectorAll("textarea")
    if (this.textareas.length > 0) {
      this.textareas.forEach(textarea => {
        this.initAutosize(textarea)
      })
    }

    // init datetime
    this.datetimeTargets.forEach(datetime => {
      this.initDatetime(datetime)
    })
  }

  disconnect() {
    // destroy autosize for textareas
    if (this.textareas.length > 0) {
      autosize.destroy(this.textareas)
    }
  }

  initAutosize(textarea) {
    // init autosize for textarea
    // can be disabled with <textarea data-disable-autosize="true"></textarea>
    if (textarea.dataset.disableAutosize != "true") {
      autosize(textarea)
    }
  }

  initDatetime(element) {
    console.log("init datetime", element)
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
