import { $ } from './Dom';

class Notice {

  constructor() {
    this.$el = $('.info')
  }

  html(html, delay = 3) {
    clearTimeout(this.timeout)

    this.$el.html(html)
    this.timeout = setTimeout(() => {
      this.$el.clear()
      clearTimeout(this.timeout)
    }, delay * 1000)
  }

}

export function notice() {
  const N = new Notice()
  return function(html, delay) {
    N.html(html, delay)
  }
}