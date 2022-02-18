type Cell = {
  row: string;
  col: string;
};

type CellID<T extends string = string, S extends string = string> = `${T}:${S}`;

type CellIdKeys = keyof Cell;

export {
  Cell,
  CellID,
  CellIdKeys,
};
