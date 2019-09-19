import { Controller } from "stimulus"
import SimpleMDE from "simplemde"
import "simplemde/dist/simplemde.min.css"

export default class extends Controller {

  connect() {
    this.simplemde = this.initSimpleMDE()
  }

  initSimpleMDE() {
    const simplemde = new SimpleMDE({
      element: this.element,
      forceSync: true,
      parsingConfig: {
        underscoresBreakWords: true
      },
      placeholder: this.placeholder,
      spellChecker: false,
      toolbar: false,
    })

    return simplemde
  }

  get placeholder() {
    return this.element.getAttribute("placeholder")
  }
}
