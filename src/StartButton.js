import { $ } from './core/Dom';

export class StartButton {

  constructor() {
    this.$el = $('#start-game-button')
  }

  startGame(func) {
    this.$el.on('click', () => {
      func.call()
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