import { $, Dom } from './core/Dom';

export class StartButton {

  private $el: Dom;

  constructor() {
    this.$el = $('#start-game-button');
  }

  startGame(func: () => void): void {
    this.$el.on('click', () => {
      func();
      this.disable();
    });
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