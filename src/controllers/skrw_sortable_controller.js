// controller for sortable containers
// lets user sort items with drag and drop, executing a POST
// request after each change submitting id and new index position
//
// markup:
//   <ul data-controller="skrw-sortable" data-skrw-sortable-url="/items/sort">
//    <li data-id="1">Item 1</li>
//    <li data-id="2">Item 2</li>
//    …
//  </ul>
//
// data-skrw-sortable-url="/items/sort" (mandatory) => url to POST after each dragging
// data-id="1" (mandatory) => will be passed in request params along with new sorting position

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
    console.log(event)

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
    }).then(response => {
      return response.json()
    }).then(json => {
      // const event = new CustomEvent("ajax:success", { detail: [json] })
      // document.dispatchEvent(event)
    })
  }
}
