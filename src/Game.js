import { GameField } from './GameField';
import { Snake } from './Snake';
import { notice } from './core/Notice';

const START_GAME_SPEED = 5

export class Game {

  constructor() {
    this.gameField = new GameField()
    this.gameField.draw()

    this.snake = new Snake(this.gameField.getCenterCell())
    this.notice = notice()

    this.listen = this.listen.bind(this)
  }

  start() {
    document.addEventListener('keydown', this.listen)
    this.notice('Go!')

    let speed = START_GAME_SPEED
    let counter = 0
    const addFood = () => {
      this.gameField.addFood(this.snake.cellsIds())
      if(speed > 1 && ++counter % 10 === 0) {
        --speed
        this.notice('Faster!')
      }
      this.timeout = setTimeout(addFood, speed * 1000)
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

    if(Object.keys(keys).includes(key)) {
      try {
        const snakeHeadId = this.snake.currentHeadCell.data('id')
        const [row, col] = snakeHeadId.split(':')
        const cell = {row, col}

        const obj = keys[key]
        cell[obj.param] = obj.func(cell[obj.param])

        this.snake.move(cell)

        const $food = this.snake.currentHeadCell.find('.food')
        if($food.exists()) {
          this.snake.addBodyPart()
          $food.remove()
        }
      } catch (error) {
        document.removeEventListener('keydown', this.listen)
        clearTimeout(this.timeout)

        this.notice('Game over')
        console.log('Game over -', error.message);
      }
      
    }
  }

}