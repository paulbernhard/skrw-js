import { Controller } from "stimulus"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.css"

export default class extends Controller {

  static targets = ["datetime"]

  connect() {
    this.flatpickr = this.initFlatpickr()
  }

  initFlatpickr() {
    const options = {
      dateFormat: this.dateFormat,
      enableTime: this.enableTime,
      altInput: true,
      time_24hr: true,
      plugins: []
    }

    return flatpickr(this.element, options)
  }

  get enableTime() {
    return this.data.get("enableTime") == "true" ? true : false
  }

  get dateFormat() {
    const dateFormat = this.data.get("dateFormat")
    return dateFormat ? dateFormat : "Y-m-d H:i"
  }

  // monthSelect is disabled
  // get monthSelect() {
  //   return this.data.get("monthSelect") == "true" ? true : false
  // }
  //
  // get monthSelectFormat() {
  //   const format = this.data.get("monthSelectFormat")
  //   return format ? format : "Y-m"
  // }
}
