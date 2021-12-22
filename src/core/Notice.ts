import { $, Dom } from './Dom';

import { NoticeCallbackType } from '../types';

class Notice {

  private $el: Dom
  timeout: number = 0

  constructor() {
    this.$el = $('.info');
  }

  html(html: string, delay: number): void {
    clearTimeout(this.timeout);

    this.$el.html(html);
    this.timeout = setTimeout(() => {
      this.$el.clear();
      clearTimeout(this.timeout);
    }, delay * 1000)
  }

}

export function notice(): NoticeCallbackType {
  const N: Notice = new Notice();
  return (html: string, delay: number = 3) => N.html(html, delay);
}
