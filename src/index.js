import { Game } from './Game'

const game = new Game()

const button = document.getElementById('start-game-button')
button.onclick = () => {
  button.style.background = 'green'
  button.setAttribute('disabled', true)

  document.addEventListener('keydown', game.listen.bind(game))
  game.start()
}