import { $ } from './Dom';

class Notice {

  constructor() {
    this.$el = $('.info')
  }

  html(html, delay = 3) {
    this.$el.html(html)
    let timeout = setTimeout(() => {
      this.$el.clear()
      clearTimeout(timeout)
    }, delay * 1000)
  }

}

export function notice() {
  const N = new Notice()
  return function(html, delay) {
    N.html(html, delay)
  }
}