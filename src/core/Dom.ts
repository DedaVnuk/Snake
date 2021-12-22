import { CellID, ElementAttrValueType } from '../types';

class Dom {

  private $el: HTMLElement

  constructor(selector: HTMLElement|string) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector)! : selector;
  }

  get element(): HTMLElement {
    return this.$el;
  }

  find(selector: string): Dom {
    return $(this.$el.querySelector(selector) as HTMLElement);
  }

  css(key: string, value?: string): Dom|string {
    if(value !== undefined) {
      this.$el.style.setProperty(key, value);
      return this;
    }

    return this.$el.style.getPropertyValue(key);
  }

  attr(key: string, value?: ElementAttrValueType): Dom|string {
    if(value !== undefined) {
      this.$el.setAttribute(key, String(value));
      return this;
    }

    return this.$el.getAttribute(key)!;
  }

  removeAttr(key: string): Dom {
    this.$el.removeAttribute(key);
    return this;
  }

  data(key: string, func?: (data: string) => string): string {
    const data = this.$el.dataset[key]!;
    return func ? func(data) : data;
  }

  dataId(parse: boolean = false): string|CellID {
    const id = this.data('id');

    if(parse) {
      const [row, col]: string[] = id.split(':');
      return {row, col};
    }
    return id;
  }

  append($el: Dom): Dom {
    this.$el.append($el.$el);
    return this;
  }

  exists(): boolean {
    return !!this.$el;
  }

  html(html: string): Dom|string {
    if(html) {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.innerHTML;
  }

  parent(): Dom {
    return $(this.$el.parentNode as HTMLElement);
  }

  remove(): void {
    this.$el.remove();
  }

  clear(): void {
    this.$el.innerHTML = '';
  }

  on(eventName: string, func: (event?: Event) => void): void {
    this.$el.addEventListener(eventName, func);
  }

}

function $(selector: HTMLElement|string): Dom {
  return new Dom(selector);
}

$.create = function(tagName: string, classes: string[] = []): Dom {
  const $el: HTMLElement = document.createElement(tagName);
  $el.classList.add(...classes);

  return $($el);
}

export {
  $,
  Dom,
}