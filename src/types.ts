type NoticeChainItem = {
  html: string;
  delay?: number;
}

type NoticeCallbackType = (notification: NoticeChainItem[]|string, delay?: number) => void;

type Reducer = {func: (val: number) => number, param: string};

type CellID = {
  row: string;
  col: string;
};

type CellIdKeys = keyof CellID;

type ElementAttrValueType = string|number|boolean;

type EventHandler = (event?: Event) => void;

export {
  NoticeCallbackType,
  NoticeChainItem,
  Reducer,
  CellID,
  CellIdKeys,
  ElementAttrValueType,
  EventHandler,
};