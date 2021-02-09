import { $ } from './core/Dom';

export class StartButton {

  private $el: any

  constructor() {
    this.$el = $('#start-game-button')
  }

  startGame(func: () => void) {
    this.$el.on('click', () => {
      func.call(null)
      this.disable()
    })
  }

  disable() {
    this.$el.attr('disabled', true)
      .css('pointerEvents', 'none')
  }

  active() {
    this.$el.removeAttr('disabled')
      .css('pointerEvents', 'initial')
  }

}