// controller for sortable containers
//
// markup:
//   <ul data-controller="skrw-sortable" data-skrw-sortable-url="/items/sort">
//    <li data-id="1">Item 1</li>
//    <li data-id="2">Item 2</li>
//    …
//  </ul>
//
// data-skrw-sortable-url="/items/sort" => url to POST after each dragging

import { Controller } from "stimulus"
import Sortable from "sortablejs"

export default class extends Controller {

  connect() {
    this.initSortable()
  }

  // init sortable
  initSortable() {
    this.sortable = new Sortable(this.element, {
      animation: 150,
      onEnd: (event) => {
        this.dragEndHandler(event)
      }
    })
  }

  // post new position to url
  dragEndHandler(event) {
    const id = event.item.dataset.id
    const index = event.newIndex
    const url = this.data.get("url")
    const csrf = document.querySelector("[name='csrf-token']").content

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf
      },
      body: JSON.stringify({ id: id, index: index })
    })
  }
}
