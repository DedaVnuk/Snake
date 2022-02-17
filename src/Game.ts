import { GameField } from './GameField';
import { Snake } from './Snake';
import { notice } from './core/Notice';
import { StartButton } from './StartButton';

import { START_GAME_SPEED, KEY_REDUCERS } from './consts';
import { NoticeCallbackType } from './types/Notice';
import { Reducer, ReducerKey } from './types/Reducer';

class Game {

  private gameField: GameField;
  private notice: NoticeCallbackType;
  private startButton: StartButton;
  private snake!: Snake;

  private isStarted: boolean = false;

  constructor() {
    this.gameField = new GameField();
    this.gameField.draw();

    this.notice = notice();

    this.listen = this.listen.bind(this);
    this.startButton = new StartButton();

    this.startButtonClickHandler = this.startButtonClickHandler.bind(this);

    this.init();
  }

  private startButtonClickHandler(): void {
    this.gameField.draw();
    this.snake = new Snake(this.gameField.getCenterCell());
    this.start();
  }

  private init(): void {
    this.startButton.active();
    this.startButton.startGame(this.startButtonClickHandler);

    //TODO
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

    this.addFood();
  }

  private addFood(speed = START_GAME_SPEED, counter = 0) {
    try {
      this.gameField.addFood(this.snake.cellsIds());

      if(speed > 0.5 && ++counter % 10 === 0) {
        speed -= speed > 1 ? 1 : 0.5;
        this.notice(speed >= 1 ? 'Faster!' : 'Run!');
      }

      const timer: number = setTimeout(() => {
        this.addFood(speed, counter);
        clearTimeout(timer);
      }, speed * 1000);
    } catch (error) {
      error instanceof Error && this.over(error.message);
    }
  }

  private listen({key}: KeyboardEvent): void {
    const reducer: Reducer = KEY_REDUCERS[key as ReducerKey];

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

    this.init();
    this.notice([
      {html: '<span class="text_game-over">Game over</span>', delay: 5},
      // {html: '🠔 Press Start button to play again', delay: 100},
    ]);
    console.log('Game over -', message);
  }

}

export const start = () => new Game();