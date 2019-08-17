import { Controller } from "stimulus"
import autosize from "autosize"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.css"

export default class extends Controller {

  static targets = ["datetime"]

  connect() {
    // init autosize for textareas
    const textareas = this.element.querySelectorAll("textarea")
    if (textareas.length > 0) {
      textareas.forEach(textarea => {
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
}
