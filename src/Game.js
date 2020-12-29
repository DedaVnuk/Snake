import { GameField } from './GameField';
import { Snake } from './Snake';

export class Game {

  constructor() {
    this.gameField = new GameField()
    this.gameField.draw()

    this.snake = new Snake(this.gameField.getCenterCell())
  }

  start() {
    this.foodInterval = setInterval(() => {
      this.gameField.addFood(this.snake.cellsIds())
    }, 5000);


    // let {row, col} = this.gameField.getCenterCell().data('id', id => {
    //   const [row, col] = id.split(':')
    //   return {row, col}
    // })

    // this.startInterval = setInterval(() => {
    //   try {
    //     //row--
    //     //this.snake.move({row, col})
    //   } catch (error) {
    //     clearInterval(this.startInterval)
    //     document.removeEventListener('keydown', this.listen)
    //     console.log('Game over -', error.message);
    //   }
      
    // }, 1000);
  }

  listen({key}) {
    const keys = {
      ArrowUp: {func: val => --val, param: 'row'},
      ArrowRight: {func: val => ++val, param: 'col'},
      ArrowDown: {func: val => ++val, param: 'row'},
      ArrowLeft: {func: val => --val, param: 'col'}
    }

    if(Object.keys(keys).includes(key)) {
      clearInterval(this.startInterval)
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
        console.log('Game over -', error.message);
      }
      
    }
  }

}