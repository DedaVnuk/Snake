import { $, Dom } from './core/Dom';
import { EventHandler, Func } from './types/utils';

export class StartButton {

  private $el: Dom;
  private clickHandler!: EventHandler;

  constructor() {
    this.$el = $('#start-game-button');
  }

  startGame(func: Func<void>): void {
    this.$el.off('click', this.clickHandler);

    this.clickHandler = () => {
      func();
      this.disable();
    };

    this.$el.on('click', this.clickHandler);
  }

  disable(): void {
    (this.$el.attr('disabled', true) as Dom)
      .css('pointerEvents', 'none');
  }

  active(): void {
    this.$el.removeAttr('disabled')
      .css('pointerEvents', 'initial');
  }

  click(): void {
    this.$el.element.click();
  }

}