class Dom {

  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  css(key, value) {
    if(value) {
      this.$el.style[key] = value
      return this
    }
    return this.$el.style[key]
  }

  attr(key, value) {
    if(value) {
      this.$el.setAttribute(key, value)
      return this
    }
    return this.$el.getAttribute(key)
  }

  data(key, func) {
    const data = this.$el.dataset[key]
    return func ? func(data) : data
  }

  append($el) {
    this.$el.append($el.$el)
    return this
  }

  exists() {
    return !!this.$el
  }

  html(html) {
    if(html) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML
  }

  parent() {
    return $(this.$el.parentNode)
  }

  remove() {
    this.$el.remove()
  }

  clear() {
    this.$el.innerHTML = ''
  }

}

export function $(selector) {
  return new Dom(selector)
}

$.create = function(tagName, classes = []) {
  const $el = document.createElement(tagName)
  $el.classList.add(...classes)

  return $($el)
}