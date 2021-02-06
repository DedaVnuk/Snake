class Dom {

  $el: any

  constructor(selector: any) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  find(selector: string): Dom {
    return $(this.$el.querySelector(selector))
  }

  css(key: string, value?: string): Dom|string {
    if(value !== undefined) {
      this.$el.style[key] = value
      return this
    }
    return this.$el.style[key]
  }

  attr(key: string, value?: string|number): Dom|string {
    if(value !== undefined) {
      this.$el.setAttribute(key, value)
      return this
    }
    return this.$el.getAttribute(key)
  }

  removeAttr(key: string): Dom {
    this.$el.removeAttribute(key)
    return this
  }

  data(key: string, func?: (data: string) => string): string {
    const data = this.$el.dataset[key]
    return func ? func(data) : data
  }

  dataId(parse: boolean = false): string|{[key: string]: string} {
    const id = this.data('id')

    if(parse) {
      const [row, col] = id.split(':')
      return {row, col}
    }
    return id
  }

  append($el: any): Dom {
    this.$el.append($el.$el)
    return this
  }

  exists(): boolean {
    return !!this.$el
  }

  html(html: string): Dom|string {
    if(html) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML
  }

  parent(): Dom {
    return $(this.$el.parentNode)
  }

  remove(): void {
    this.$el.remove()
  }

  clear(): void {
    this.$el.innerHTML = ''
  }

  on(eventName: string, func: () => void): void {
    this.$el[`on${eventName}`] = func
  }

}

export function $(selector: any): Dom {
  return new Dom(selector)
}

$.create = function(tagName: string, classes: string[] = []): Dom {
  const $el = document.createElement(tagName)
  $el.classList.add(...classes)

  return $($el)
}