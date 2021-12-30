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

  private gameField: GameField;
  private notice: NoticeCallbackType;
  private startButton: StartButton;
  private snake!: Snake;
  private timeout: number|undefined;

  private isStarted: boolean = false;

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
      this.snake = new Snake(this.gameField.getCenterCell());
      this.start();
    });

    // this.autorun();
  }

  private autorun(): void {
    if(!this.isStarted) {
      this.notice([
        {html: 'Ready?', delay: 3},
        {html: '3', delay: 4},
        {html: '2', delay: 5},
        {html: '1', delay: 4},
      ]);

      const timeout: number = setTimeout(() => {
        this.startButton.click();
        clearTimeout(timeout);
      }, 6000);
    }
  }

  private start(): void {
    this.isStarted = true;

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
        const timer: number = setTimeout(() => {
          addFood();
          clearTimeout(timer);
        }, speed * 1000);
      } catch (error) {
        error instanceof Error && this.over(error.message);
      }
    };

    addFood();
  }

  private listen({key}: KeyboardEvent): void {
    const keys: Record<string, Reducer> = {
      ArrowUp: {func: val => --val, param: 'row'},
      ArrowRight: {func: val => ++val, param: 'col'},
      ArrowDown: {func: val => ++val, param: 'row'},
      ArrowLeft: {func: val => --val, param: 'col'}
    };

    const reducer: Reducer = keys[key];
    if(reducer) {
      try {
        const snakeHeadCellId: string = this.snake
          .move(reducer)
          .eat()
          .head.parent()
          .dataId() as string;
        this.gameField.removeFood(snakeHeadCellId);
      } catch (error) {
        error instanceof Error && this.over(error.message);
      }
    }
  }

  private over(message: string = 'try once more'): void {
    document.removeEventListener('keydown', this.listen);
    clearTimeout(this.timeout);

    this.init();
    this.notice([
      {html: '<span class="text_game-over">Game over</span>', delay: 5},
      // {html: '🠔 Press Start button to play again', delay: 100},
    ]);
    console.log('Game over -', message);
  }

}

export function start() {
  const game: Game = new Game();
  game.init();
}