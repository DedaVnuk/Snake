import { GameField } from './GameField';
import { Snake } from './Snake';
import { notice } from './core/Notice';
import { StartButton } from './StartButton';

import { START_GAME_SPEED } from './consts';
import { 
  NoticeCallbackType,
  Reducer,
} from './types';

class Game {

  private gameField: GameField
  private notice: NoticeCallbackType
  private startButton: StartButton
  private snake!: Snake
  private timeout: number = 0

  constructor() {
    this.gameField = new GameField();
    this.gameField.draw();

    this.notice = notice();

    this.listen = this.listen.bind(this);
    this.startButton = new StartButton();
  }

  init(): void {
    this.startButton.active();
    this.startButton.startGame(() => {
      this.gameField.draw();
      this.start();
      this.snake = new Snake(this.gameField.getCenterCell());
    })
  }

  start(): void {
    document.addEventListener('keydown', this.listen);
    this.notice('Go!');

    let speed: number = START_GAME_SPEED;
    let counter: number = 0;
    const addFood = () => {
      try {
        this.gameField.addFood(this.snake.cellsIds());
        if(speed > 0.5 && ++counter % 10 === 0) {
          speed -= speed > 1 ? 1 : 0.5;
          this.notice(speed >= 1 ? 'Faster!' : 'Run!');
        }
        this.timeout = setTimeout(addFood, speed * 1000);
      } catch (error) {
        error instanceof Error && this.over(error.message);
      }
    }

    this.timeout = setTimeout(addFood, speed * 1000);
  }

  listen({key}: KeyboardEvent): void {
    const keys: Record<string, Reducer> = {
      ArrowUp: {func: val => --val, param: 'row'},
      ArrowRight: {func: val => ++val, param: 'col'},
      ArrowDown: {func: val => ++val, param: 'row'},
      ArrowLeft: {func: val => --val, param: 'col'}
    }

    const reducer: Reducer = keys[key];
    if(reducer) {
      try {
        this.snake.move(reducer).eat();
      } catch (error) {
        error instanceof Error && this.over(error.message);
      }
    }
  }

  over(message: string = 'try once more'): void {
    document.removeEventListener('keydown', this.listen);
    clearTimeout(this.timeout);

    this.init();
    // TODO не показывается Game over, хотя появляется в DOM
    this.notice('<span class="game-over__text">Game over</span>', 6);
    console.log('Game over -', message);
  }

}

export function start() {
  const game: Game = new Game();
  game.init();
}