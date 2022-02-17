import { CellIdKeys } from './Cell';
import { Func } from './utils';

type Reducer = {func: Func<number>, param: CellIdKeys};

type ReducerKey = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft'; 

export {
  Reducer,
  ReducerKey,
};
