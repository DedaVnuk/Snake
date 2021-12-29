import { $, Dom } from './Dom';

import { NoticeCallbackType, NoticeChainItem } from '../types';

class Notice {

  private $el: Dom;
  private timeout: number|undefined;

  constructor() {
    this.$el = $('.info');
  }

  show(html: string, delay: number = 3): void {
    clearTimeout(this.timeout);

    this.$el.html(html);
    this.timeout = setTimeout(() => {
      this.$el.clear();
      clearTimeout(this.timeout);
    }, delay * 1000);
  }

  chain(notifications: NoticeChainItem[], delay: number = 3): void {
    notifications.forEach((notification: NoticeChainItem, notificationIndex: number) => {
      const notificationDelay: number = notification?.delay ?? delay;

      if(notificationIndex === 0) {
        this.show(notification.html, notificationDelay);
      } else {
        const prevItemTime: number = notifications[notificationIndex - 1]?.delay ?? notificationDelay;

        const timer: number = setTimeout(() => {
          this.show(notification.html, notificationDelay);
          clearTimeout(timer);
        }, prevItemTime * 1000);
      }
    });
  }

}

export function notice(): NoticeCallbackType {
  const N: Notice = new Notice();

  return (notification, delay = 3) => {
    if(typeof notification === 'string') {
      N.show(notification, delay);
    } else {
      N.chain(notification);
    }
  };
}
