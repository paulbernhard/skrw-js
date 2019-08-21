// tags controller
// can be used on <input> elements to handle tag suggestions
// returns tags as comma-seperated list
//
//  Properties:
//
//    data-skrw-tags-whitelist => set of available tags (comma-seperated string)
//    data-skrw-tags-enfore-whitelist => allow only whitelisted tags (boolean, default = false)
//    data-skrw-tags-url => url to fetch tags from, this expects a json response with an array of tags and will override whitelisted tags (string, default = false)
//
//  Examples:
//
//    <input data-controller="skrw-tags" data-skrw-tags-whitelist="banana, apple, pear" data-skrw-tags-enfore-whitelist="false">
//    => input that suggests the tags "banana", "apple", "pear", and allows additional tags
//
//    <input data-controller="skrw-tags" data-skrw-tags-url="/tags/fetch">
//    => input that fetches tags suggestions from /tags/fetch and does not allow additional tags

import { Controller } from "stimulus"
import Tagify from "@yaireo/tagify"
import "@yaireo/tagify/dist/tagify.css"

export default class extends Controller {

  connect() {
    // init tagify after response from fetching whitelist
    this.setOptions().then(response => {
      this.tagify = new Tagify(this.element, response)
      this.formatInput()
      this.tagify
        .on("add", (e) => { this.formatInput() })
        .on("remove", (e) => { this.formatInput() })

      console.log(this.tagify.settings)
    })
  }

  // format tagify value as comma seperated list
  formatInput() {
    const tags = this.tagify.value
    const tagsAsString = tags.map((t) => { return t.value }).join(", ")
    this.element.value = tagsAsString
  }

  // fetch and override whitelist with AJAX request
  async fetchWhitelist() {
    const url = this.whitelistUrl
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  // set options for tagify
  // await eventual whitelist fetching
  async setOptions() {
    let options = {
      enforceWhitelist: this.enforceWhitelist,
      dropdown: { enabled: 1 }
    }

    // get whitelist from url or data attribute
    if (this.whitelistUrl) {
      const data = await this.fetchWhitelist()
      options.whitelist = data
    } else {
      options.whitelist = this.whitelist ? this.whitelist : []
    }

    // set templates
    options.templates = this.templates

    return options
  }

  get whitelist() {
    const whitelist = this.data.get("whitelist")
    if (whitelist) {
      return whitelist.split(",").map(item => { return item.trim() })
    } else {
      false
    }
  }

  get whitelistUrl() {
    return this.data.has("url") ? this.data.get("url") : false
  }

  get enforceWhitelist() {
    return this.data.get("enforceWhitelist") == "true" ? true : false
  }

  get templates() {
    return {
      wrapper(input, settings){
        return `<tags class="tagify ${settings.mode ? "tagify--mix" : "" } ${input.className} skrw" ${settings.readonly ? 'readonly' : ''}>
            <span contenteditable data-placeholder="${input.placeholder || '&#8203;'}" class="tagify__input"></span>
        </tags>`
      },

      tag(v, tagData){
          return `<tag title='${v}' contenteditable='false' spellcheck="false" class='tagify__tag ${tagData.class ? tagData.class : ""}' ${this.getAttributes(tagData)}>
              <x title='' class='tagify__tag__removeBtn'></x><div><span class='tagify__tag-text'>${v}</span></div>
          </tag>`
      },

      dropdownItem( item ){
          var sanitizedValue = (item.value || item).replace(/`|'/g, "&#39;");
          return `<div ${this.getAttributes(item)} class='tagify__dropdown__item ${item.class ? item.class : ""} skrw'>${sanitizedValue}</div>`;
      }
    }
  }
}
