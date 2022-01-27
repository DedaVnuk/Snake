import { Reducer } from './types';

const START_GAME_SPEED: number = 3;

const CELL_SIDE: number = 30;

const KEY_REDUCERS: Record<string, Reducer> = {
  ArrowUp: {func: val => --val, param: 'row'},
  ArrowRight: {func: val => ++val, param: 'col'},
  ArrowDown: {func: val => ++val, param: 'row'},
  ArrowLeft: {func: val => --val, param: 'col'}
};


export {
  START_GAME_SPEED,
  CELL_SIDE,
  KEY_REDUCERS,
};