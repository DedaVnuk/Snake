import { GameField } from './GameField';
import { Snake } from './Snake';
import { notice } from './core/Notice';
import { StartButton } from './StartButton';

const START_GAME_SPEED = 3

export class Game {

  constructor() {
    this.gameField = new GameField()
    this.gameField.draw()

    this.notice = notice()

    this.listen = this.listen.bind(this)
    this.startButton = new StartButton()
  }

  init() {
    this.startButton.active()
    this.startButton.startGame(() => {
      this.gameField.draw()
      this.start()
      this.snake = new Snake(this.gameField.getCenterCell())
    })
  }

  start() {
    document.addEventListener('keydown', this.listen)
    this.notice('Go!')

    let speed = START_GAME_SPEED
    let counter = 0
    const addFood = () => {
      try {
        this.gameField.addFood(this.snake.cellsIds())
        if(speed > 0.5 && ++counter % 10 === 0) {
          speed -= speed > 1 ? 1 : 0.5 
          this.notice(speed >= 1 ? 'Faster!' : 'Run!')
        }
        this.timeout = setTimeout(addFood, speed * 1000)
      } catch (error) {
        this.over(error.message)
      }
      
    }

    this.timeout = setTimeout(addFood, speed * 1000)
  }

  listen({key}) {
    const keys = {
      ArrowUp: {func: val => --val, param: 'row'},
      ArrowRight: {func: val => ++val, param: 'col'},
      ArrowDown: {func: val => ++val, param: 'row'},
      ArrowLeft: {func: val => --val, param: 'col'}
    }

    const reducer = keys[key]
    if(reducer) {
      try {
        this.snake.move({}, reducer).eat()
      } catch (error) {
        this.over(error.message)
      }
    }
  }

  over(message = 'try once more') {
    document.removeEventListener('keydown', this.listen)
    clearTimeout(this.timeout)

    this.init()

    this.notice('<p class="game-over__text">Game over</p>', 600)
    console.log('Game over -', message);
  }

}