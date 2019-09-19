// skrw response controller
// handles adding, removing and reloading of ajax responses
// all actions expect a json response with { html: "html markup…" }
//
//  Targets:
//    skrw-response.item => item to be replaced or removed by reload() or remove()
//
//  Properties:
//    data-skrw-response-target-element="#selector" => target element to be used with updateTarget()
//    data-skrw-response-update-url="items/index"   => url to fetch when update is triggered
//
//  Actions:
//    reload()       => replaces the innerHTML of closest skrw-response.item with response.html
//    remove()       => removes the closest skrw-response.item
//    update()       => updates this.element with a response from data-skrw-response-update-url
//    updateTarget() => triggers update() at targetElement
//    reset()        => reset innerHTML of skrw-response controller to initial state
//
//  Markup for a form that updates a list. The <div> listens to ajax events emitted from the <form>.
//  On ajax:success the <ul> is updated, on ajax:error the <div> is reloaded with the ajax response.
//  Each <a> will trigger a reload of the parent <li> with the response.html.
//
//  <div data-controller="skrw-response" data-target="skrw-response.item" data-action="ajax:success->skrw-response ajax:error->skrw-response#reload" data-skrw-response-target-element="#list" data-update-target-element="true">
//    <form action="list">…</form>
//  </div>
//
//  <ul id="list" data-controller="skrw-response" data-skrw-response-update-url="/list/fetch">
//    <li data-target="skrw-response.item">
//      …
//      <a href="list/form" data-action="click->skrw-response#reload">reload item with response</a>
//    </li>
//    <li data-target="skrw-response.item">
//      …
//    </li>
//  </ul>

import { Controller } from "stimulus"

export default class extends Controller {

  static targets = ["item", "template"]

  connect() {
    // listener for "update" event on this.element
    this.element.addEventListener("update", (event) => {
      this.update()
    })

    // create template of original version
    this.element.insertAdjacentHTML("beforeend", `<template>${this.element.innerHTML}</template>`)
    this.template = this.element.innerHTML
  }

  reload(event) {
    // event.stopPropagation()
    const [response, status, xhr] = event.detail
    const target = event.target.closest("[data-target*='skrw-response.item']")
    if (document.body.contains(target)) {
      target.innerHTML = response.html
    }
  }

  // remove item
  remove(event) {
    const [response, status, xhr] = event.detail
    const target = event.target.closest("[data-target*='skrw-response.item']")
    if (document.body.contains(target)) {
      target.parentNode.removeChild(target)
    }
  }

  // reset controller to beginning
  reset(event) {
    this.element.innerHTML = ""
    this.element.insertAdjacentHTML("afterbegin", this.template)
  }

  update(event) {
    const url = this.data.get("updateUrl")

    if (url) {
      fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => { return response.json() })
        .then(json => {
          this.element.innerHTML = json.html
        })
    }
  }

  updateTarget() {
    const target = this.targetElement
    if (target) {
      const update = new CustomEvent("update")
      this.targetElement.dispatchEvent(update)
    }
  }

  // target to append / prepend to
  // accepts id data-skrw-response-add-to-target="#id"
  // or querySelector data-skrw-response-add-to-target=".class"
  // if no target is set, it will default to this.element
  get targetElement() {
    const selector = this.data.get("targetElement")

    if (selector) {
      // test if selector is id or querySelector
      if (/^#.+/.test(selector)) {
        return document.getElementById(selector.split("#").pop())
      } else {
        return document.querySelector(selector)
      }
    } else {
      return this.element
    }
  }
}
