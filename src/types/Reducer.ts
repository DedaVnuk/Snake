import { CellIdKeys } from './Cell';

type Reducer = {func: (val: number) => number, param: CellIdKeys};

type ReducerKey = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft'; 

export {
  Reducer,
  ReducerKey,
};
