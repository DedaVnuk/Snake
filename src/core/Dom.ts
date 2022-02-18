import { ElementAttrValueType, EventHandler, Func } from '../types/utils';
import { Cell, CellID } from './../types/Cell';

class Dom {

  private $el: HTMLElement;

  constructor(selector: HTMLElement | string) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) as HTMLElement : selector;
  }

  get element(): HTMLElement {
    return this.$el;
  }

  find(selector: string): Dom {
    return $(this.$el.querySelector(selector) as HTMLElement);
  }

  css(key: string, value?: string): Dom | string {
    if(value === undefined) {
      return this.$el.style.getPropertyValue(key);
    }

    this.$el.style.setProperty(key, value);
    return this;
  }

  attr(key: string, value?: ElementAttrValueType): Dom | string {
    if(value === undefined) {
      return String(this.$el.getAttribute(key));
    }

    this.$el.setAttribute(key, String(value));
    return this;
  }

  removeAttr(key: string): Dom {
    this.$el.removeAttribute(key);
    return this;
  }

  data(key: string, func?: Func<string>): string {
    const data = String(this.$el.dataset[key]);
    return func ? func(data) : data;
  }

  dataId<T extends Cell | CellID>(parse: boolean = false): T {
    const id = <CellID>this.data('id');

    if(parse) {
      const [row, col]: string[] = id.split(':');
      return <T>{row, col};
    }
    return <T>id;
  }

  append($el: Dom): Dom {
    this.$el.append($el.element);
    return this;
  }

  exists(): boolean {
    return !!this.$el;
  }

  html(html?: string): Dom | string {
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

  on(eventName: string, func: EventHandler): void {
    this.$el.addEventListener(eventName, func, true);
  }

  off(eventName: string, func: EventHandler): void {
    this.$el.removeEventListener(eventName, func, true);
  }

}

function $(selector: HTMLElement | string): Dom {
  return new Dom(selector);
}

$.create = function(tagName: string, classes: string[] = []): Dom {
  const $el: HTMLElement = document.createElement(tagName);
  $el.classList.add(...classes);

  return $($el);
};

export {
  $,
  Dom,
};