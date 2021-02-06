import { $ } from './Dom';

class Notice {

  $el: any
  timeout: number

  constructor() {
    this.$el = $('.info')
  }

  html(html: string, delay = 3) {
    clearTimeout(this.timeout)

    this.$el.html(html)
    this.timeout = setTimeout(() => {
      this.$el.clear()
      clearTimeout(this.timeout)
    }, delay * 1000)
  }

}

export function notice() {
  const N: Notice = new Notice()
  return function(html: string, delay: number) {
    N.html(html, delay)
  }
}